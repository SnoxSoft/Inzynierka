-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: pirsoft
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `absence_statuses`
--

DROP TABLE IF EXISTS `absence_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absence_statuses` (
  `absence_status_id` int NOT NULL AUTO_INCREMENT,
  `absence_status_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  `absence_status_name_eng` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`absence_status_id`),
  UNIQUE KEY `absence_status_id_UNIQUE` (`absence_status_id`),
  UNIQUE KEY `absence_status_name_UNIQUE` (`absence_status_name`),
  UNIQUE KEY `absence_status_name_eng_UNIQUE` (`absence_status_name_eng`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence_statuses`
--

LOCK TABLES `absence_statuses` WRITE;
/*!40000 ALTER TABLE `absence_statuses` DISABLE KEYS */;
INSERT INTO `absence_statuses` VALUES (1,'Oczekujący','pending'),(2,'Odrzucony','rejected'),(3,'Zaakceptowany','approved');
/*!40000 ALTER TABLE `absence_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absence_types`
--

DROP TABLE IF EXISTS `absence_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absence_types` (
  `absence_type_id` int NOT NULL AUTO_INCREMENT,
  `absence_type_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  `absence_type_category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`absence_type_id`),
  UNIQUE KEY `absence_type_id_UNIQUE` (`absence_type_id`),
  UNIQUE KEY `absence_type_name_UNIQUE` (`absence_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence_types`
--

LOCK TABLES `absence_types` WRITE;
/*!40000 ALTER TABLE `absence_types` DISABLE KEYS */;
INSERT INTO `absence_types` VALUES (1,'Nieobecność','absent'),(2,'Urlop chorobowy','sick'),(3,'Urlop dla poratowania zdrowia','dayoff'),(4,'Urlop macieżyński','dayoff'),(5,'Urlop na oddanie krwi','dayoff'),(6,'Urlop na poszukiwanie pracy','dayoff'),(7,'Urlop na żądanie','demand'),(8,'Urlop ojcowski','dayoff'),(9,'Urlop okolicznościowy','dayoff'),(10,'Urlop szkoleniowy','dayoff'),(11,'Urlop wypoczynkowy','dayoff'),(12,'Urlop wychowawczy','dayoff'),(13,'Urlop za święto w sobotę','dayoff');
/*!40000 ALTER TABLE `absence_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absences`
--

DROP TABLE IF EXISTS `absences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absences` (
  `absence_id` int NOT NULL AUTO_INCREMENT,
  `absence_start_date` date NOT NULL,
  `absence_end_date` date NOT NULL,
  `duration` int NOT NULL,
  `unpaid` tinyint NOT NULL,
  `absence_type_id` int NOT NULL,
  `employee_approver_id` int NOT NULL,
  `employee_owner_id` int NOT NULL,
  `absence_status_id` int NOT NULL,
  PRIMARY KEY (`absence_id`),
  UNIQUE KEY `Id_UNIQUE` (`absence_id`),
  KEY `fk_absence_absence_type_idx` (`absence_type_id`),
  KEY `fk_absence_status_idx` (`absence_status_id`),
  KEY `fk_absence_employee_idx` (`employee_owner_id`),
  KEY `fk_absence_approver_idx` (`employee_approver_id`),
  CONSTRAINT `fk_absence_absence_status` FOREIGN KEY (`absence_status_id`) REFERENCES `absence_statuses` (`absence_status_id`),
  CONSTRAINT `fk_absence_absence_type` FOREIGN KEY (`absence_type_id`) REFERENCES `absence_types` (`absence_type_id`),
  CONSTRAINT `fk_absence_employee_approver` FOREIGN KEY (`employee_approver_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `fk_absence_employee_owner` FOREIGN KEY (`employee_owner_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absences`
--

LOCK TABLES `absences` WRITE;
/*!40000 ALTER TABLE `absences` DISABLE KEYS */;
/*!40000 ALTER TABLE `absences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_roles`
--

DROP TABLE IF EXISTS `company_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `id_UNIQUE` (`role_id`),
  UNIQUE KEY `roleName_UNIQUE` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_roles`
--

LOCK TABLES `company_roles` WRITE;
/*!40000 ALTER TABLE `company_roles` DISABLE KEYS */;
INSERT INTO `company_roles` VALUES (1,'Administrator'),(2,'Kadry'),(3,'Kierownik'),(4,'Księgowość'),(5,'Pracownik'),(6,'Prezes'),(7,'Zarząd');
/*!40000 ALTER TABLE `company_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_types`
--

DROP TABLE IF EXISTS `contract_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_types` (
  `contract_id` int NOT NULL AUTO_INCREMENT,
  `contract_type_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  PRIMARY KEY (`contract_id`),
  UNIQUE KEY `contractName_UNIQUE` (`contract_type_name`),
  UNIQUE KEY `id_UNIQUE` (`contract_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_types`
--

LOCK TABLES `contract_types` WRITE;
/*!40000 ALTER TABLE `contract_types` DISABLE KEYS */;
INSERT INTO `contract_types` VALUES (1,'B2B'),(2,'Nieprzypisany'),(3,'Umowa o dzieło'),(4,'Umowa o pracę'),(5,'Umowa zlecenie');
/*!40000 ALTER TABLE `contract_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `id_UNIQUE` (`department_id`),
  UNIQUE KEY `departamentName_UNIQUE` (`department_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'DPT_TEST');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  `email_address` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(120) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `pesel` varchar(11) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `bank_account_number` varchar(26) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `seniority_in_months` int NOT NULL,
  `employment_start_date` date NOT NULL,
  `is_active` tinyint NOT NULL,
  `password_reset` tinyint NOT NULL,
  `birth_date` date NOT NULL,
  `salary_gross` double NOT NULL,
  `employee_contract_type_id` int NOT NULL,
  `employee_department_id` int NOT NULL,
  `employee_seniority_level_id` int NOT NULL,
  `employee_company_role_id` int NOT NULL,
  `leave_base_days` int NOT NULL DEFAULT '0',
  `leave_demand_days` int NOT NULL DEFAULT '0',
  `leave_is_seniority_threshold` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `id_UNIQUE` (`employee_id`),
  UNIQUE KEY `pesel_UNIQUE` (`pesel`),
  UNIQUE KEY `email_UNIQUE` (`email_address`),
  KEY `fk_employee_contract_type_idx` (`employee_contract_type_id`),
  KEY `fk_employee_department_id_idx` (`employee_department_id`),
  KEY `fk_employee_seniority_level_idx` (`employee_seniority_level_id`),
  KEY `fk_employee_company_role_idx` (`employee_company_role_id`),
  CONSTRAINT `fk_employee_company_role` FOREIGN KEY (`employee_company_role_id`) REFERENCES `company_roles` (`role_id`),
  CONSTRAINT `fk_employee_contract_type` FOREIGN KEY (`employee_contract_type_id`) REFERENCES `contract_types` (`contract_id`),
  CONSTRAINT `fk_employee_department` FOREIGN KEY (`employee_department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `fk_employee_seniority_level` FOREIGN KEY (`employee_seniority_level_id`) REFERENCES `seniority_levels` (`seniority_level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_skills`
--

DROP TABLE IF EXISTS `employees_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_skills` (
  `employee_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`employee_id`,`skill_id`),
  KEY `fk_employees_skills_skill_idx` (`skill_id`),
  KEY `fk_employees_skills_employee_idx` (`employee_id`),
  CONSTRAINT `fk_employees_skills_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `fk_employees_skills_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_skills`
--

LOCK TABLES `employees_skills` WRITE;
/*!40000 ALTER TABLE `employees_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seniority_levels`
--

DROP TABLE IF EXISTS `seniority_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seniority_levels` (
  `seniority_level_id` int NOT NULL AUTO_INCREMENT,
  `seniority_level_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  PRIMARY KEY (`seniority_level_id`),
  UNIQUE KEY `position_UNIQUE` (`seniority_level_name`),
  UNIQUE KEY `id_UNIQUE` (`seniority_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seniority_levels`
--

LOCK TABLES `seniority_levels` WRITE;
/*!40000 ALTER TABLE `seniority_levels` DISABLE KEYS */;
INSERT INTO `seniority_levels` VALUES (2,'Inny'),(1,'Junior'),(3,'Mid'),(4,'Senior');
/*!40000 ALTER TABLE `seniority_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(45) CHARACTER SET cp1250 COLLATE cp1250_general_ci NOT NULL,
  PRIMARY KEY (`skill_id`),
  UNIQUE KEY `id_UNIQUE` (`skill_id`),
  UNIQUE KEY `skillName_UNIQUE` (`skill_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (5,'Html'),(2,'Java'),(4,'MsOffice'),(3,'Php'),(1,'Sql');
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

-- Dump completed on 2023-05-07 15:59:42
