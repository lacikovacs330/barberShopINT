<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->id)) {
    $id_salon = $data->id;

    $sql = "SELECT * FROM salons WHERE id_salon = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['id' => $id_salon]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($result);
} else {
    echo json_encode(array("message" => "No salon ID provided."));
}


?>
