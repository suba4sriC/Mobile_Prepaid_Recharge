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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `date_and_time` datetime(6) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `plan_id` int NOT NULL,
  `user_id` int NOT NULL,
  `amount` double NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `UK3d7t68r30gvwq45ekr9hqi6j4` (`payment_id`),
  KEY `FKch8vwi9i6vr4y5sr4jg0gi10x` (`plan_id`),
  KEY `FKaulm0s56kxr9b3fwb3dconhty` (`user_id`),
  CONSTRAINT `FKaulm0s56kxr9b3fwb3dconhty` FOREIGN KEY (`user_id`) REFERENCES `prepaid_user` (`user_id`),
  CONSTRAINT `FKch8vwi9i6vr4y5sr4jg0gi10x` FOREIGN KEY (`plan_id`) REFERENCES `prepaid_plan` (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'2025-03-18 16:40:18.891000','pay_Q8K3Mg1rT2pZSY',19,2,399,'Success'),(2,'2025-03-19 04:53:26.311000','pay_Q8WXsdQi1Wm6DB',13,2,499,'Success'),(3,'2025-03-19 09:52:48.802000','pay_Q8bdvlidjIttuZ',19,2,399,'Success'),(4,'2025-03-21 05:23:55.397000','pay_Q9K8NVRcQ3zCMV',37,2,699,'Success'),(5,'2025-03-21 06:06:26.594000','pay_Q9KrG7y5pyDIK4',7,2,799,'Success'),(6,'2025-03-21 08:41:22.817000','pay_Q9NUjG1EenjcZa',8,2,599,'Success'),(7,'2025-03-21 10:54:25.084000','pay_Q9PlRHfhxvpTHw',18,2,200,'Success'),(8,'2025-03-23 18:52:12.929000','pay_QAKyOouPAsIloo',29,2,149,'Success'),(9,'2025-03-23 19:19:30.773000','pay_QALQukrJJnhjrI',34,2,1199,'Success'),(10,'2025-03-24 04:25:14.790000','pay_QAUji06Rjk2a4K',8,2,599,'Success'),(11,'2025-03-24 04:43:03.375000','pay_QAV2SxMU2ykEgS',34,2,1199,'Success'),(12,'2025-03-24 05:06:59.669000','pay_QAVRlawOBHSAI7',34,2,1199,'Success'),(13,'2025-03-24 05:09:56.262000','pay_QAVUu3yPICQ83X',34,2,1199,'Success'),(14,'2025-03-24 05:19:46.688000','pay_QAVfJpUgQ9ywJX',16,2,1499,'Success'),(15,'2025-03-24 05:28:38.470000','pay_QAVog3jwg2L6Vz',38,2,1299,'Success'),(16,'2025-03-24 05:38:39.170000','pay_QAVzFaHmnkmAKu',3,2,50,'Success'),(17,'2025-03-24 07:34:30.434000','pay_QAXxcbLbB6pksU',41,2,299,'Success'),(18,'2025-03-24 09:14:00.647000','pay_QAZej6XbuMO5Iy',29,2,149,'Success'),(19,'2025-04-07 05:40:09.118000','pay_QG3UP6VTV7B4qh',3,2,50,'Success'),(20,'2025-05-17 14:46:23.084000','pay_QW2ASSP9tAkfF3',13,2,499,'Success'),(21,'2025-10-13 08:49:34.440000','pay_RStgMRi8oRtcHU',8,2,599,'Success');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-05 22:30:38
