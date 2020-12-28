-- creating the database
CREATE DATABASE mycrud;

-- using the database
use mycrud;

--creating tables

CREATE TABLE user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT false 
);

CREATE TABLE productos (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    valor INT(10) NOT NULL,
    tipo_moneda VARCHAR(10) NOT NULL,
    categoria VARCHAR(30),
    imagen VARCHAR(2000)
);

-- to show tables 
SHOW TABLES;

-- to describe the table 
describe user;

