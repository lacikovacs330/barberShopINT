<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

$json = file_get_contents('php://input');
$data = json_decode($json);

$username = $data->username;
$password = $data->password;

$sql = "SELECT * FROM users WHERE username = '$username'";
$stmt = $conn->prepare($sql);
$stmt->execute();
$results = $stmt->fetch();
if ($results > 0)
{
    if (password_verify($password, $results["password"]))
    {
        if ($results["role"] === "admin")
        {
            $login_ok["message"] = "Successful login!";
            $login_ok["role"] = "admin";
            echo json_encode($login_ok);
        }
        else
        {
            $login_ok["message"] = "Successful login!";
            $login_ok["role"] = "not_admin";
            echo json_encode($login_ok);
        }
    }
    else
    {
        $login_fail["message"] = "Invalid username or password!";
        echo json_encode($login_fail);
    }
}
else
{
    $login_fail["message"] = "Invalid username or password!";
    echo json_encode($login_fail);
}

