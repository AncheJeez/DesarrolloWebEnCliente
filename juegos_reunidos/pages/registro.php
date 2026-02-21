<?php
$conn = new mysqli("localhost", "root", "", "juegos_reunidos");

if ($conn->connect_error) {
        die("Error de conexión");
}

$usuario = $_POST['nombre_usuario'] ?? null;
$email = $_POST['email'] ?? null;
$contrasena = $_POST['contrasena'] ?? null;

if (!$usuario || !$email || !$contrasena) {
        die("Faltan datos.");
}

$hash = password_hash($contrasena, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios(nombre_usuario, email, contrasena)
        VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $email, $hash);

$exito = $stmt->execute();

$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
        <meta charset="UTF-8">
        <title>Registro</title>
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
                <div class="success">Usuario registrado correctamente</div>
                <a href="../index.html" class="button">Ir al Login</a>
                <script>
                setTimeout(() => {
                        window.location.href = "../index.html";
                }, 2000);
        </script>
        <?php else: ?>
                <div class="error">Error al registrar usuario</div>
                <a href="../index.html" class="button">Volver</a>
        <?php endif; ?>
</div>

</body>
</html>