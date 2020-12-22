-- creating the database
CREATE DATABASE mycrud;

-- using the database
use mycrud;

--creating tables

CREATE TABLE user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password_hash VARCHAR(200) NOT NULL 
);

-- to show tables 
SHOW TABLES;

-- to describe the table
describe user;

