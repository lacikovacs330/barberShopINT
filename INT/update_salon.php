<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

if (!empty($_POST))
{
    $data = (object)$_POST;
}
else
{
    $json = file_get_contents('php://input');
    $data = json_decode($json);
}

$id_salon = $data->id_salon;
$name = $data->name;
$description = $data->description;
$status = $data->status;

$sthandler = $conn->prepare("SELECT name FROM salons WHERE name = :name AND id_salon <> :id_salon");
$sthandler->bindParam(':name', $name);
$sthandler->bindParam(':id_salon', $id_salon);
$sthandler->execute();

if ($sthandler->rowCount() > 0) {
    $login_fail["message"] = "Fail";
    $login_fail["error"] = "A szalon név már foglalt.";
    echo json_encode($login_fail);
} else {
    $sql = "SELECT * FROM salons WHERE id_salon = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id_salon]);
    $results = $stmt->fetch();

    if ($results > 0) {
        if(isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $targetPath = "../img/";
            ['extension'=>$extension] = pathinfo($_FILES['image']['name']);
            $imageName = md5(basename($_FILES['image']['name']).mt_rand(1000, 2000)).".".$extension;
            $targetFile = $targetPath . $imageName;
            move_uploaded_file($_FILES['image']['tmp_name'], $targetFile);
        } else {
            $imageName = null;
        }

        $sql = "UPDATE salons SET name=?, description=?, status=?";
        $params = [$name, $description, $status];
        if($imageName !== null) {
            $sql .= ", image=?";
            $params[] = $imageName;
        }
        $sql .= " WHERE id_salon=?";
        $params[] = $id_salon;

        $stmt = $conn->prepare($sql);
        $stmt->execute($params);

        $login_ok["message"] = "Ok";
        echo json_encode($login_ok);
    } else {
        $login_fail["message"] = "Fail";
        echo json_encode($login_fail);
    }
}
?>
