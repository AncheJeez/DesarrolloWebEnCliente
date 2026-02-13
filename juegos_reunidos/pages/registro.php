<?php
$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

$usuario = $_POST['usuario'];
$email = $_POST['email'];
$contrasena = $_POST['contrasena'];

/* 1. HASH */
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

/* 2. INSERT */
$sql = "INSERT INTO usuarios(nombre_usuario, email, contrasena)
        VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $email, $hash);
$stmt->execute();

echo "Usuario registrado correctamente";
?>
<a href="../index.html">Volver a principal</a>