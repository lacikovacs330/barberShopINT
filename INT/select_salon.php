<?php
header('Content-Type: application/json; charset=UTF-8');

include "../includes/config.php";
include "../includes/db_config.php";

$conn = connectDatabase($dsn, $pdoOptions);

$sql = "SELECT * FROM salons";
$stmt = $conn->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>