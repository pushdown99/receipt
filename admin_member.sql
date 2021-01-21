-- MariaDB dump 10.17  Distrib 10.4.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hancom
-- ------------------------------------------------------
-- Server version	10.4.12-MariaDB-1:10.4.12+maria~xenial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_member`
--

DROP TABLE IF EXISTS `admin_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rcn` varchar(32) NOT NULL,
  `passwd` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `owner` varchar(32) NOT NULL,
  `bzcond` varchar(32) DEFAULT '',
  `bztype` varchar(32) DEFAULT '',
  `bzname` varchar(32) NOT NULL,
  `phone` varchar(32) NOT NULL,
  `opening` timestamp NOT NULL DEFAULT current_timestamp(),
  `area1` varchar(32) NOT NULL,
  `area2` varchar(32) NOT NULL,
  `address` varchar(128) NOT NULL,
  `lat` decimal(11,7) DEFAULT NULL,
  `lng` decimal(11,7) DEFAULT NULL,
  `status` varchar(8) DEFAULT '사용',
  `updater` varchar(32) DEFAULT '',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `register` varchar(32) DEFAULT '',
  `registered` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_member`
--

LOCK TABLES `admin_member` WRITE;
/*!40000 ALTER TABLE `admin_member` DISABLE KEYS */;
INSERT INTO `admin_member` VALUES (6,'206-86-50193','xyz','이마트 전주점','강희석','도매','소매','마트','063-259-1234','1998-12-02 15:00:00','전라북도','전주시 완산구','전주시 완산구 당산로 111(서신동 767)',NULL,NULL,'사용','관리자','2021-01-20 11:40:30','관리자','2021-01-20 11:30:28'),(7,'214-88-59748','xyz','왱이콩나물국밥','유대성','숙박 및 음식점업','한식 음식점업','음식점','063-287-6980','1986-12-31 15:00:00','전라북도','전주시 완산구','전라북도 전주시 완산구 경원동2가 동문길 88',NULL,NULL,'사용','관리자','2021-01-20 11:40:30','관리자','2021-01-20 11:35:44'),(8,'402-81-18476','xyz','PNB 풍년제과 한옥마을점','강지웅','숙박 및 음식점업','한식 음식점업','제과','063-226-2737','1986-12-31 15:00:00','전라북도','전주시 완산구','전라북도 전주시 완산구 은행로 61',NULL,NULL,'사용','관리자','2021-01-20 11:40:30','관리자','2021-01-20 11:36:46'),(9,'201-81-21515','xyz',' 스타벅스 전주한옥마을점','송 데이비드 호섭','숙박 및 음식점업','휴게음식점','카페','1522-3232','1986-12-31 15:00:00','전라북도','전주시 완산구','전라북도 전주시 완산구 전동 187-9',NULL,NULL,'사용','관리자','2021-01-20 11:40:30','관리자','2021-01-20 11:38:36');
/*!40000 ALTER TABLE `admin_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-21 16:36:37
