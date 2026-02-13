<?php
$servername = "localhost";
$username = "root"; // por defecto
$password = ""; // por defecto
$dbname = "juegos_reunidos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

$sql = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    if (password_verify($contrasena, $row['contrasena'])) {
        echo "¡Bienvenido, " . $row['nombre_usuario'] . "!";
    } else {
        echo "Contraseña incorrecta." . $row['contrasena'] . $row['nombre_usuario'];
    }
} else {
    echo "Usuario no encontrado.";
}

$conn->close();
?>
<a href="../index.html">Volver a principal</a>
