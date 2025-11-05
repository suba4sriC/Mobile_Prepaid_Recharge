-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: prepaidplan
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `prepaid_plan`
--

DROP TABLE IF EXISTS `prepaid_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prepaid_plan` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `plan_data` varchar(255) DEFAULT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `plan_price` double NOT NULL,
  `plan_sms` varchar(255) DEFAULT NULL,
  `plan_talktime` varchar(255) DEFAULT NULL,
  `plan_validity` varchar(255) DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`plan_id`),
  KEY `FKi6vbr5oa08gp5kodchrlork7x` (`category_id`),
  CONSTRAINT `FKi6vbr5oa08gp5kodchrlork7x` FOREIGN KEY (`category_id`) REFERENCES `prepaid_plan_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepaid_plan`
--

LOCK TABLES `prepaid_plan` WRITE;
/*!40000 ALTER TABLE `prepaid_plan` DISABLE KEYS */;
INSERT INTO `prepaid_plan` VALUES (1,'2GB/Day','Popular Plan 1',199,'100','Unlimited','28 Days',1),(2,'Unlimited','Unlimited Plan 1',399,'100','Unlimited','28 Days',2),(3,'1GB','Add On 1',50,'NA','NA','3 Days',3),(4,'NA','Top Up 1',10,'10','10 Mins','NA',4),(5,'1GB/Day','Home Office 1',299,'50','100 Mins','7 Days',5),(6,'2GB/Day + OTT','OTT Plan 1',399,'100','Unlimited','28 Days',6),(7,'5GB/Day','Family Plan 1',799,'200','Unlimited','28 Days',7),(8,'Unlimited','Unlimited Plan 2',599,'200','Unlimited','56 Days',2),(9,'6GB/Day','Family Plan 2',999,'300','Unlimited','56 Days',7),(10,'3GB/Day + OTT','OTT Plan 2',499,'150','Unlimited','30 Days',6),(11,'3GB/Day','Popular Plan 2',249,'150','Unlimited','28 Days',1),(12,'NA','Top Up 2',20,'20','20 Mins','NA',4),(13,'2GB/Day','Home Office 2',499,'100','200 Mins','14 Days',5),(15,'3GB/Day + OTT','OTT Plan 4',899,'250','Unlimited','90 Days',6),(16,'8GB/Day','Family Plan 4',1499,'500','Unlimited','120 Days',7),(17,'NA','Top Up 4',100,'100','100 Mins','NA',4),(18,'5GB','Add On 4',200,'NA','NA','14 Days',3),(19,'3GB/Day','Popular Plan 4',399,'200','Unlimited','30 Days',1),(20,'Unlimited','Unlimited Plan 4',199,'100','Unlimited','14 Days',2),(21,'4GB/Day','Home Office 3',999,'300','500 Mins','30 Days',5),(22,'10GB/Day','Family Plan 6',1999,'700','Unlimited','180 Days',7),(23,'Unlimited','Home Office 5',1999,'1000','Unlimited','60 Days',5),(24,'10GB','Add On 6',300,'NA','NA','30 Days',3),(25,'Unlimited','Unlimited Plan 6',499,'250','Unlimited','30 Days',2),(26,'NA','Top Up 6',200,'200','200 Mins','NA',4),(27,'3GB/Day','Popular Plan 6',599,'200','Unlimited','60 Days',1),(28,'9GB/Day','Family Plan 5',1799,'600','Unlimited','150 Days',7),(29,'1GB/Day','Popular Plan 5',149,'100','Unlimited','15 Days',1),(30,'7GB','Add On 5',250,'NA','NA','20 Days',3),(31,'Unlimited','Unlimited Plan 5',899,'400','Unlimited','90 Days',2),(32,'Unlimited','Home Office 4',1499,'500','Unlimited','45 Days',5),(33,'NA','Top Up 5',150,'150','150 Mins','NA',4),(34,'Unlimited + OTT','OTT Plan 5',1199,'300','Unlimited','120 Days',6),(35,'Unlimited','Unlimited Plan 3',699,'300','Unlimited','84 Days',2),(36,'NA','Top Up 3',50,'50','50 Mins','NA',4),(37,'Unlimited + OTT','OTT Plan 3',699,'200','Unlimited','60 Days',6),(38,'7GB/Day','Family Plan 3',1299,'400','Unlimited','84 Days',7),(39,'3GB/Day','Home Office 6',699,'200','300 Mins','21 Days',5),(40,'3GB','Add On 3',150,'NA','NA','10 Days',3),(41,'1.5GB/Day','Popular Plan 3',299,'200','Unlimited','30 Days',1),(42,'Unlimited + OTT','OTT Plan 6',1499,'500','Unlimited','365 Days',6),(43,'2.5GB/Day','Popular Plan 7',500,'120','Unlimited','40',1);
/*!40000 ALTER TABLE `prepaid_plan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-05 22:30:40
