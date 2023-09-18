<?php

$servername = "localhost";
$username = "bhagyesh";
$password = "Bhagyesh@123";

$conn = mysqli_connect($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$databaseName = "TempZoneasa";
$createDbQuery = "CREATE DATABASE IF NOT EXISTS `$databaseName`";

if ($conn->query($createDbQuery) === TRUE) {
    echo "Database created successfully \n";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

$conn->select_db($databaseName);

$dropAdminTableQuery = "DROP TABLE IF EXISTS `admin`";
if ($conn->query($dropAdminTableQuery) === TRUE) {
    echo "Admin table dropped successfully \n";
} else {
    echo "Error dropping admin table: " . $conn->error . "\n";
}

$createAdminTableQuery = "CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`admin_id`)
)";

if ($conn->query($createAdminTableQuery) === TRUE) {
    echo "Admin table created successfully \n";
} else {
    echo "Error creating admin table: " . $conn->error . "\n";
}

$dropCategoryTableQuery = "DROP TABLE IF EXISTS `category`";
if ($conn->query($dropCategoryTableQuery) === TRUE) {
    echo "Category table dropped successfully \n";
} else {
    echo "Error dropping category table: " . $conn->error . "\n";
}

$createCategoryTableQuery = "CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(256) NOT NULL,
  PRIMARY KEY (`category_id`)
)";

if ($conn->query($createCategoryTableQuery) === TRUE) {
    echo "Category table created successfully \n";
} else {
    echo "Error creating category table: " . $conn->error . "\n";
}

$dropRegisteredUsersTableQuery = "DROP TABLE IF EXISTS `registered_users`";
if ($conn->query($dropRegisteredUsersTableQuery) === TRUE) {
    echo "Registered Users table dropped successfully \n";
} else {
    echo "Error dropping Registered Users table: " . $conn->error . "\n";
}

$createRegisteredUsersTableQuery = "CREATE TABLE `registered_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(256) NOT NULL,
  `user_email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `template_created` varchar(256) DEFAULT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
)";

if ($conn->query($createRegisteredUsersTableQuery) === TRUE) {
    echo "Registered Users table created successfully \n";
} else {
    echo "Error creating Registered Users table: " . $conn->error . "\n";
}

$dropUserTemplatesTableQuery = "DROP TABLE IF EXISTS `user_templates`";
if ($conn->query($dropUserTemplatesTableQuery) === TRUE) {
    echo "User Templates table dropped successfully \n";
} else {
    echo "Error dropping User Templates table: " . $conn->error . "\n";
}

$createUserTemplatesTableQuery = "CREATE TABLE `user_templates` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(256) DEFAULT NULL,
  `template_tags` varchar(256) DEFAULT NULL,
  `template_category` int DEFAULT NULL,
  `template_owner` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`template_id`),
  KEY `template_category` (`template_category`),
  KEY `template_owner` (`template_owner`),
  CONSTRAINT `user_templates_ibfk_4` FOREIGN KEY (`template_category`) REFERENCES `category` (`category_id`),
  CONSTRAINT `user_templates_ibfk_5` FOREIGN KEY (`template_owner`) REFERENCES `registered_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
)";

if ($conn->query($createUserTemplatesTableQuery) === TRUE) {
    echo "User Templates table created successfully \n";
} else {
    echo "Error creating User Templates table: " . $conn->error . "\n";
}

$conn->close();
?>
