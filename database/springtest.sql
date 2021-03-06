-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919ALL_PLUGINS
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for springtest
CREATE DATABASE IF NOT EXISTS `springtest` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `springtest`;

-- Dumping structure for table springtest.puzzle
CREATE TABLE IF NOT EXISTS `puzzle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table springtest.puzzle: ~0 rows (approximately)
/*!40000 ALTER TABLE `puzzle` DISABLE KEYS */;
INSERT INTO `puzzle` (`id`, `data`) VALUES
	(0, '{\r\n    "data": [\r\n        [\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"}\r\n        ],\r\n        [\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"}\r\n        ],\r\n        [\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"}\r\n        ],\r\n        [\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"}\r\n        ],\r\n        [\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":false, "color":"0xFFFFFF"}\r\n        ]\r\n    ]\r\n}'),
	(2, '{\r\n    "data": [\r\n        [\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"}\r\n        ],\r\n        [\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"}\r\n        ],\r\n        [\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"}\r\n        ],\r\n        [\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"}\r\n        ],\r\n        [\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":true, "color":"0xFF0000"},\r\n            {"filled":false, "color":"0xFFFFFF"},\r\n            {"filled":false, "color":"0xFFFFFF"}\r\n        ]\r\n    ]\r\n}');
/*!40000 ALTER TABLE `puzzle` ENABLE KEYS */;

-- Dumping structure for table springtest.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table springtest.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name`) VALUES
	(1, 'jon@.com'),
	(2, 'Bond'),
	(3, 'Fan');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
