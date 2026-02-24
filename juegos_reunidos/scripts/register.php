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
$email = trim($data["email"]);
$telefono = trim($data["telefono"]);
$fechaNacimiento = $data["fechaNacimiento"];
$rol = $data["rol"] ?? "usuario";
$favorito = (int)$data["favorito"];

// Comprobar si usuario existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE user = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Usuario ya existe"]);
    exit;
}

$stmt->close();

// Hashear contraseña
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar usuario
$stmt = $conn->prepare("INSERT INTO usuarios (user, password, email, telefono, fechaNacimiento, rol, favorito) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssi", $user, $hash, $email, $telefono, $fechaNacimiento, $rol, $favorito);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar"]);
}

$stmt->close();
$conn->close();
?>