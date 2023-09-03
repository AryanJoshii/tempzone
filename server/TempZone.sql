-- Adminer 4.8.1 MySQL 8.0.34-0ubuntu0.22.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `TempZone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `TempZone`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `access` varchar(256) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(256) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `registered_users`;
CREATE TABLE `registered_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `template_created` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `registered_users` (`user_id`, `user_name`, `user_email`, `password`, `template_created`, `registered_at`, `updated_at`) VALUES
(3,	'bhagyesh',	'bhagyesh@gmail.com',	'Bhagyesh@123',	'NULL',	NULL,	NULL),
(4,	'bhagyeshs',	'sds@gmail.cm',	'Bhagyesh@123',	'',	'2023-09-01 18:18:16',	'2023-09-01 18:18:16'),
(5,	'bhagyeshssd',	'sds@gmail.cmsd',	'Bhagyesh@123',	'',	'2023-09-01 18:18:47',	'2023-09-01 18:18:47'),
(6,	'sds',	'jnhj@gmail.comm',	'e2fc714c4727ee9395f324cd2e7f331f',	'',	'2023-09-01 18:25:07',	'2023-09-01 18:25:07');

DROP TABLE IF EXISTS `user_templates`;
CREATE TABLE `user_templates` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(256) NOT NULL,
  `template_tags` varchar(256) NOT NULL,
  `template_category` int NOT NULL,
  `template_owner` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`template_id`),
  KEY `template_owner` (`template_owner`),
  KEY `template_category` (`template_category`),
  CONSTRAINT `user_templates_ibfk_3` FOREIGN KEY (`template_owner`) REFERENCES `registered_users` (`user_id`),
  CONSTRAINT `user_templates_ibfk_4` FOREIGN KEY (`template_category`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2023-09-03 18:56:48
