CREATE DATABASE CasaReal;
USE CasaReal;

CREATE TABLE Ubicacion(
    idUbicacion INT PRIMARY KEY AUTO_INCREMENT,
    calle VARCHAR(50),
    numeroExterior INT,
    numeroInterior INT,
    colonia VARCHAR(50),
    ciudad VARCHAR(30),
    estado VARCHAR(30),
    codigoPostal INT,
    referencia VARCHAR(100)
);

CREATE TABLE Propiedad(
    idPropiedad INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50),
    descripcion VARCHAR(300),
    numRecamaras INT,
    numAutos INT,
    numBanosCompletos INT,
    numMediosBanos INT,
    numPisos INT,
    superficieTotal DECIMAL(10,2),
    tamPatio DECIMAL(10,2),
    anosAntiguedad INT,
    precio DECIMAL(10,2),
    estatus VARCHAR(20),
    ubicacion INT,
    FOREIGN KEY (ubicacion) REFERENCES Ubicacion(idUbicacion)
);

CREATE TABLE Foto(
    idFoto INT PRIMARY KEY AUTO_INCREMENT,
    fotoURL VARCHAR(200),
    lugar VARCHAR(50),
    propiedad INT,
    FOREIGN KEY (propiedad) REFERENCES Propiedad(idPropiedad)
);

CREATE TABLE Usuario(
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(80),
    telefono VARCHAR(10),
    correo VARCHAR(100),
    contrasena VARCHAR(100),
    tipo VARCHAR(20)
);


CREATE TABLE Publicacion(
    idPublicacion INT PRIMARY KEY AUTO_INCREMENT,
    fechaPublicacion DATE,
    tipo VARCHAR(20),
    estatus VARCHAR(20),
    propiedad INT,
    publicador INT,
    vendedor INT,
    autorizador INT,
    FOREIGN KEY (propiedad) REFERENCES Propiedad(idPropiedad),
    FOREIGN KEY (vendedor) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (publicador) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (autorizador) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Cita(
    idCita INT PRIMARY KEY AUTO_INCREMENT,
    fechaCita DATETIME,
    estatus VARCHAR(20),
    publicacion INT,
    comprador INT,
    vendedor INT,
    FOREIGN KEY (publicacion) REFERENCES Publicacion(idPublicacion),
    FOREIGN KEY (comprador) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (vendedor) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Contrato(
    idContrato INT PRIMARY KEY AUTO_INCREMENT,
    fechaContrato DATE,
    detalles VARCHAR(300),
    condicionPago VARCHAR(100),
    precioAcordado DECIMAL(10,2),
    cita INT,
    FOREIGN KEY (cita) REFERENCES Cita(idCita)
);
/*
SELECT * FROM Publicacion P INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal';

SELECT * FROM Publicacion P 
INNER JOIN Propiedad PR ON P.propiedad = PR.idPropiedad 
INNER JOIN Ubicacion U ON PR.ubicacion = U.idUbicacion 
INNER JOIN Foto F ON PR.idPropiedad = F.propiedad AND F.lugar = 'Principal'
WHERE p.autorizador IS NOT NULL
AND (P.vendedor IS NOT NULL OR (P.vendedor IS NULL AND P.fechaPublicacion >= CURDATE() - INTERVAL 14 DAY))
AND P.estatus = 'Activa'; 

SELECT * FROM PROPIEDAD P
INNER JOIN UBICACION U ON P.UBICACION = U.IDUBICACION;

*/
