<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "juegos_reunidos");
if($conn->connect_error) {
    echo json_encode(['success'=>false,'message'=>'Error de conexión: '.$conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['user'])) {
    echo json_encode(['success'=>false,'message'=>'No se recibieron datos válidos']);
    exit;
}

$user = trim($data['user']);
$newUser = isset($data['newUser']) ? trim($data['newUser']) : $user;
$password = isset($data['password']) ? trim($data['password']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$telefono = isset($data['telefono']) ? trim($data['telefono']) : '';
$fecha = isset($data['fechaNacimiento']) ? trim($data['fechaNacimiento']) : '';
$rol = isset($data['rol']) ? trim($data['rol']) : 'usuario';
$favorito = isset($data['favorito']) ? intval($data['favorito']) : 0;

// Verificar si el usuario existe
$checkStmt = $conn->prepare("SELECT user FROM usuarios WHERE user=?");
$checkStmt->bind_param("s", $user);
$checkStmt->execute();
$checkStmt->store_result();
if($checkStmt->num_rows === 0){
    echo json_encode(['success'=>false,'message'=>'Usuario no encontrado']);
    $checkStmt->close();
    $conn->close();
    exit;
}
$checkStmt->close();

// DINAMICO
$setPassword = '';
$params = [];
$types = '';

if($password) {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $setPassword = ", password=?";
    $params[] = $hash;
    $types .= 's';
}

$stmt = $conn->prepare("UPDATE usuarios SET user=?, email=?, telefono=?, fechaNacimiento=?, rol=?, favorito=? $setPassword WHERE user=?");
$params = array_merge([$newUser,$email,$telefono,$fecha,$rol,$favorito], $params, [$user]);
$types = 'sssssis' . ($password ? '' : ''); // 'i' para favorito por q es un int

if(!$stmt) {
    echo json_encode(['success'=>false,'message'=>'Error al preparar la consulta: '.$conn->error]);
    $conn->close();
    exit;
}

$stmt->bind_param($types, ...$params);

if($stmt->execute()) {
    echo json_encode(['success'=>true]);
} else {
    echo json_encode(['success'=>false,'message'=>$stmt->error]);
}

$stmt->close();
$conn->close();
?>