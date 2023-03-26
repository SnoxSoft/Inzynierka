-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pirsoft
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountType` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `roleName_UNIQUE` (`accountType`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
INSERT INTO `account_type` VALUES (1,'Accounting'),(2,'Administrator'),(3,'BoardMember'),(4,'Ceo'),(5,'Employee'),(6,'HumanResources'),(7,'Manager');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_type`
--

DROP TABLE IF EXISTS `contract_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contractType` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contractName_UNIQUE` (`contractType`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_type`
--

LOCK TABLES `contract_type` WRITE;
/*!40000 ALTER TABLE `contract_type` DISABLE KEYS */;
INSERT INTO `contract_type` VALUES (1,'B2B'),(2,'ContractOfEmployment'),(3,'ContractOfMandate');
/*!40000 ALTER TABLE `contract_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `departamentName_UNIQUE` (`departmentName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'PIR-DPT-01');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `pesel` varchar(11) NOT NULL,
  `bankAccountNumber` varchar(26) DEFAULT NULL,
  `seniorityInMonths` int NOT NULL,
  `employmentStartDate` date NOT NULL,
  `isActive` tinyint NOT NULL,
  `passwordReset` tinyint NOT NULL,
  `dateOfBirth` date NOT NULL,
  `grossSalary` double NOT NULL,
  `contract_type_id` int NOT NULL,
  `department_id` int NOT NULL,
  `position_id` int NOT NULL,
  `account_type_id` int NOT NULL,
  PRIMARY KEY (`id`,`contract_type_id`,`department_id`,`position_id`,`account_type_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `pesel_UNIQUE` (`pesel`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_employee_position_idx` (`position_id`),
  KEY `fk_employee_contract_type_id_idx` (`contract_type_id`),
  KEY `fk_employee_account_type_id_idx` (`account_type_id`),
  KEY `fk_employee_department_idx` (`department_id`),
  CONSTRAINT `fk_employee_account_type_id` FOREIGN KEY (`account_type_id`) REFERENCES `account_type` (`id`),
  CONSTRAINT `fk_employee_contract_type_id` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_type` (`id`),
  CONSTRAINT `fk_employee_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `fk_employee_position` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_has_skills`
--

DROP TABLE IF EXISTS `employee_has_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_has_skills` (
  `employee_id` int NOT NULL,
  `skills_id` int NOT NULL,
  PRIMARY KEY (`employee_id`,`skills_id`),
  KEY `fk_employee_has_skills_employee1_idx` (`employee_id`),
  KEY `fk_employee_has_skills_skills_idx` (`skills_id`),
  CONSTRAINT `fk_employee_has_skills_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_employee_has_skills_skills` FOREIGN KEY (`skills_id`) REFERENCES `skills` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_has_skills`
--

LOCK TABLES `employee_has_skills` WRITE;
/*!40000 ALTER TABLE `employee_has_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_has_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holiday` (
  `id` int NOT NULL AUTO_INCREMENT,
  `holidayStart` date NOT NULL,
  `holidayEnd` date NOT NULL,
  `duration` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Id_UNIQUE` (`id`),
  KEY `fk_holiday_employee_id_idx` (`employee_id`),
  CONSTRAINT `fk_holiday_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `positionType` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `position_UNIQUE` (`positionType`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Junior'),(2,'Mid'),(3,'Senior');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skillName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `skillName_UNIQUE` (`skillName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-11 21:40:15
