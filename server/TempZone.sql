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

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1,	'sdsd');

DROP TABLE IF EXISTS `registered_users`;
CREATE TABLE `registered_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `template_created` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `registered_users` (`user_id`, `user_name`, `user_email`, `password`, `template_created`, `registered_at`, `updated_at`) VALUES
(4,	'bhagyeshs',	'sds@gmail.cm',	'Bhagyesh@123',	'',	'2023-09-01 18:18:16',	'2023-09-01 18:18:16'),
(5,	'bhagyeshssd',	'sds@gmail.cmsd',	'Bhagyesh@123',	'',	'2023-09-01 18:18:47',	'2023-09-01 18:18:47'),
(6,	'sds',	'jnhj@gmail.comm',	'e2fc714c4727ee9395f324cd2e7f331f',	'',	'2023-09-01 18:25:07',	'2023-09-01 18:25:07'),
(7,	'bhagyeshssd',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:38:44',	'2023-09-03 19:38:44'),
(8,	'bhagyeshssd',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:41:45',	'2023-09-03 19:41:45'),
(9,	'bhagyeshssd',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:41:57',	'2023-09-03 19:41:57'),
(10,	'bhagyeshssd',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:42:37',	'2023-09-03 19:42:37'),
(11,	'bhagyeshssdsds',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:44:37',	'2023-09-03 19:44:37'),
(12,	'bhagyeshssdsdss',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:46:58',	'2023-09-03 19:46:58'),
(13,	'bhagyeshssdsdssasa',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:47:26',	'2023-09-03 19:47:26'),
(14,	'bhagyeshssdsdasassasa',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:51:04',	'2023-09-03 19:51:04'),
(15,	'bhagyeshssdsdasassassdsa',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:56:30',	'2023-09-03 19:56:30'),
(16,	'bhagyeshssdsdasassassdsaasa',	'sds@gmail.com',	'9ae97b4144525f9176e4772cea807aab',	NULL,	'2023-09-03 19:56:57',	'2023-09-03 19:56:57'),
(17,	'asas',	'sas@gmail.com',	'cc2bd8f09bb88b5dd20f9b432631b8ca',	NULL,	'2023-09-03 20:05:38',	'2023-09-03 20:05:38'),
(18,	'asasasa',	'sas@gmail.com',	'cc2bd8f09bb88b5dd20f9b432631b8ca',	NULL,	'2023-09-03 20:06:02',	'2023-09-03 20:06:02'),
(19,	'bhagyesha',	'bhagyesh@gmail.com',	'fe93c037d88d39e0098530c30c7ad15a',	NULL,	'2023-09-07 06:44:14',	'2023-09-07 06:44:14'),
(21,	'sdsds',	'asds@gmail.com',	'cc2bd8f09bb88b5dd20f9b432631b8ca',	NULL,	'2023-09-07 10:18:49',	'2023-09-07 10:18:49');

DROP TABLE IF EXISTS `user_templates`;
CREATE TABLE `user_templates` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `template_tags` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `template_category` int DEFAULT NULL,
  `template_owner` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`template_id`),
  KEY `template_owner` (`template_owner`),
  KEY `template_category` (`template_category`),
  CONSTRAINT `user_templates_ibfk_3` FOREIGN KEY (`template_owner`) REFERENCES `registered_users` (`user_id`),
  CONSTRAINT `user_templates_ibfk_4` FOREIGN KEY (`template_category`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user_templates` (`template_id`, `template_name`, `template_tags`, `template_category`, `template_owner`, `created_at`, `updated_at`) VALUES
(16,	NULL,	NULL,	NULL,	19,	'2023-09-13 02:31:29',	'2023-09-13 02:31:29'),
(17,	'Updated Name',	'\"<html><head><title>sd</title><body><p id=\"test\">Hello</p></body></html>\"',	1,	19,	'2023-09-13 02:31:52',	'2023-09-13 02:45:07'),
(18,	NULL,	NULL,	NULL,	18,	'2023-09-13 02:31:29',	'2023-09-13 02:31:29');

-- 2023-09-16 17:41:39
