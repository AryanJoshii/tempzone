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
} else {
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

if ($conn->query($createAdminTableQuery) === TRUE) {
    echo "Admin table created successfully \n";
} else {
    echo "Error creating admin table: " . $conn->error . "\n";
}

$createUsersTableQuery = "CREATE TABLE IF NOT EXISTS `registered_users` ( 
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `template_created` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
)";

if ($conn->query($createUsersTableQuery) === TRUE) {
    echo "Users table created successfully \n";
} else {
    echo "Error creating users table: " . $conn->error . "\n";
}

$createTemplateTableQuery = "CREATE TABLE IF NOT EXISTS `user_templates` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(256) NOT NULL,
  `template_tags` varchar(256) NOT NULL,
  `template_owner` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`template_id`),
  KEY `template_owner` (`template_owner`),
  CONSTRAINT `user_templates_ibfk_3` FOREIGN KEY (`template_owner`) REFERENCES `registered_users` (`user_id`)
)";

if ($conn->query($createTemplateTableQuery) === TRUE) {
    echo "Template table created successfully \n";
} else {
    echo "Error creating template table: " . $conn->error . "\n";
}

$conn->close();
?>
