<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

$json = file_get_contents('php://input');
$data = json_decode($json);

$id_salon = $data->id_salon;

$sql = "DELETE FROM salons WHERE id_salon = :id_salon";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":id_salon", $id_salon);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $response["message"] = "Salon was deleted!";
} else {
    $response["message"] = "Salon was not deleted!";
}

echo json_encode($response);
?>
