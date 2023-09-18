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
  `username` varchar(256)  NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256)  NOT NULL,
  PRIMARY KEY (`admin_id`)
);


DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(256) NOT NULL,
  PRIMARY KEY (`category_id`)
);


DROP TABLE IF EXISTS `registered_users`;
CREATE TABLE `registered_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(256)  NOT NULL,
  `user_email` varchar(256)  NOT NULL,
  `password` varchar(256)  NOT NULL,
  `template_created` varchar(256)  DEFAULT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ;


DROP TABLE IF EXISTS `user_templates`;
CREATE TABLE `user_templates` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(256)  DEFAULT NULL,
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
) ;


-- 2023-09-17 23:54:21
