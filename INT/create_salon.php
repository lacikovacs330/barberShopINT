<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

if (!empty($_POST)) {
    $data = (object)$_POST;
} else {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
}

$ownername = $data->ownername;
$firstname = $data->firstname;
$lastname = $data->lastname;
$password = $data->password;
$pass_hash = password_hash($password, PASSWORD_BCRYPT);
$email = $data->email;
$salon = $data->salon;
$description = $data->description;
$token = bin2hex(random_bytes(16));

$sthandler = $conn->prepare("SELECT username FROM users WHERE username = :name");
$sthandler->bindParam(':name', $ownername);
$sthandler->execute();
if ($sthandler->rowCount() > 0) {
    $login_fail["message"] = "Fail";
    echo json_encode($login_fail);
} else {
    $sthandler = $conn->prepare("SELECT name FROM salons WHERE name = :name");
    $sthandler->bindParam(':name', $salon);
    $sthandler->execute();
    if ($sthandler->rowCount() > 0) {
        $login_fail["message"] = "Fail";
        $login_fail["error"] = "A szalon név már foglalt.";
        echo json_encode($login_fail);
    } else { 
        $sthandler = $conn->prepare("SELECT email FROM users WHERE email = :email");
        $sthandler->bindParam(':email', $email);
        $sthandler->execute();
        if ($sthandler->rowCount() > 0) {
            $login_fail["message"] = "Fail";
            $login_fail["error"] = "Az email cím már foglalt.";
            echo json_encode($login_fail);
        } else {
            $pdoQuery = $conn->prepare("INSERT INTO users (username,firstname,lastname,password,email,token,status,role) VALUES (?,?,?,?,?,?,?,?)");
            $pdoQuery->execute([$ownername, $firstname, $lastname, $pass_hash, $email, $token, '1', 'owner']);

            $sql = "SELECT * FROM users WHERE username = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$ownername]);
            $results = $stmt->fetch();
            if ($results > 0) {
                $id = $results["id_user"];

                if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                    $targetPath = "../img/";
                    $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                    $imageName = md5(basename($_FILES['image']['name']) . mt_rand(1000, 2000)) . "." . $extension;
                    $targetFile = $targetPath . $imageName;
                    move_uploaded_file($_FILES['image']['tmp_name'], $targetFile);
                } else {
                    $imageName = null;
                }

                $pdoQuery = $conn->prepare("INSERT INTO salons (id_user,name,image,description,status,ban) VALUES (?,?,?,?,?,?)");
                if ($imageName !== null) {
                    $pdoQuery->execute([$id, $salon, $imageName, $description, 1, 0]);
                } else {
                    $pdoQuery->execute([$id, $salon, null, $description, 0, 0]);
                }
                $login_ok["message"] = "Ok";
                echo json_encode($login_ok);
            } else {
                $login_fail["message"] = "Fail";
                echo json_encode($login_fail);
            }
        }
    }
}
?>
