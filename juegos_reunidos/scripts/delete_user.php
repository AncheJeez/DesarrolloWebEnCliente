<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

if ($conn->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$user = $data['user'];

$stmt = $conn->prepare("DELETE FROM usuarios WHERE user=?");
$stmt->bind_param("s", $user);
$success = $stmt->execute();

$stmt->close();
$conn->close();

echo json_encode(["success" => $success]);
?>