<?php
session_start();

$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

if ($conn->connect_error) {
    die("Error de conexión");
}

$usuario = $_POST['nombre_usuario'] ?? null;
$contrasena = $_POST['contrasena'] ?? null;

$mensaje = "";
$exito = false;

if ($usuario && $contrasena) {

    $sql = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if (password_verify($contrasena, $row['contrasena'])) {
            $_SESSION['usuario'] = $row['nombre_usuario'];
            $mensaje = "Bienvenido, " . htmlspecialchars($row['nombre_usuario']);
            $exito = true;
        } else {
            $mensaje = "Contraseña incorrecta";
        }

    } else {
        $mensaje = "Usuario no encontrado";
    }

    $stmt->close();
} else {
    $mensaje = "Faltan datos";
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4e73df, #1cc88a);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .card {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            width: 350px;
        }

        .success {
            color: #1cc88a;
            font-size: 20px;
            margin-bottom: 20px;
        }

        .error {
            color: #e74a3b;
            font-size: 20px;
            margin-bottom: 20px;
        }

        a.button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4e73df;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            transition: 0.3s;
        }

        a.button:hover {
            background-color: #2e59d9;
        }
    </style>
</head>
<body>

<div class="card">
    <?php if ($exito): ?>
        <div class="success"><?php echo $mensaje; ?></div>
        <a href="../index.html" class="button">Ir al Panel</a>

        <script>
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        </script>

    <?php else: ?>
        <div class="error"><?php echo $mensaje; ?></div>
        <a href="../index.html" class="button">Volver</a>
    <?php endif; ?>
</div>

</body>
</html>