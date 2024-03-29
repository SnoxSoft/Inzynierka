-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pirsoft
-- ------------------------------------------------------
-- Server version	8.0.33

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
INSERT INTO `absence_types` VALUES (1,'Nieobecność','absent'),(2,'Urlop chorobowy','sick'),(3,'Urlop dla poratowania zdrowia','occasional'),(4,'Urlop macierzyński','occasional'),(5,'Urlop na oddanie krwi','occasional'),(6,'Urlop na poszukiwanie pracy','occasional'),(7,'Urlop na żądanie','demand'),(8,'Urlop ojcowski','occasional'),(9,'Urlop okolicznościowy','occasional'),(10,'Urlop szkoleniowy','occasional'),(11,'Urlop wypoczynkowy','dayoff'),(12,'Urlop wychowawczy','occasional'),(13,'Urlop za święto w sobotę','occasional');
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
  `employee_approver_id` int NOT NULL DEFAULT '0',
  `employee_owner_id` int NOT NULL,
  `absence_status_id` int NOT NULL,
  PRIMARY KEY (`absence_id`),
  UNIQUE KEY `Id_UNIQUE` (`absence_id`),
  KEY `fk_absence_absence_type_idx` (`absence_type_id`),
  KEY `fk_absence_status_idx` (`absence_status_id`),
  KEY `fk_absence_employee_idx` (`employee_owner_id`),
  CONSTRAINT `fk_absence_absence_status` FOREIGN KEY (`absence_status_id`) REFERENCES `absence_statuses` (`absence_status_id`),
  CONSTRAINT `fk_absence_absence_type` FOREIGN KEY (`absence_type_id`) REFERENCES `absence_types` (`absence_type_id`),
  CONSTRAINT `fk_absence_employee_owner` FOREIGN KEY (`employee_owner_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=cp1250;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_roles`
--

LOCK TABLES `company_roles` WRITE;
/*!40000 ALTER TABLE `company_roles` DISABLE KEYS */;
INSERT INTO `company_roles` VALUES (1,'Kadry'),(2,'Kierownik'),(3,'Księgowość'),(4,'Pracownik'),(5,'Prezes'),(6,'Zarząd');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Brak zespołu'),(2,'Kadry');
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
  `avatar_file_path` varchar(1000) DEFAULT NULL,
  `password_salt` varchar(200) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Kadry','Start','kadry.start@gmail.com','LaLFcGSqB8hHYkdfW4byoGNTq901tW24bDcGUsu5iIw=','00010113547','00000000000000000000000000',1,'1900-01-02',1,1,'1900-01-01',1,2,2,1,1,1,1,1,'','zpXkOG/FMG1YqbHcMUOfE8qo93vpQKzbQnRRQa9mMCs=');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ADMIN`@`%`*/ /*!50003 TRIGGER `employees_BEFORE_DELETE` BEFORE DELETE ON `employees` FOR EACH ROW BEGIN
	DELETE FROM employees_skills WHERE employee_id = OLD.employee_id;
    UPDATE absences SET employee_approver_id = '0' WHERE employee_approver_id = OLD.employee_id;
    DELETE FROM absences WHERE employee_owner_id = OLD.employee_id;   
    DELETE FROM password_reset_tokens WHERE token_employee_id = OLD.employee_id; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `reset_code` int NOT NULL,
  `expiration_time` datetime NOT NULL,
  `token_employee_id` int NOT NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE KEY `token_id_UNIQUE` (`token_id`),
  UNIQUE KEY `reset_code_UNIQUE` (`reset_code`),
  KEY `fk_token_employee_id_idx` (`token_employee_id`),
  CONSTRAINT `fk_token_employee_id` FOREIGN KEY (`token_employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=cp1250;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
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
INSERT INTO `seniority_levels` VALUES (1,'Inny'),(2,'Junior'),(3,'Mid'),(4,'Senior');
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
INSERT INTO `skills` VALUES (1,'HTML'),(2,'Java'),(3,'MsOffice'),(4,'PHP'),(5,'SQL');
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

-- Dump completed on 2023-06-14 18:09:36
