<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

$json = file_get_contents('php://input');
$data = json_decode($json);

$username = $data->username;
$password = $data->password;
$password2 = $data->password2;
$firstname = $data->fname;
$lastname = $data->lname;
$email = $data->email;
$token = bin2hex(random_bytes(16));
$email_validation_regex = '/^\\S+@\\S+\\.\\S+$/';

$hashed_pass = password_hash($password, PASSWORD_BCRYPT);

$sthandler = $conn->prepare("SELECT username FROM users WHERE username = :name");
$sthandler->bindParam(':name', $username);
$sthandler->execute();
if($sthandler->rowCount() > 0){
    $login_fail["message"] = "The username is taken!";
    echo json_encode($login_fail);
}
else
{
    if ($password != $password2)
    {
        $login_fail["message"] = "The two passwords do not match!";
        echo json_encode($login_fail);
    }
    else
    {
        if (!preg_match($email_validation_regex,$email))
        {
            $login_fail["message"] = "Enter a valid email format!";
            echo json_encode($login_fail);
        }
        else
        {
            $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            if ($user)
            {
                $login_fail["message"] = "Email address is taken!";
                echo json_encode($login_fail);
            }
            else
            {
                $sql = "INSERT INTO users (username, firstname, lastname, password, email, token, status, role) VALUES (?,?,?,?,?,?,?,?)";
                $conn->prepare($sql)->execute([$username, $firstname, $lastname, $hashed_pass, $email, $token, "1", "user"]);

                $login_ok["message"] = "Successful registration!";
                echo json_encode($login_ok);
            }
        }
    }
}


