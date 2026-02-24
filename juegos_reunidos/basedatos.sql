CREATE DATABASE juegos_reunidos;

USE juegos_reunidos;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(15),
    fechaNacimiento DATE,
    rol VARCHAR(20) DEFAULT 'usuario',
    favorito INT
);
INSERT INTO usuarios (user, password, email, telefono, fechaNacimiento, rol, favorito) VALUES
('admin', 'admin', 'admin@mail.com', '12345678', '1990-01-15', 'administrador', 7),
('andres', 'andres', 'andres@mail.com', '87654321', '1995-06-20', 'usuario', 3),
('testing', 'testing', 'testing@mail.com', '11223344', '1992-03-10', 'usuario', 5),
('user4', 'Pass1234', 'user4@mail.com', '612345678', '1993-04-12', 'usuario', 7),
('user5', 'Pass1234', 'user5@mail.com', '623456789', '1994-05-18', 'usuario', 7),
('user6', 'Pass1234', 'user6@mail.com', '634567890', '1990-11-01', 'usuario', 7),
('user7', 'Pass1234', 'user7@mail.com', '645678901', '1988-07-22', 'usuario', 7),
('user8', 'Pass1234', 'user8@mail.com', '656789012', '1996-09-09', 'usuario', 3),
('user9', 'Pass1234', 'user9@mail.com', '667890123', '1991-12-30', 'usuario', 1),
('user10', 'Pass1234', 'user10@mail.com', '678901234', '1992-02-14', 'usuario', 5);