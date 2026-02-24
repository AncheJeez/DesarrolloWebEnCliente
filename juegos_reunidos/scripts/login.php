<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$user = trim($data["user"]);
$password = trim($data["password"]);

// Buscar usuario
$stmt = $conn->prepare("SELECT password FROM usuarios WHERE user = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$stmt->bind_result($hash);
$stmt->fetch();

if ($hash && password_verify($password, $hash)) {
    echo json_encode(["success" => true, "message" => "Login correcto"]);
} else {
    echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos"]);
}

$stmt->close();
$conn->close();
?>