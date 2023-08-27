<?php

$servername = "localhost";
$username = "bhagyesh";
$password = "Bhagyesh@123";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$databaseName = "TempZone";
$createDbQuery = "CREATE DATABASE IF NOT EXISTS `$databaseName`";
if ($conn->query($createDbQuery) === TRUE) {
    echo "Database created successfully \n";
}else{
    echo "Error creating database: " . $conn->error . "<br>";
}
$conn->select_db($databaseName);
$createAdminTableQuery = "CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `access` varchar(256) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";

$createUsersTableQuery = "CREATE TABLE IF NOT EXISTS `registered_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";

if ($conn->query($createAdminTableQuery) === TRUE && $conn->query($createUsersTableQuery) === TRUE) {
    echo "Tables created successfully \n";
} else {
    echo "Error creating tables: " . $conn->error . "\n";
}

$conn->close();
?>
