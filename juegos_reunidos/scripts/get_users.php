<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$result = $conn->query("SELECT user, email, telefono, fechaNacimiento, rol, favorito FROM usuarios");
$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

// echo json_encode($users);
echo json_encode(['data' => $users]);

$conn->close();
?>