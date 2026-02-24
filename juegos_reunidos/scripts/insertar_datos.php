<?php
$conn = new mysqli("localhost", "root", "", "juegos_reunidos");
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$users = [
    ["admin","admin","admin@mail.com","12345678","1990-01-15","administrador",7],
    ["andres","andres","andres@mail.com","87654321","1995-06-20","usuario",3],
    ["testing","testing","testing@mail.com","11223344","1992-03-10","usuario",5],
    ["user4","Pass1234","user4@mail.com","612345678","1993-04-12","usuario",7],
    ["user5","Pass1234","user5@mail.com","623456789","1994-05-18","usuario",7],
    ["user6","Pass1234","user6@mail.com","634567890","1990-11-01","usuario",7],
    ["user7","Pass1234","user7@mail.com","645678901","1988-07-22","usuario",7],
    ["user8","Pass1234","user8@mail.com","656789012","1996-09-09","usuario",3],
    ["user9","Pass1234","user9@mail.com","667890123","1991-12-30","usuario",1],
    ["user10","Pass1234","user10@mail.com","678901234","1992-02-14","usuario",5],
];

$stmt = $conn->prepare("INSERT INTO usuarios (user, password, email, telefono, fechaNacimiento, rol, favorito) VALUES (?, ?, ?, ?, ?, ?, ?)");

foreach ($users as $u) {
    $hash = password_hash($u[1], PASSWORD_DEFAULT);
    $stmt->bind_param("ssssssi", $u[0], $hash, $u[2], $u[3], $u[4], $u[5], $u[6]);
    $stmt->execute();
}

echo "Usuarios insertados correctamente con contraseña hasheada.";

$stmt->close();
$conn->close();
?>