-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: codeflow
-- ------------------------------------------------------
-- Server version	9.0.0

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
-- Table structure for table `comments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `submission_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `post_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `course_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `submission_id` (`submission_id`),
  KEY `author_id` (`author_id`),
  KEY `post_id` (`post_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `comments_ibfk_1972` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_1973` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`),
  CONSTRAINT `comments_ibfk_1974` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_1975` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_1976` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('0e04797c-0cfa-4ca0-98ee-bdcc1dae1b65','71c4854a-4317-42d3-9856-91ccbe18ecc6',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'comment 1.1.2',1,'2025-05-05 01:55:01','2025-05-05 01:55:01',NULL),('1082a675-db30-4711-94b0-ec254d984e21','5e2e6cb7-91bb-416d-bfd7-bf4539647725',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.3.1',1,'2025-05-05 01:19:46','2025-05-05 01:19:46',NULL),('12849a69-3f36-4af2-bbe5-bcc4a2dc17d0','82e0e47a-ba77-4c0b-a37d-ce05d6f92e4f',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Comment 1.1',1,'2025-05-02 15:30:08','2025-05-02 15:30:08',NULL),('1ada814e-1262-4656-b5e5-0f3fab8ff2c8',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','a0247cf7-c469-4916-8187-cd0630b05db4',NULL,'I admit it! I did not read this post, BUT I AM ABSOLUTELY CERTAIN THAT THERE ARE MUCH MORE EFFICIENT, HUMAN PROBLEM SOLVEING SKILLS IMPROVING, PROGRAMMING LANGUAGES THAN JS. Edit: FOR AI',1,'2025-05-04 21:10:10','2025-05-04 21:10:10',NULL),('2633a9b1-0065-461f-b491-94fd9a04a515','376dad17-2aec-46c5-9aea-dd537a31b687',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'comment 2.1',1,'2025-05-05 01:54:46','2025-05-05 01:54:46',NULL),('2b7ace2e-bfe4-4811-ad61-26b5010026ec',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2f4a81eb-16a6-4b02-913c-43e2f1d2ffa7',NULL,'?? Verry good',1,'2025-05-08 00:57:14','2025-05-08 00:57:14',NULL),('2fb01aea-485f-47a5-b24f-71a6e45609df','c8acba49-71db-4d04-a702-7b5fbdd759b3',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.1.1',1,'2025-05-05 01:19:10','2025-05-05 01:19:10',NULL),('376dad17-2aec-46c5-9aea-dd537a31b687','fe32f1a3-c151-4289-bff3-2b41bb3c7ec4',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'comment',1,'2025-05-05 01:34:16','2025-05-05 13:39:55',NULL),('49e4f2d3-2bbe-4cdc-bdf9-d24dcb9e721e','8d90b638-cfdf-4d32-9dba-9355aaa35ed7',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Comment 1.1.1',1,'2025-05-04 18:11:14','2025-05-04 18:17:24',NULL),('530a8c76-6813-4764-9661-d0961ba7a4cf',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Also, I must note that we do NOT need AI to survive. I promise you, your code, if you try to improve it YOURSELF, IT WILL BE BETTER THAN ANYTHING ELSE AI COULD MAKE! ??',1,'2025-05-04 21:07:57','2025-05-04 21:07:57',NULL),('5d368c84-9045-48ad-a3f1-babb61bb5b42','5e2e6cb7-91bb-416d-bfd7-bf4539647725',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.3.3',1,'2025-05-05 01:21:21','2025-05-05 01:21:21',NULL),('5e2e6cb7-91bb-416d-bfd7-bf4539647725','530a8c76-6813-4764-9661-d0961ba7a4cf',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.3',1,'2025-05-05 01:18:54','2025-05-05 01:18:54',NULL),('5e43ae83-541d-4e9f-b83a-f2c4cc7858e3','7c7b03c5-08cb-4a5f-bf2e-5efd55982af5',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'gì đấyyy ??',1,'2025-05-04 20:53:36','2025-05-04 20:53:36',NULL),('62dcc3e3-0fd9-4340-97eb-cd0877861214','5e43ae83-541d-4e9f-b83a-f2c4cc7858e3',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'hahahaa ???',1,'2025-05-04 20:54:20','2025-05-04 20:54:20',NULL),('6a53ffac-3a37-4b5b-aa3c-1c521962fbdf',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'Ha! "In the age of AI assisted developmentae", this sounds like some early 2000s TV advertisement for AOL lol wtf',1,'2025-05-04 21:09:37','2025-05-04 21:09:37',NULL),('7148f7de-74ad-415f-9623-0ce52c1eeb8f',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','a0247cf7-c469-4916-8187-cd0630b05db4',NULL,'Also, I must note that we do NOT need AI to survive. I promise you, your code, if you try to improve it YOURSELF, IT WILL BE BETTER THAN ANYTHING ELSE AI COULD MAKE!',1,'2025-05-04 21:10:03','2025-05-04 21:10:03',NULL),('71c4854a-4317-42d3-9856-91ccbe18ecc6','8c5d0ff5-04bc-487d-9a53-016ce44abeb8',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'comment 1.1',1,'2025-05-05 01:34:22','2025-05-05 01:34:22',NULL),('757db8f9-d47b-44db-ba77-d27bfc8fcfa1','530a8c76-6813-4764-9661-d0961ba7a4cf',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.2',1,'2025-05-05 01:18:48','2025-05-05 01:18:48',NULL),('7c7b03c5-08cb-4a5f-bf2e-5efd55982af5',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Comment 3',1,'2025-05-04 19:19:07','2025-05-04 19:19:07',NULL),('7e05a72f-4709-416b-b6fb-fb6b59cf0545','e0079acc-e91a-437f-8db3-06ccc1240a8a',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'hay nha ??',1,'2025-05-04 20:57:29','2025-05-04 20:57:29',NULL),('82e0e47a-ba77-4c0b-a37d-ce05d6f92e4f',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Comment 1',1,'2025-05-02 15:27:50','2025-05-02 15:27:50',NULL),('8a3e4db1-8cf7-4b88-b89d-7f84ccbc7a43',NULL,NULL,'932cc25a-0a00-4d66-bf81-71cace9f2403','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'Tesst comment',1,'2025-05-05 13:48:41','2025-05-05 13:48:41',NULL),('8c5d0ff5-04bc-487d-9a53-016ce44abeb8','fe32f1a3-c151-4289-bff3-2b41bb3c7ec4',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'comment 1',1,'2025-05-05 01:34:13','2025-05-05 01:34:13',NULL),('8d90b638-cfdf-4d32-9dba-9355aaa35ed7','12849a69-3f36-4af2-bbe5-bcc4a2dc17d0',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Comment 1.1.2',1,'2025-05-04 18:14:48','2025-05-04 18:14:48',NULL),('950b6606-b77a-4a0d-ae1f-bfb114a13fff',NULL,NULL,'4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'Tesst',1,'2025-05-05 23:14:37','2025-05-05 23:14:37',NULL),('9bc0fcf7-dda5-483a-a361-4f87a59d5e20','7c7b03c5-08cb-4a5f-bf2e-5efd55982af5',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'gì đấyyy ??',1,'2025-05-04 20:53:34','2025-05-04 20:53:34',NULL),('9dfadc20-32c9-4a31-b77f-845c4fa08b76',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'Frappe actually has a CRM that is separate from ERPNext.\n\nhttps://frappe.io/crm',1,'2025-05-04 23:40:21','2025-05-04 23:40:21',NULL),('a1092b11-22a5-4c55-95b6-714948a57e76',NULL,NULL,'4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'Tesst',1,'2025-05-05 23:14:30','2025-05-05 23:14:30',NULL),('a8d92a11-17e8-47f4-822e-46768c680cf6','7148f7de-74ad-415f-9623-0ce52c1eeb8f',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','a0247cf7-c469-4916-8187-cd0630b05db4',NULL,'Thank you for this. Those APIs have helped me to make new ideas.',1,'2025-05-04 21:45:07','2025-05-04 21:45:07','2025-05-05 23:11:09'),('b186da7e-0cb2-4c2d-85de-0e0599a632f0','12849a69-3f36-4af2-bbe5-bcc4a2dc17d0',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'what to do man tell the auther to containerise it lol so that it can work on any machine.',1,'2025-05-04 20:57:46','2025-05-04 20:57:46',NULL),('bde93d7a-0821-4a2b-918f-8e225fe8c21a',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'node js have always new thing every day. always reinvented wheels!',1,'2025-05-04 23:45:39','2025-05-04 23:45:39',NULL),('c3a5ffae-45f6-4c2c-b670-17c28888700f','5e2e6cb7-91bb-416d-bfd7-bf4539647725',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.3.2',1,'2025-05-05 01:21:18','2025-05-05 01:21:18',NULL),('c76f806d-be7a-49c5-86a3-1c428bddb241','1ada814e-1262-4656-b5e5-0f3fab8ff2c8',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','a0247cf7-c469-4916-8187-cd0630b05db4',NULL,'Just started working with APIs and this right here is my perfect match. Eyo thanks for sharing.',1,'2025-05-04 21:44:59','2025-05-04 21:44:59','2025-05-05 23:11:01'),('c7df055c-653d-4de5-9107-0603704f4f20','7e05a72f-4709-416b-b6fb-fb6b59cf0545',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'I admit it! I did not read this post, BUT I AM ABSOLUTELY CERTAIN THAT THERE ARE MUCH MORE EFFICIENT, HUMAN PROBLEM SOLVEING SKILLS IMPROVING, PROGRAMMING LANGUAGES THAN JS. Edit: FOR AI',1,'2025-05-04 20:58:03','2025-05-04 20:58:03',NULL),('c8acba49-71db-4d04-a702-7b5fbdd759b3','530a8c76-6813-4764-9661-d0961ba7a4cf',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'comment 1.1',1,'2025-05-05 01:18:44','2025-05-05 01:18:44',NULL),('c9c06bff-b970-4159-b02f-b3eb79635145','9bc0fcf7-dda5-483a-a361-4f87a59d5e20',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'hiho ',1,'2025-05-04 20:54:36','2025-05-04 20:54:36',NULL),('e0079acc-e91a-437f-8db3-06ccc1240a8a',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad',NULL,'Comment 2',1,'2025-05-04 19:19:04','2025-05-04 19:19:04',NULL),('e8d95def-2835-42d3-bd36-dc7642ecdc0a',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'Quite a good bench. I am building a SaaS and the CRM question start to arise. Good overlook',1,'2025-05-04 23:40:13','2025-05-04 23:40:13',NULL),('f1fd40d1-6f4e-4d99-9660-42c025793333','1ada814e-1262-4656-b5e5-0f3fab8ff2c8',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','a0247cf7-c469-4916-8187-cd0630b05db4',NULL,'??? ??',1,'2025-05-05 23:11:38','2025-05-05 23:11:48','2025-05-05 23:12:03'),('f2355da1-4efa-486f-9f8b-eafb76380e02','71c4854a-4317-42d3-9856-91ccbe18ecc6',NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'comment 1.1.1',1,'2025-05-05 01:54:54','2025-05-05 01:54:54',NULL),('fe32f1a3-c151-4289-bff3-2b41bb3c7ec4',NULL,NULL,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599',NULL,'??This is one for sure is it guys.????????',1,'2025-05-04 23:45:52','2025-05-05 13:43:33',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_documents`
--
  
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_documents` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `course_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_documents_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_documents`
--

LOCK TABLES `course_documents` WRITE;
/*!40000 ALTER TABLE `course_documents` DISABLE KEYS */;
INSERT INTO `course_documents` VALUES ('044d82e9-bb0a-4cae-ac00-6963c93d8ee8','1745661246438-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','1745661246438-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:15:16','2025-05-02 15:15:16',NULL),('215784e4-8b35-4127-8251-5443b846ccb9','1745643397851-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','1745643397851-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','0c0b25e8-b019-45f7-b592-c7d84661a79d','2025-05-01 23:53:59','2025-05-01 23:53:59',NULL),('2ea4bf59-63b7-4b28-b8f9-bb2907e79495','Test','test.pdf','2ea4bf59-63b7-4b28-b8f9-bb2907e79496','2025-05-01 23:39:58','2025-05-01 23:39:58',NULL),('2ea4bf59-63b7-4b34-b8f9-bb2907e79495','Test 2','test2.pdf','2ea4bf59-63b7-4b28-b8f9-bb2907e79496','2025-05-01 23:39:58','2025-05-01 23:39:58',NULL),('302a740c-2001-4793-a331-b76f02551ac8','1746796546115_PART_2_Spetking.pdf','1746796546115_PART_2_Spetking.pdf','3537c215-dccf-40d3-b6b5-32891887a41a','2025-05-09 22:15:46','2025-05-09 22:15:46',NULL),('3f5c0fde-a8b6-401d-a428-9ed2474c537e','1746800524052_PART_2_Spetking.pdf','1746800524052_PART_2_Spetking.pdf','c8a8dcca-3eca-44aa-ad32-7b4bd693cf12','2025-05-09 23:22:04','2025-05-09 23:22:04',NULL),('6d30bfd2-5d47-494c-a520-617229eec92b','1745643397851-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','1745643397851-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:15:16','2025-05-02 15:15:16',NULL),('88e2d74a-e0b1-4513-8450-709fc2793c93','1745661246438-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','1745661246438-alchemyrefiner_alchemymagic_1_d03fa94d-a47c-4d59-b7fe-fb49c5eb56c2_0.png','0c0b25e8-b019-45f7-b592-c7d84661a79d','2025-05-01 23:53:59','2025-05-01 23:53:59',NULL),('b42b5102-f0ea-4449-a036-dbca87c10758','1746796546115_Spetking_AVKC4.pdf','1746796546115_Spetking_AVKC4.pdf','3537c215-dccf-40d3-b6b5-32891887a41a','2025-05-09 22:15:46','2025-05-09 22:15:46',NULL),('cdb974dc-c08e-4ffb-a962-d6a89165f7a6','1746800524056_Spetking_AVKC4.pdf','1746800524056_Spetking_AVKC4.pdf','c8a8dcca-3eca-44aa-ad32-7b4bd693cf12','2025-05-09 23:22:04','2025-05-09 23:22:04',NULL);
/*!40000 ALTER TABLE `course_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_tags` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tag_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `course_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_tags_tagId_courseId_unique` (`tag_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_tags_ibfk_763` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `course_tags_ibfk_764` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_tags`
--

LOCK TABLES `course_tags` WRITE;
/*!40000 ALTER TABLE `course_tags` DISABLE KEYS */;
INSERT INTO `course_tags` VALUES ('003af380-d515-4416-8bea-5d24ff9d7274','92c3e1e6-2bf3-11f0-926a-e00af682e81e','f876344f-2e52-452f-ab06-f8ab35d67c70','2025-05-09 00:20:08','2025-05-09 00:20:08',NULL),('0a763d99-2713-410a-b3d8-9593dbe5af40','565c9fce-af6b-464b-b388-b90657ca3a33','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:17:49','2025-05-02 15:17:49',NULL),('435fcedb-ca34-4505-b249-4e8663cb358f','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','f876344f-2e52-452f-ab06-f8ab35d67c70','2025-05-09 00:20:08','2025-05-09 00:20:08',NULL),('4d1d92b3-2509-4830-86ca-1ef84431a59b','bf62faa5-27c3-4637-805d-85e6446dd61c','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:17:49','2025-05-02 15:17:49',NULL),('5ebfbd38-d941-41a6-ac1d-fb783b319b21','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:17:49','2025-05-02 15:17:49',NULL),('612ee736-ad15-4230-8b6d-941106a645db','92c3e1e6-2bf3-11f0-926a-e00af682e81e','4da2fcdc-2b12-4367-a7de-6f775b6c0c0b','2025-05-09 22:09:51','2025-05-09 22:09:51',NULL),('82bb8db5-ca72-48af-80f0-a79d96a1db7d','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','3537c215-dccf-40d3-b6b5-32891887a41a','2025-05-09 22:15:46','2025-05-09 22:15:46',NULL),('b6414d00-fb07-4bea-8673-98f423e169e8','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','4da2fcdc-2b12-4367-a7de-6f775b6c0c0b','2025-05-09 22:09:51','2025-05-09 22:09:51',NULL),('d12f85fc-7e21-40e0-8df5-41909ba1cbf5','9b4efddd-0c76-4bf8-bc82-83f4eb61c74a','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:17:49','2025-05-02 15:17:49',NULL),('dcbd6433-dd6a-42a3-a5a6-d166aefc1247','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','c8a8dcca-3eca-44aa-ad32-7b4bd693cf12','2025-05-09 23:22:04','2025-05-09 23:22:04',NULL),('deee749a-996b-44de-8f2f-91ff51a50a0d','565c9fce-af6b-464b-b388-b90657ca3a33','3537c215-dccf-40d3-b6b5-32891887a41a','2025-05-09 22:15:46','2025-05-09 22:15:46',NULL),('eaa25eef-c1e6-4bdf-ad39-89c8a8de6732','565c9fce-af6b-464b-b388-b90657ca3a33','b81f790d-cea1-46fd-b0f4-bd08dc645a91','2025-05-09 01:57:58','2025-05-09 01:57:58',NULL),('f976dc35-f7b3-4ac1-84b9-0ae41236662f','ea2b9370-f49c-4f97-b7bd-458a72b8eb96','1ce8ee87-4cc4-40ba-a396-48891afb4ed5','2025-05-02 15:17:49','2025-05-02 15:17:49',NULL),('fa245cf1-8341-4976-89db-899276bef9de','565c9fce-af6b-464b-b388-b90657ca3a33','c8a8dcca-3eca-44aa-ad32-7b4bd693cf12','2025-05-09 23:22:04','2025-05-09 23:22:04',NULL);
/*!40000 ALTER TABLE `course_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `topic_deadline` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `max_group_members` int NOT NULL DEFAULT '3',
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('0c0b25e8-b019-45f7-b592-c7d84661a79d','Khóa học 2','mô tả 2','2025-04-23 01:08:19','2025-04-23 01:08:19','2025-04-23 01:08:19',0,3,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2025-05-01 23:53:59','2025-05-01 23:53:59',NULL,NULL),('1ce8ee87-4cc4-40ba-a396-48891afb4ed5','Khóa học 3','mô tả 3','2025-04-23 01:08:19','2025-04-23 01:08:19','2025-04-23 01:08:19',0,3,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2025-05-02 15:15:16','2025-05-02 15:17:49',NULL,NULL),('2ea4bf59-63b7-4b28-b8f9-bb2907e79496','Khóa học 1','mô tả 2','2025-04-23 01:08:19','2025-04-23 01:08:19','2025-04-23 01:08:19',0,3,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2025-05-01 23:39:58','2025-05-01 23:39:58',NULL,NULL),('3537c215-dccf-40d3-b6b5-32891887a41a','course 4','<p>course 4</p>','2025-05-06 02:00:00','2025-05-06 02:00:00','2025-05-06 02:00:00',0,3,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2025-05-09 22:15:46','2025-05-09 22:15:46',NULL,'1746796546087_218567-P15WG1-51.jpg'),('4da2fcdc-2b12-4367-a7de-6f775b6c0c0b','tesst','<p>tessttessttessttessttessttessttesst   tesst  </p>','2025-05-07 02:00:00','2025-05-10 02:00:00','2025-05-12 02:00:00',0,3,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2025-05-09 22:09:51','2025-05-09 22:09:51',NULL,NULL),('b81f790d-cea1-46fd-b0f4-bd08dc645a91','Máy học ứng dụng ','<p><mark style=\"background-color: var(--tt-highlight-green)\">Máy học ứng dụng </mark></p>','2025-05-04 02:00:00','2025-05-10 02:00:00','2025-05-11 02:00:00',0,3,'932cc25a-0a00-4d66-bf81-71cace9f2403','2025-05-09 01:57:58','2025-05-09 01:57:58',NULL,'1746723478163-c803850d-f482-4fcc-a744-4de8fd8a02d8.png'),('c8a8dcca-3eca-44aa-ad32-7b4bd693cf12','akjadh asjkasdhashdjkashkdja sdjhas dasjkdh asjkdjkas d','<p>akjadh asjkasdhashdjkashkdja sdjhas dasjkdh asjkdjkas d</p>','2025-05-04 02:00:00','2025-05-10 02:00:00','2025-05-12 02:00:00',0,3,'1302f77c-0219-41e6-b90b-5b6a172d9f22','2025-05-09 23:22:04','2025-05-09 23:22:04',NULL,NULL),('f876344f-2e52-452f-ab06-f8ab35d67c70','Couser test','<p>ấdasds ádasd á dá đá</p>','2025-05-09 02:00:00','2025-05-09 02:00:00','2025-05-13 02:00:00',0,3,'932cc25a-0a00-4d66-bf81-71cace9f2403','2025-05-09 00:20:08','2025-05-09 00:20:08',NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_members`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_members` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `group_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` enum('admin','member') COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_members_ibfk_835` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `group_members_ibfk_836` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_members`
--

LOCK TABLES `group_members` WRITE;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `topic_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `groups_ibfk_429` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `groups_ibfk_430` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_likes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_likes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `post_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_likes_ibfk_407` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `post_likes_ibfk_408` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likes`
--

LOCK TABLES `post_likes` WRITE;
/*!40000 ALTER TABLE `post_likes` DISABLE KEYS */;
INSERT INTO `post_likes` VALUES ('134da9cb-81fe-483a-bf52-697298760157','4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','a0247cf7-c469-4916-8187-cd0630b05db4','2025-05-06 00:24:31','2025-05-06 00:24:31'),('1cb4c2b1-4b37-4a6b-9681-91acb9fa178c','1302f77c-0219-41e6-b90b-5b6a172d9f22','2f4a81eb-16a6-4b02-913c-43e2f1d2ffa7','2025-05-08 00:57:21','2025-05-08 00:57:21'),('25dec267-f4fd-49f3-8664-648b3a1bf472','1302f77c-0219-41e6-b90b-5b6a172d9f22','1828726d-bc67-4c64-9c29-2abad71f66c7','2025-05-08 02:11:02','2025-05-08 02:11:02'),('270814cf-7330-49a0-8d98-19c8f325271f','1302f77c-0219-41e6-b90b-5b6a172d9f22','b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','2025-05-08 00:40:39','2025-05-08 00:40:39'),('33b9aaae-9ce5-4cb5-b24e-086fe7f2d77f','4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','78abf3b1-4bbd-41a0-b635-b0a8171d788f','2025-05-06 00:24:33','2025-05-06 00:24:33'),('3ff0f3a8-6b6b-4b31-aad4-835d2ac25d27','4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-06 00:24:24','2025-05-06 00:24:24'),('47c99266-aa4e-402c-bdbf-02cc407d088d','1302f77c-0219-41e6-b90b-5b6a172d9f22','832dde4e-2efb-4d41-b8ba-c329fac387d8','2025-05-08 02:11:01','2025-05-08 02:11:01'),('4c0232f6-52bc-41bc-8d8f-d01f87d20bd5','1302f77c-0219-41e6-b90b-5b6a172d9f22','a0247cf7-c469-4916-8187-cd0630b05db4','2025-05-04 23:45:02','2025-05-04 23:45:02'),('58a49844-11de-4268-87aa-4e87540985e6','1302f77c-0219-41e6-b90b-5b6a172d9f22','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-04 14:59:18','2025-05-04 14:59:18'),('58fc7cf1-6f34-413f-9021-19b8c00a3c7c','1302f77c-0219-41e6-b90b-5b6a172d9f22','037fcf6f-f4db-4932-8ebc-eac94839cfcf','2025-05-08 00:40:38','2025-05-08 00:40:38'),('590d47cd-7fa4-4120-8ba0-e5b1a8179e3f','1302f77c-0219-41e6-b90b-5b6a172d9f22','daf6a7c3-eb15-4ff9-9e58-70341679cfb4','2025-05-08 02:11:03','2025-05-08 02:11:03'),('62584868-e6bd-4ebd-b93f-ee825d02ccfd','1302f77c-0219-41e6-b90b-5b6a172d9f22','8070f6aa-54e1-4678-8aca-4951323bc8ad','2025-05-04 14:59:00','2025-05-04 14:59:00'),('7f6e6637-5c46-46b2-a0c6-18a19536028d','1302f77c-0219-41e6-b90b-5b6a172d9f22','1a752518-292c-4709-9b0d-a64ec0196f8f','2025-05-04 14:58:57','2025-05-04 14:58:57'),('83c8482f-8158-487e-a43b-6925986833db','932cc25a-0a00-4d66-bf81-71cace9f2403','2f4a81eb-16a6-4b02-913c-43e2f1d2ffa7','2025-05-08 00:56:28','2025-05-08 00:56:28'),('9b8cc4ec-9e1f-4d0b-a7cc-0ea010b6b9a2','4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','1a752518-292c-4709-9b0d-a64ec0196f8f','2025-05-06 00:24:32','2025-05-06 00:24:32'),('a6896d50-bde4-4cf5-a282-1ac7dac663ad','1302f77c-0219-41e6-b90b-5b6a172d9f22','edf7cea3-de42-4b02-b8b3-3a3949486497','2025-05-08 02:11:05','2025-05-08 02:11:05'),('dd11d005-e3ba-4b94-9945-1765cbb51ddf','4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','2025-05-06 00:24:23','2025-05-06 00:24:23'),('e4270832-660c-4679-a110-e91aafafc2a0','4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','8070f6aa-54e1-4678-8aca-4951323bc8ad','2025-05-06 00:24:34','2025-05-06 00:24:34'),('ec3ad472-7e78-43ce-80fc-b9e0f571b428','1302f77c-0219-41e6-b90b-5b6a172d9f22','773e05c3-a30f-4c0b-8953-631ac75c6100','2025-05-08 02:11:04','2025-05-08 02:11:04');
/*!40000 ALTER TABLE `post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_tags` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tag_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `post_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_tags_tagId_postId_unique` (`tag_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_tags_ibfk_753` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_tags_ibfk_754` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tags`
--

LOCK TABLES `post_tags` WRITE;
/*!40000 ALTER TABLE `post_tags` DISABLE KEYS */;
INSERT INTO `post_tags` VALUES ('0c58e1a3-9e82-4d7e-9013-c4aba0d00e2f','9b4efddd-0c76-4bf8-bc82-83f4eb61c74a','b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','2025-05-07 23:06:10','2025-05-07 23:06:10',NULL),('1af9f0f4-2990-4a49-a7f2-aba8f75841a7','bf62faa5-27c3-4637-805d-85e6446dd61c','773e05c3-a30f-4c0b-8953-631ac75c6100','2025-05-08 19:03:31','2025-05-08 19:03:31',NULL),('1ecd5002-8ffb-48b4-9769-f0ac907a5c66','565c9fce-af6b-464b-b388-b90657ca3a33','1a752518-292c-4709-9b0d-a64ec0196f8f','2025-05-08 00:35:19','2025-05-08 00:35:19',NULL),('2c7e09b2-9b6d-496a-9214-9f25ad511ba9','92c45460-2bf3-11f0-926a-e00af682e81e','24f58347-f494-4582-9303-3bda2f079d36','2025-05-08 20:15:04','2025-05-08 20:15:04',NULL),('331e63cc-270e-4a7d-9bc1-60c9c8720472','bf62faa5-27c3-4637-805d-85e6446dd61c','b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','2025-05-07 23:06:10','2025-05-07 23:06:10',NULL),('3511cf85-2d9e-4a9c-b607-254af85f701b','bf62faa5-27c3-4637-805d-85e6446dd61c','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-07 23:05:58','2025-05-07 23:05:58',NULL),('3c65defa-2627-41fc-ac27-eea771c9dfc1','565c9fce-af6b-464b-b388-b90657ca3a33','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-07 23:05:58','2025-05-07 23:05:58',NULL),('40e6a925-d143-4e8f-9282-6452d547bfce','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','773e05c3-a30f-4c0b-8953-631ac75c6100','2025-05-08 19:03:31','2025-05-08 19:03:31',NULL),('4244162f-bd86-4552-a29b-e00557b51b94','92c45335-2bf3-11f0-926a-e00af682e81e','4520ada7-b3ac-4b08-ad55-fba0676c837f','2025-05-10 02:43:38','2025-05-10 02:43:38',NULL),('425042f5-9474-4679-883b-cddc08659bad','565c9fce-af6b-464b-b388-b90657ca3a33','78abf3b1-4bbd-41a0-b635-b0a8171d788f','2025-05-08 00:37:09','2025-05-08 00:37:09',NULL),('466f16ea-3bbd-4816-bf4a-be5eb3eef92e','ea2b9370-f49c-4f97-b7bd-458a72b8eb96','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-07 23:05:58','2025-05-07 23:05:58',NULL),('5ba94411-70af-4d10-a041-8ed7c208368e','92c48faf-2bf3-11f0-926a-e00af682e81e','832dde4e-2efb-4d41-b8ba-c329fac387d8','2025-05-08 19:03:22','2025-05-08 19:03:22',NULL),('70209dfd-6523-45c5-a086-031ca82ffa85','bf62faa5-27c3-4637-805d-85e6446dd61c','316b6af6-f338-4b54-8420-7717c8ee10c0','2025-05-08 00:44:12','2025-05-08 00:44:12',NULL),('7b375481-9ae6-4372-92ac-0bdcef46dd44','ea2b9370-f49c-4f97-b7bd-458a72b8eb96','316b6af6-f338-4b54-8420-7717c8ee10c0','2025-05-08 00:44:12','2025-05-08 00:44:12',NULL),('7ba7a8d2-c091-4d45-964b-8581b261b41c','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','2f4a81eb-16a6-4b02-913c-43e2f1d2ffa7','2025-05-08 00:56:25','2025-05-08 00:56:25',NULL),('7ff1f2f9-d3d6-450a-b1da-149d6de72655','565c9fce-af6b-464b-b388-b90657ca3a33','b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','2025-05-07 23:06:10','2025-05-07 23:06:10',NULL),('805a8139-632c-40aa-8abe-6d0cd291fd11','92c44fc1-2bf3-11f0-926a-e00af682e81e','24f58347-f494-4582-9303-3bda2f079d36','2025-05-08 20:15:04','2025-05-08 20:15:04',NULL),('84ebbf86-04e9-4400-b361-9bc90bca4838','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','1a752518-292c-4709-9b0d-a64ec0196f8f','2025-05-08 00:35:19','2025-05-08 00:35:19',NULL),('8bbeaaf5-f4db-4323-925c-e9e693c1cdc9','9b4efddd-0c76-4bf8-bc82-83f4eb61c74a','316b6af6-f338-4b54-8420-7717c8ee10c0','2025-05-08 00:44:12','2025-05-08 00:44:12',NULL),('9345e24b-4c41-483d-adcf-3ff93945e5f9','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','a0247cf7-c469-4916-8187-cd0630b05db4','2025-05-08 00:35:04','2025-05-08 00:35:04',NULL),('981bd7ab-829d-41d9-9564-94f268e9318e','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-07 23:05:58','2025-05-07 23:05:58',NULL),('9c5e9078-58f7-4586-83d4-57848a8c384c','94f145d6-2bf3-11f0-926a-e00af682e81e','832dde4e-2efb-4d41-b8ba-c329fac387d8','2025-05-08 19:03:22','2025-05-08 19:03:22',NULL),('ab06ead3-b8b2-456a-9f5e-cdf718933f89','ea2b9370-f49c-4f97-b7bd-458a72b8eb96','2f4a81eb-16a6-4b02-913c-43e2f1d2ffa7','2025-05-08 00:56:25','2025-05-08 00:56:25',NULL),('b193ff3a-78cc-474a-90fa-ae3140aa00af','92c45335-2bf3-11f0-926a-e00af682e81e','24f58347-f494-4582-9303-3bda2f079d36','2025-05-08 20:15:04','2025-05-08 20:15:04',NULL),('b246df82-7ae2-4a80-8fef-0774aee69118','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','2025-05-07 23:06:10','2025-05-07 23:06:10',NULL),('cd760a77-6426-4695-822d-5b751f9581ef','ea2b9370-f49c-4f97-b7bd-458a72b8eb96','e811918d-902a-4007-b215-6405a7ea5046','2025-05-08 00:46:35','2025-05-08 00:46:35',NULL),('cf8717bf-371d-4f06-94c5-e201eea8e31b','565c9fce-af6b-464b-b388-b90657ca3a33','832dde4e-2efb-4d41-b8ba-c329fac387d8','2025-05-08 19:03:22','2025-05-08 19:03:22',NULL),('d05a979d-b995-42ca-acec-a26ffcefe0f0','92c44fc1-2bf3-11f0-926a-e00af682e81e','4520ada7-b3ac-4b08-ad55-fba0676c837f','2025-05-10 02:43:38','2025-05-10 02:43:38',NULL),('db1439ed-2fc8-4330-8efd-76b75e39d135','9b4efddd-0c76-4bf8-bc82-83f4eb61c74a','1d3c5be3-55c6-49b2-a19c-96a3a9cda599','2025-05-07 23:05:58','2025-05-07 23:05:58',NULL),('e3bf2d41-073d-48b8-b2a5-d44579eea1f5','565c9fce-af6b-464b-b388-b90657ca3a33','a0247cf7-c469-4916-8187-cd0630b05db4','2025-05-08 00:35:04','2025-05-08 00:35:04',NULL),('efc68559-5601-43d3-a529-7bf73f418a3b','8c70b879-33c8-4cd6-ac53-9ad520bba8e0','edf7cea3-de42-4b02-b8b3-3a3949486497','2025-05-08 00:46:14','2025-05-08 00:46:14',NULL),('f499d2b4-82dd-4b27-882d-646d358f3813','92c48f79-2bf3-11f0-926a-e00af682e81e','773e05c3-a30f-4c0b-8953-631ac75c6100','2025-05-08 19:03:31','2025-05-08 19:03:31',NULL),('f90af9c7-f17e-480d-a9d8-5296a446fb18','92c3e1e6-2bf3-11f0-926a-e00af682e81e','4520ada7-b3ac-4b08-ad55-fba0676c837f','2025-05-10 02:43:38','2025-05-10 02:43:38',NULL);
/*!40000 ALTER TABLE `post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('037fcf6f-f4db-4932-8ebc-eac94839cfcf','Thông báo','Thông báo',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:37','2025-05-08 00:37:37',NULL),('1828726d-bc67-4c64-9c29-2abad71f66c7','15 Must-Know Elements of System Design','<h2>A well-designed system leverages various architectural elements to manage distributed systems, enhance scalability, service management, networking efficiency, and data storage. Key components include distributed message queues, caching, task schedulers, content delivery networks, consistent hashing, service discovery, DNS, load</h2>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:50','2025-05-08 00:43:27',NULL),('1a752518-292c-4709-9b0d-a64ec0196f8f','40 CSS Background Effects to Enhance Your Website','<p><strong>Test2</strong></p>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746626879627-ÄÃ_gaddasdasd.png','2025-05-02 13:27:33','2025-05-08 00:35:19',NULL),('1d3c5be3-55c6-49b2-a19c-96a3a9cda599','Why Your Code is Slow: Common Performance Mistakes Beginners Make','<p>Maybe you've experienced something like this before: you've written code that works, but when you hit "run," it takes forever. You stare at the spinner, wondering if it's faster to just solve the problem by hand.</p><p>But you end up looking something like this… ?⬇️⬇️</p><img src=\"https://img.ifunny.co/images/9eeae78f1bc92e6dc422c5e6af2b5a768913d2e4fa9df2d0df499c1202dfe539_1.jpg\" alt=\"6 year old me thinking the game would load faster if i act like don\'t care  ORIGINALWOLFF - iFunny\" style=\"width: 402px; margin: 0px auto;\" draggable=\"true\"><p></p><p>Here's the truth: slow code doesn't have to be the end of the world. And it's a rite of passage if you're a developer.</p><p>When you're learning to code, you're focused on making things <em>work</em>—not making them fast. But eventually, you'll hit a wall: your app freezes, your data script takes hours, or your game lags like a PowerPoint slideshow.</p><p>The difference between working code and blazing-fast code often comes down to avoiding a few common mistakes. Mistakes that are easy to make when you're starting out, like using the wrong tool for the job, writing unnecessary code, or accidentally torturing your computer with hidden inefficiencies.</p><p></p><h3><strong>Table of Contents</strong></h3><ol class=\"list-decimal ml-3\"><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-mistake-1-logging-everything-in-production-without-realizing-it\">Mistake #1: Logging Everything in Production (Without Realizing It)</a></p><ul class=\"list-disc ml-3\"><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-how-to-fix-it\">How to Fix It</a></p></li></ul></li></ol><ol class=\"list-decimal ml-3\" start=\"2\"><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-mistake-2-using-the-wrong-loops-when-theres-a-faster-alternative\">Mistake #2: Using the Wrong Loops (When There's a Faster Alternative)</a></p><ul class=\"list-disc ml-3\"><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-why-this-is-a-problem-1\">Why This is a Problem</a></p></li></ul></li><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-mistake-3-writing-database-queries-inside-loops-killer-of-speed\">Mistake #3: Writing Database Queries Inside Loops (Killer of Speed)</a></p></li></ol><ul class=\"list-disc ml-3\"><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-why-this-is-a-problem-2\">Why This is a Problem</a></p></li><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-how-to-fix-it-use-bulk-queries\">How to Fix It: Use Bulk Queries</a></p></li><li><p><a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline post-section-overview\" href=\"https://www.freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make/?ref=dailydev#heading-a-more-scalable-approach\">A More Scalable Approach</a></p></li><li><p></p></li></ul><h2><strong>Mistake #1: Logging Everything in Production (Without Realizing It)</strong></h2><p>Logging is supposed to help you understand what's happening in your code—but if you're logging everything, you're actually slowing it down. A common beginner mistake is leaving <code>print()</code> statements everywhere or enabling verbose logging even in production, where performance matters most.</p><p>Instead of logging only what's useful, they log every function call, every input, every output, and sometimes even entire request bodies or database queries. This might seem harmless, but in a live application handling thousands of operations per second, excessive logging can cause major slowdowns.</p><p></p><h3><strong>Why This is a Problem</strong></h3><p>Logging isn't free. Every log message, whether printed to the console or written to a file, adds extra processing time. If logging is done synchronously (which it often is by default), your application can pause execution while waiting for the log to be recorded.</p><p>It also wastes disk space. If every request gets logged in detail, log files can grow rapidly, eating up storage and making it harder to find useful information when debugging.</p><p>Here's an example:</p><p></p><pre><code class=\"language-python\">def process_data(data):\n    print(f\"Processing data: {data}\")  # Logging every input\n    result = data * 2  \n    print(f\"Result: {result}\")  # Logging every result\n    return result</code></pre><p>If this function is running inside a loop handling 10,000+ operations, those print statements are slowing things down massively.</p><p></p><h3><strong>How to Fix It</strong></h3><p>Instead of logging everything, focus on logging only what actually matters. Good logging helps you diagnose real issues without cluttering your logs or slowing down your app.</p><p>For example, let's say you\'re processing user transactions. You don't need to log every step of the calculation, but logging when a transaction starts, succeeds, or fails is valuable.</p><p></p><pre><code class=\"language-python\">// ✅ Bad logging\n\nlogging.info(f\"Received input: {data}\")  \nlogging.info(f\"Processing transaction for user {user_id}\")  \nlogging.info(f\"Transaction intermediate step 1 result: {some_var}\")  \nlogging.info(f\"Transaction intermediate step 2 result: {another_var}\")  \nlogging.info(f\"Transaction completed: {final_result}\")  \n\n// ✅ Better logging\n\nlogging.info(f\"Processing transaction for user {user_id}\")  \nlogging.info(f\"Transaction successful. Amount: ${amount}\")</code></pre><p>Next, make sure debugging logs are turned off in production. Debug logs (<code>logging.debug()</code>) are great while developing because they show detailed information, but they shouldn't be running on live servers.</p><p>You can control this by setting the logging level to <code>INFO</code> or higher:</p><p></p><pre><code class=\"language-python\">import logging\n\nlogging.basicConfig(level=logging.INFO)  # Only logs INFO, WARNING, ERROR, CRITICAL messages\ndef process_data(data):\n    logging.debug(f\"Processing data: {data}\")  # Won\'t show up in production\n    return data * 2</code></pre><p>Finally, for high-performance applications, consider using asynchronous logging. By default, logging operations can block execution, meaning your program waits until the log message is written before continuing. This can be a bottleneck, especially if you\'re logging to a file or a remote logging service.</p><p>Asynchronous logging solves this by handling logs in the background. Here's how you can set it up with Python's <code>QueueHandler</code>:</p><p></p><pre><code class=\"language-python\">import logging\nimport logging.handlers\nimport queue\n\nlog_queue = queue.Queue()\nqueue_handler = logging.handlers.QueueHandler(log_queue)\nlogger = logging.getLogger()\nlogger.addHandler(queue_handler)\nlogger.setLevel(logging.INFO)\n\nlogger.info(\"This log is handled asynchronously!\")</code></pre><h2><strong>Mistake #2: Using the Wrong Loops (When There's a Faster Alternative)</strong></h2><h3><strong>Why This is a Problem</strong></h3><p></p><p><strong>Example</strong></p><p>Let's say you want to square a list of numbers. A beginner might write this:</p><pre><code class=\"language-python\">numbers = [1, 2, 3, 4, 5]\nsquared = []\n\nfor num in numbers:\n    squared.append(num ** 2)</code></pre><p>Looks fine, right? But there are two inefficiencies here:</p><ol class=\"list-decimal ml-3\"><li><p>You\'re manually looping when Python has a better, built-in way to handle this.</p></li><li><p>You\'re making repeated <code>.append()</code> calls, which add unnecessary overhead.</p></li></ol><p>In small cases, you won't notice a difference. But when processing large datasets, these inefficiencies add up fast.</p>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746626758466-448f0407-8a15-4b59-a91f-8a197bc07578.png','2025-05-03 17:09:39','2025-05-07 23:05:58',NULL),('24f58347-f494-4582-9303-3bda2f079d36','Cách Tăng Cường Bảo Mật cho API Node.js: Các Thực Tiễn Tốt Nhất','<p></p><p>Bảo mật API là yếu tố quan trọng trong phát triển ứng dụng web hiện đại. Bài viết này sẽ hướng dẫn bạn các phương pháp tốt nhất để bảo vệ API Node.js của bạn khỏi các mối đe dọa phổ biến.</p><p></p><h3><strong>1. Sử dụng HTTPS</strong></h3><p>Luôn sử dụng HTTPS thay vì HTTP để mã hóa dữ liệu truyền giữa client và server:</p><pre><code>const https = require(\'https\');\nconst fs = require(\'fs\');\n\nconst options = {\n  key: fs.readFileSync(\'key.pem\'),\n  cert: fs.readFileSync(\'cert.pem\')\n};\n\nhttps.createServer(options, (req, res) =&gt; {\n  res.writeHead(200);\n  res.end(\'API an toàn\\n\');\n}).listen(443);</code></pre><h3><strong>2. Xác thực và Ủy quyền</strong></h3><p>- Sử dụng JWT (JSON Web Tokens) hoặc OAuth2</p><p>- Triển khai xác thực đa yếu tố (MFA) cho các endpoint quan trọng</p><pre><code>const jwt = require(\'jsonwebtoken\');\n\n// Tạo token\nconst token = jwt.sign({ userId: 123 }, \'SECRET_KEY\', { expiresIn: \'1h\' });\n\n// Xác thực middleware\nfunction authenticate(req, res, next) {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).send(\'Access denied\');\n  \n  try {\n    const verified = jwt.verify(token, \'SECRET_KEY\');\n    req.user = verified;\n    next();\n  } catch (err) {\n    res.status(400).send(\'Invalid token\');\n  }\n}</code></pre><h3><strong>3. Xử lý Dữ liệu Đầu vào</strong></h3><p>- Luôn validate và sanitize dữ liệu đầu vào</p><p>- Sử dụng thư viện như Joi hoặc express-validator</p><pre><code>const { body, validationResult } = require(\'express-validator\');\n\napp.post(\'/user\', \n  body(\'email\').isEmail(),\n  body(\'password\').isLength({ min: 6 }),\n  (req, res) =&gt; {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) {\n      return res.status(400).json({ errors: errors.array() });\n    }\n    // Xử lý dữ liệu hợp lệ\n  }\n);</code></pre><h3><strong>4. Bảo vệ chống lại các cuộc tấn công phổ biến</strong></h3><p>- <strong>CSRF</strong>: Sử dụng csurf middleware</p><p>- <strong>XSS</strong>: Sử dụng helmet middleware và escape output</p><p>- <strong>SQL Injection</strong>: Sử dụng ORM/query builder như Sequelize, Knex</p><p>- <strong>DoS</strong>: Giới hạn tỷ lệ yêu cầu với express-rate-limit</p><pre><code>const helmet = require(\'helmet\');\nconst rateLimit = require(\'express-rate-limit\');\n\napp.use(helmet());\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 phút\n  max: 100 // giới hạn mỗi IP 100 yêu cầu mỗi cửa sổ\n});\napp.use(limiter);</code></pre><h3><strong>5. Quản lý phụ thuộc an toàn</strong></h3><p>- Thường xuyên cập nhật các dependencies</p><p>- Sử dụng <mark style=\"background-color: var(--tt-highlight-green)\">npm audit </mark>hoặc <mark style=\"background-color: var(--tt-highlight-green)\">yarn audit</mark> để kiểm tra lỗ hổng</p><p>- Xem xét sử dụng Snyk hoặc Dependabot để tự động hóa bảo mật</p><h3><strong>6. Logging và Giám sát</strong></h3><p>- Ghi lại các hoạt động đáng ngờ</p><p>- Triển khai hệ thống cảnh báo cho các hoạt động bất thường</p><p>- Sử dụng thư viện như Winston hoặc Morgan</p><pre><code>const morgan = require(\'morgan\');\nconst fs = require(\'fs\');\nconst path = require(\'path\');\n\n// Tạo stream ghi log\nconst accessLogStream = fs.createWriteStream(\n  path.join(__dirname, \'access.log\'),\n  { flags: \'a\' }\n);\n\napp.use(morgan(\'combined\', { stream: accessLogStream }));</code></pre><h3><strong>7. CORS (Cross-Origin Resource Sharing)</strong></h3><p>Cấu hình CORS một cách chặt chẽ:</p><pre><code>const cors = require(\'cors\');\n\nconst corsOptions = {\n  origin: [\'https://yourtrustedsite.com\', \'https://yourothersite.com\'],\n  methods: \'GET,POST,PUT,DELETE\',\n  allowedHeaders: [\'Content-Type\', \'Authorization\']\n};\n\napp.use(cors(corsOptions));</code></pre><h3><strong>8. Xử lý lỗi an toàn</strong></h3><p>Không tiết lộ thông tin nhạy cảm trong thông báo lỗi:</p><pre><code>app.use((err, req, res, next) =&gt; {\n  console.error(err.stack);\n  res.status(500).send(\'Đã xảy ra lỗi!\');\n});</code></pre><h3><strong>9. Bảo mật Header HTTP</strong></h3><p>Sử dụng Helmet để thiết lập các header bảo mật:</p><pre><code>const helmet = require(\'helmet\');\n\napp.use(helmet());\n// Hoặc cấu hình tùy chỉnh\napp.use(helmet.contentSecurityPolicy({\n  directives: {\n    defaultSrc: [\"\'self\'\"],\n    scriptSrc: [\"\'self\'\", \"\'unsafe-inline\'\"],\n    styleSrc: [\"\'self\'\", \"\'unsafe-inline\'\"],\n    imgSrc: [\"\'self\'\", \"data:\"]\n  }\n}));</code></pre><h3><strong>10. Kiểm tra bảo mật định kỳ</strong></h3><p>- Thực hiện kiểm tra bảo mật định kỳ</p><p>- Sử dụng các công cụ như OWASP ZAP hoặc Burp Suite</p><p>- Thực hiện kiểm tra thâm nhập</p><p></p><h2><strong>Kết luận</strong></h2><p>Bảo mật API là một quá trình liên tục, không phải là một nhiệm vụ một lần. Bằng cách triển khai các thực tiễn tốt nhất này, bạn có thể giảm đáng kể nguy cơ bị tấn công và bảo vệ dữ liệu người dùng của mình.</p>',1,'932cc25a-0a00-4d66-bf81-71cace9f2403','1746700982784-448f0407-8a15-4b59-a91f-8a197bc07578.png','2025-05-08 19:43:02','2025-05-08 20:15:04',NULL),('2f4a81eb-16a6-4b02-913c-43e2f1d2ffa7','Sharing my take on the whole things about vibe coding','<p style=\"text-align: center\">The world of software development is never static, and the latest term making waves is "vibe coding." Having spent considerable time exploring the impact of AI on coding, from <a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline\" href=\"https://www.niraj.life/blog/why-coding-with-llms-can-be-harder-than-you-think/\">AI-enabled development</a> to <a target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline\" href=\"https://www.niraj.life/blog/pair-programming-with-ai/\">pair programming with AI</a>, I've been keenly observing the discussions around this new concept. What I've found is a fascinating, and sometimes confusing, array of interpretations, particularly when it comes to the tools being labeled as <strong>vibe coding</strong> platforms.</p><p></p><p style=\"text-align: left\">My initial understanding of vibe coding, which seems to resonate with a certain segment of the tech community, is that it's about prioritizing the desired outcome of a software project, ideally to the point where the developer doesn't need to be deeply involved with the intricacies of the underlying code. However, my recent forays into X(twitter) have revealed a significant disconnect. Many developers are enthusiastically embracing tools like Cursor and Windsurf, claiming they are engaging in "vibe coding." This strikes me as odd because these are AI enabled code editors where the primary mode of interaction still revolves around directly viewing and manipulating code.</p><p style=\"text-align: left\">For me, true vibe coding feels more akin to using tools like Aider, Claude Code, V0, or Lovable, where the interaction is more focused on describing the desired output, and the code generation happens somewhat behind the scenes.</p><h1>Decoding the "Vibe": What Exactly is Vibe Coding?</h1><p style=\"text-align: left\">The term vibe coding gained prominence around February 2025, largely thanks to a post by AI expert Andrej Karpathy. His initial description painted a picture of developers who could "fully give in to the vibes, embrace exponentials, and forget that the code even exists". This immediately suggests a move away from traditional, syntax-focused coding towards a more intuitive interaction with AI.</p><img src=\"/images/1746633350607-lskajdaklsjdklasjd.png\" style=\"width: 412px; height: auto; cursor: pointer; margin: 0px auto;\" draggable=\"true\"><p style=\"text-align: left\">Since then, the definition has broadened and diversified. Some define vibe coding as AI-powered software development where artificial intelligence handles the majority of the coding based on high-level instructions. Others emphasize the use of conversational AI tools like ChatGPT, Claude, and GitHub Copilot to rapidly generate code. A common thread is the idea of building software without being bogged down by syntax, where users articulate their intentions in plain English, and AI produces the necessary code. The programmer's role shifts to guiding, testing, and refining the AI's output. Some even jokingly refer to it as simply letting AI do the coding. A key aspect in some definitions is the user potentially accepting the generated code without fully understanding it , while others see it as a collaboration between humans and AI. It's also been described as an "intent-based outcome specification" or an iterative prompting process. The term's rapid adoption even led to its inclusion in the Merriam-Webster Dictionary. The sheer variety of definitions highlights that while the core idea of leveraging AI for coding is consistent, the specifics of vibe coding are still being actively shaped.</p><h2>My Perspective: Outcome vs. Code Interaction</h2><p style=\"text-align: left\">My own perspective aligns more closely with the outcome-centric definitions. When I see tools like Cursor and Windsurf being labeled as vibe coding platforms, I feel there's a fundamental difference. These are powerful code editors with integrated AI assistance. While they undoubtedly enhance coding speed and efficiency through AI-powered features like code completion and even generating entire code blocks or files, the developer is still constantly interacting with and viewing the code.</p><p style=\"text-align: left\">Tools like Aider, Claude Code, V0, and Lovable, in my opinion, come closer to the essence of vibe coding. Aider operates as an AI pair programmer in the terminal, allowing for conversational interaction to build projects. Claude Code functions similarly in the terminal, understanding the codebase and assisting through natural language commands. V0 by Vercel and Lovable focuses on generating user interfaces from natural language descriptions, even for non-technical users. These platforms abstract away the direct code manipulation to a greater extent, allowing the user to focus more on the desired outcome.</p><h1>The Business-Engineering Analogy</h1><p style=\"text-align: left\">My perspective on vibe coding also relates to how businesses often interact with their engineering teams. Typically, the business side comes up with requirements, and product people work with engineers to deliver them. The business rarely delves into the code itself; they trust the engineers and the team to deliver the desired functionality. In a way, this is a form of <strong>Outcome-Based Delivery</strong> – the business focuses on the outcome and trusts the technical team to handle the "how."</p><p style=\"text-align: left\">For me, true vibe coding would be the developer doing the same with AI: providing the requirements and trusting the AI to deliver a working solution without the developer needing to heavily guide it towards specific code implementations.</p><h2>AI: Not Quite Ready for Prime "Vibe" Time?</h2><p style=\"text-align: left\">This brings me to my belief that LLM's might not be fully ready for this level of autonomous "vibe coding" just yet. I envision a more <strong>"agentic"</strong> approach where the AI can continuously work like an engineering team, handling tasks like code review, documentation, ensuring clean code, monitoring and observability, infrastructure, and quality assurance. It also requires a level of maturity from us, as humans, to enable and trust AI with these responsibilities. Simply using an editor like Cursor to get a single feature delivered, while helpful, doesn't quite feel like the full realization of vibe coding to me.</p><h2>Concerns and the Path Forward</h2><p style=\"text-align: left\">The rise of vibe coding has also sparked significant debate and raised valid concerns. A primary worry is the potential lack of understanding of the generated code, which could lead to problems with maintenance and debugging. Code quality, maintainability, and security are also major points of contention. The potential for accumulating technical debt and the impact on developer skills are also frequently discussed.</p><p style=\"text-align: left\">Despite these concerns, the potential of AI-assisted development is undeniable. It can significantly speed up prototyping and make software creation more accessible. As AI continues to evolve, perhaps we will see a clearer distinction between different levels of AI involvement in coding, and the term vibe coding might solidify around a more outcome-focused, agentic paradigm. For now, it's crucial to approach AI-assisted development with a balanced perspective, recognizing its potential while maintaining a strong understanding of fundamental software development principles.</p>',1,'932cc25a-0a00-4d66-bf81-71cace9f2403','1746633385734-lskajdaklsjdklasjd.png','2025-05-08 00:56:25','2025-05-08 00:56:25',NULL),('316b6af6-f338-4b54-8420-7717c8ee10c0','The Power of SVG Animations','<h1><a target=\"_blank\" rel=\"noopener\" class=\"text-blue-600 underline\" href=\"https://api.daily.dev/r/iphmNfr16\"><strong>The Power of SVG Animations</strong></a></h1>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:48','2025-05-08 00:44:12',NULL),('3a019242-8d1d-4a87-a8dd-02bdd0a7bff4','Hide Scrollbars While Keeping Scrolling Intact','<p>Learn how to hide scrollbars while keeping scrolling intact using various CSS techniques, including TailwindCSS. This can enhance the user experience in sleek and minimalistic web designs by decluttering the UI. Ensure accessibility by maintaining functional scrolling through trackpads, touch gestures, or keyboard navigation.</p>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:48','2025-05-08 00:45:08',NULL),('4520ada7-b3ac-4b08-ad55-fba0676c837f','7 Architectural Patterns You MUST Know','<ul data-type=\"taskList\"><li data-checked=\"false\" data-type=\"taskItem\"><label><input type=\"checkbox\"><span></span></label><div><p>asjda</p></div></li><li data-checked=\"true\" data-type=\"taskItem\"><label><input type=\"checkbox\" checked=\"checked\"><span></span></label><div><p>asjdklajs</p></div></li><li data-checked=\"false\" data-type=\"taskItem\"><label><input type=\"checkbox\"><span></span></label><div><p>asdasd</p></div></li></ul><p></p><p></p><p>Let's be real — the words "software architectural patterns" sound like something pulled from a dusty textbook or whispered in a late-night DevOps meeting. But here's the thing: these patterns shape how your apps work, scale, crash, or thrive. Whether you\'re building the next big thing or just figuring out how to structure your side project, <strong>understanding architecture isn't optional — it's essential.</strong></p><p>Now, I'm not here to throw jargon at you or pretend software design is some kind of secret society. Nope. This blog is your friendly guide to the <strong>7 architectural patterns</strong> that every modern developer should know — explained in plain English, with a splash of style and a lot less headache.</p><h2><strong>What's an Architectural Pattern?</strong></h2><p>Think of architectural patterns like the layout of a house. Open-plan kitchen? Studio apartment? Mansion with a moat? Each pattern helps organize how your software is built and how the parts talk to each other.</p><p></p><img src=\"https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab5bd548-1b0a-44db-8532-fd0fa6880649_556x453.png\" style=\"margin: 0px auto;\" draggable=\"true\">',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746795461563_1cfd78c3a4221186b86f7e247f1722ea.jpg','2025-05-09 21:57:41','2025-05-10 02:43:38',NULL),('773e05c3-a30f-4c0b-8953-631ac75c6100','15 Must-Know Elements of System Design','Thông báo',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:49','2025-05-08 19:03:31',NULL),('78abf3b1-4bbd-41a0-b635-b0a8171d788f','GitLab vs GitHub : Key Differences in 2025','<p>Không ngờ tôi lại có cơ hội làm điều này. Swarms Mùa 2 đã ra mắt! Bạn cũng sẽ có cơ hội \"xé túi mù\" trúng Gold Swarm trị giá 10.000 đô la! Hiện đang được bày bán tại Walmart, Target, Amazon, hoặc các cửa hàng đồ chơi lớn trên toàn thế giới. Video này có nội dung tài trợ hợp tác với Moose Toys.</p><p></p><div data-youtube-video=\"\"><iframe width=\"640\" height=\"480\" allowfullscreen=\"true\" autoplay=\"false\" disablekbcontrols=\"false\" enableiframeapi=\"false\" endtime=\"0\" ivloadpolicy=\"0\" loop=\"false\" modestbranding=\"false\" origin=\"\" playlist=\"\" rel=\"1\" src=\"https://www.youtube-nocookie.com/embed/NDsO1LT_0lw?rel=1\" start=\"0\"></iframe></div>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746632229758-ssssssssssdd.png','2025-05-02 00:35:48','2025-05-08 00:37:09',NULL),('8070f6aa-54e1-4678-8aca-4951323bc8ad','How does Netflix manage to show you a movie without interruptions?','<h1><strong>Test</strong></h1>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746632161236-original-9f1b7cfe4ab265169fa1c730d363e56f.png','2025-05-02 13:21:48','2025-05-08 00:36:01',NULL),('832dde4e-2efb-4d41-b8ba-c329fac387d8','Tailwind CSS v4 Full Course 2025 | Master Tailwind in One Hour','<h1>Tailwind CSS v4 Full Course 2025 | Master Tailwind in One Hour 123123123</h1>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746632661771-1_7XkV_Y7RIq3u-gbbTMTBRg.png','2025-05-08 00:37:51','2025-05-08 19:03:22',NULL),('a0247cf7-c469-4916-8187-cd0630b05db4','10 System Design Concepts You Must Master Before Your Next SDE Interview (with Resources)','Thông báo nghỉ lể',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746626783868-ÃDASD.png','2025-05-02 16:21:17','2025-05-08 00:35:04',NULL),('aa41f8fd-b269-4797-94e1-3aac66df8a43','Thông báo','Thông báo',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:44','2025-05-08 00:37:44',NULL),('b5e5ea69-5794-4c1f-8fc8-011eafdf6a35','Building a TikTok-like recommender','<p style=\"text-align: center\"></p><p style=\"text-align: center\">Cập nhật nè</p><p style=\"text-align: center\"><em>The </em><strong><em>first lesson</em></strong><em> of the </em><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"text-blue-600 underline af pr\" href=\"https://github.com/decodingml/personalized-recommender-course\"><strong><em>Hands-on H&amp;M Real-Time Personalized Recommender</em></strong></a><em> </em><strong><em>open-source course.</em></strong></p><p><em>A</em><strong><em> </em></strong><em>free course that will teach you how to build and deploy a real-time personalized recommender for H&amp;M fashion articles using the 4-stage recommender architecture, the two-tower model design and the Hopsworks AI Lakehouse.</em></p><img src=\"https://miro.medium.com/v2/resize:fit:1050/1*ickDBxnPu2dl9jvqN9lNBg.png\" alt=\"\" style=\"width: 700px; height: auto; cursor: pointer;\" loading=\"lazy\" width=\"700\" height=\"700\" class=\"bg fv qf c\" draggable=\"true\"><p>Generated by AI</p><h1><strong>Lessons:</strong></h1><p><strong>Lesson 1: Building a TikTok-like recommender</strong></p><p><a target=\"_blank\" rel=\"noopener\" class=\"text-blue-600 underline af pr\" href=\"https://medium.com/@paoloperrone/feature-pipelines-for-tiktok-like-recommenders-a686e90557a3\">Lesson 2: Feature pipelines for TikTok-like recommenders</a></p><p><a target=\"_blank\" rel=\"noopener\" class=\"text-blue-600 underline af pr\" href=\"https://medium.com/data-science-collective/training-pipelines-for-tiktok-like-recommenders-f517786e3147\">Lesson 3: Training pipelines for TikTok-like recommenders</a></p><p><a target=\"_blank\" rel=\"noopener\" class=\"text-blue-600 underline af pr\" href=\"https://medium.com/data-science-collective/4-deploy-scalable-tiktok-like-recommenders-bdf117c55648\">Lesson 4: Deploy scalable TikTok-like recommenders</a></p><p><a target=\"_blank\" rel=\"noopener\" class=\"text-blue-600 underline af pr\" href=\"https://medium.com/data-science-collective/using-llms-to-build-tiktok-like-recommenders-bd001c1329d2\">Lesson 5: Using LLMs to build TikTok-like recommenders</a></p><blockquote><p><em>? </em><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"text-blue-600 underline af pr\" href=\"https://github.com/decodingml/personalized-recommender-course\"><strong><em>Learn more</em></strong></a><em> about the course and its outline.</em></p></blockquote><h1><strong>Lesson 1: Building a TikTok-like recommender</strong></h1><p>In this lesson, we will discuss the <strong>architecture</strong> of <strong>H&amp;M's real-time personalized recommender</strong>. We will use a strategy similar to what TikTok employs for short videos, which will be applied to H&amp;M retail items.</p><p>We<strong> </strong>will <strong>present all the architectural patterns</strong> necessary for building an end-to-end TikTok-like personalized recommender for H&amp;M fashion items, from feature engineering to model training to real-time serving.</p><blockquote><p><em>? Explore all the lessons and the code in our freely available </em><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"text-blue-600 underline af pr\" href=\"https://github.com/decodingml/personalized-recommender-course\"><em>GitHub repository</em></a><em>.</em></p></blockquote><h1><strong>Table of Contents</strong></h1><p>r</p><h1><strong>Enjoyed this course?</strong></h1><p>The <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"text-blue-600 underline af pr\" href=\"https://github.com/decodingml/personalized-recommender-course\"><strong><em>H&amp;M Real-Time Personalized Recommender</em></strong></a><strong><em> </em></strong>course is part of Decoding ML's open-source series of end-to-end AI courses.</p><p><strong>For more similar free courses</strong> on production AI, GenAI, information retrieval, and MLOps systems, consider checking out our <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"text-blue-600 underline af pr\" href=\"https://decodingml.substack.com/p/master-production-ai-with-our-end\">available courses</a>.</p><h1><strong>A quick introduction to the H&amp;M retail dataset</strong></h1><p>The most standard use case for personalized recommendations is in retail, where you have customers, articles and transactions between the two.</p><p>The <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"text-blue-600 underline af pr\" href=\"https://www.kaggle.com/competitions/h-and-m-personalized-fashion-recommendations/overview\"><strong>H&amp;M Personalized Fashion Recommendations</strong></a><strong> </strong>dataset [5], which we will use throughout this course, is a perfect example.</p><p>It contains the following CSV files:</p><ul class=\"list-disc ml-3\"><li><p><em>articles.csv</em></p></li><li><p><em>customers.csv</em></p></li><li><p><em>transactions.csv</em></p></li></ul><h1><strong>Core paradigms for personalized</strong></h1><img src=\"https://miro.medium.com/v2/resize:fit:1050/0*J71Zoh0ZkNyC0csU.png\" alt=\"\" style=\"width: 700px; height: auto; cursor: pointer;\" loading=\"lazy\" width=\"700\" height=\"686\" class=\"bg fv qf c\" draggable=\"true\"><p>Figure 1: Core paradigms</p><p>Let's see how we can apply these two paradigms using the two-tower model.</p><p>Figure 2: The two-tower model</p><p>The two-tower model architecture trains two neural networks in parallel:</p><ul class=\"list-disc ml-3\"><li><p><strong>The customer query encoder</strong> transforms customer features into a dense embedding vector.</p></li><li><p><strong>The item candidates encoder</strong> transforms item features into dense embeddings in the same vector space as the customer embeddings.</p></li></ul><p>Both encoders can process various types of features:</p><ul class=\"list-disc ml-3\"><li><p><strong>Customer encoder:</strong> demographic information, historical behavior, contextual features</p></li><li><p><strong>Item encoder</strong>: tags, description, rating</p></li></ul><h1><strong>Understanding the 4-stage recommender architecture</strong></h1><p>The 4-stage recommender architecture is the standard for building scalable, real-time personalized recommenders based on various data types and use cases.</p><p>It's used and proposed by giants such as Nvidia [7] and YouTube [2].</p><p>In the 4-stage recsys architecture, the <strong>data flows</strong> in <strong>two ways</strong>:</p><ol class=\"list-decimal ml-3\"><li><p>An <strong>offline pipeline</strong> that computes the candidate embeddings and loads them to a vector index or database. This pipeline usually runs in batch mode.</p></li><li><p>An <strong>online pipeline</strong> that computes the actual recommendations for a customer. This pipeline can run in batch, async, real-time or streaming mode, depending on the type of application you build.</p></li></ol><p>Computing the item candidate embeddings offline allows us to make recommendations from a large corpus (millions) of items while still being confident that the small number of recommended items is personalized and engaging for the user.</p><img src=\"https://miro.medium.com/v2/resize:fit:1050/0*0snwXywJbWIB9LK3.png\" alt=\"\" style=\"width: 700px; height: auto; cursor: pointer;\" loading=\"lazy\" width=\"700\" height=\"418\" class=\"bg fv qf c\" draggable=\"true\"><ul class=\"list-disc ml-3\"><li><p><mark style=\"background-color: rgb(242, 240, 240)\">vector index</mark> (e.g., ScaNN, Faiss);</p></li><li><p>vector database (e.g., Hopsworks, Qdrant, MongoDB).</p></li></ul><p>By decoupling the item embedding creation from the actual recommendation, we can drastically speed up the recommendation for each customer as:</p><ul class=\"list-disc ml-3\"><li><p>Everything we want to find (recommend) is precomputed when customers access our application.</p></li><li><p>We can optimize the offline and online pipelines differently for better latency, lower costs, required throughput, etc.</p></li></ul><p>The <strong>online pipeline</strong> is split into 4-stages (as the name suggests), starting with the user's requests and ending with the recommendations.</p><img src=\"https://miro.medium.com/v2/resize:fit:1050/0*cGglpw66iBXdbh5L.png\" alt=\"\" style=\"width: 700px; height: auto; cursor: pointer;\" loading=\"lazy\" width=\"700\" height=\"647\" class=\"bg fv qf c\" draggable=\"true\"><h1><strong>Applying the 4-stage architecture to our H&amp;M use case</strong></h1><p>If we understand how the two-tower model and 4-stage architecture work, applying it to our H&amp;M use case is very intuitive.</p><p><strong>First,</strong> let's understand who the <em>"customers"</em> and <em>"items"</em> are in our use case.</p><p>The customers are the users looking to buy items on the H&amp;M site or application.</p><p>The items are the fashion items sold by H&amp;M, such as clothes, socks, shoes, etc.</p><p>Thus, we must show the customers fashion items they are most likely to buy.</p><p>For example, if he searched for T-shirts, most likely we should recommend T-shirts. Our recsys should pick up on that.</p><p>app.</p><h1><strong>Presenting the feature/training/inference (FTI)</strong></h1><img src=\"https://miro.medium.com/v2/resize:fit:1050/0*qM9PzsWfQ_8sVvzN.png\" alt=\"\" style=\"width: 700px; height: auto; cursor: pointer; margin: 0px auto;\" loading=\"lazy\" width=\"700\" height=\"645\" class=\"bg fv qf c\" draggable=\"true\"><p><br></p>',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746626770787-1_7XkV_Y7RIq3u-gbbTMTBRg.png','2025-05-06 00:24:19','2025-05-07 23:06:10',NULL),('daf6a7c3-eb15-4ff9-9e58-70341679cfb4','I won\'t connect my dishwasher to your stupid cloud','Thông báo',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746632741167-ssssssssssdd.png','2025-05-08 00:37:47','2025-05-08 00:45:41',NULL),('e811918d-902a-4007-b215-6405a7ea5046','Every line of code is always documented','Thông báo',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22',NULL,'2025-05-08 00:37:45','2025-05-08 00:46:35',NULL),('edf7cea3-de42-4b02-b8b3-3a3949486497','Top 5 React Stock Chart Libraries for 2025','Thông báo',1,'1302f77c-0219-41e6-b90b-5b6a172d9f22','1746632774791-448f0407-8a15-4b59-a91f-8a197bc07578.png','2025-05-08 00:37:46','2025-05-08 00:46:14',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `group_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `topic_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `commit_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `evaluation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `submitted_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `submission_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `topic_id` (`topic_id`),
  KEY `author_id` (`author_id`),
  KEY `submission_id` (`submission_id`),
  CONSTRAINT `submissions_ibfk_1632` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `submissions_ibfk_1633` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `submissions_ibfk_1634` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `submissions_ibfk_1635` FOREIGN KEY (`submission_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES ('565c9fce-af6b-464b-b388-b90657ca3a33','CSDL','Mới nhất','2025-05-02 13:04:06','2025-05-02 13:04:06',NULL),('8c70b879-33c8-4cd6-ac53-9ad520bba8e0','React','Mới nhất','2025-05-02 13:04:11','2025-05-02 13:04:11',NULL),('92c3e1e6-2bf3-11f0-926a-e00af682e81e','ML','Học máy là lĩnh vực nghiên cứu các thuật toán cho phép máy tính học từ dữ liệu.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c44fc1-2bf3-11f0-926a-e00af682e81e','DL','Học sâu là một nhánh của học máy sử dụng mạng nơ-ron nhiều lớp.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c45335-2bf3-11f0-926a-e00af682e81e','NLP','Xử lý ngôn ngữ tự nhiên giúp máy tính hiểu và tạo ra ngôn ngữ con người.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c45460-2bf3-11f0-926a-e00af682e81e','CV','Thị giác máy tính giúp máy "nhìn" và phân tích hình ảnh, video.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48dbd-2bf3-11f0-926a-e00af682e81e','RL','Học tăng cường là phương pháp học dựa trên phần thưởng và phạt.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48ea8-2bf3-11f0-926a-e00af682e81e','GenAI','AI sinh dữ liệu mới như văn bản, hình ảnh, âm thanh.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48ef5-2bf3-11f0-926a-e00af682e81e','AI Ethics','Đạo đức AI nghiên cứu các vấn đề đạo đức liên quan đến phát triển AI.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48f36-2bf3-11f0-926a-e00af682e81e','Edge AI','AI chạy trên thiết bị biên, giảm phụ thuộc vào đám mây.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48f79-2bf3-11f0-926a-e00af682e81e','AI Health','Ứng dụng AI trong y tế để chẩn đoán và điều trị bệnh.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48faf-2bf3-11f0-926a-e00af682e81e','AI Sec','Bảo mật AI nghiên cứu bảo vệ hệ thống AI khỏi tấn công.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('94f145d6-2bf3-11f0-926a-e00af682e81e','ML','Học máy là lĩnh vực nghiên cứu các thuật toán cho phép máy tính học từ dữ liệu.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14c35-2bf3-11f0-926a-e00af682e81e','DL','Học sâu là một nhánh của học máy sử dụng mạng nơ-ron nhiều lớp.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14dda-2bf3-11f0-926a-e00af682e81e','NLP','Xử lý ngôn ngữ tự nhiên giúp máy tính hiểu và tạo ra ngôn ngữ con người.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14ef4-2bf3-11f0-926a-e00af682e81e','CV','Thị giác máy tính giúp máy "nhìn" và phân tích hình ảnh, video.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14feb-2bf3-11f0-926a-e00af682e81e','RL','Học tăng cường là phương pháp học dựa trên phần thưởng và phạt.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f150e3-2bf3-11f0-926a-e00af682e81e','GenAI','AI sinh dữ liệu mới như văn bản, hình ảnh, âm thanh.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f151cb-2bf3-11f0-926a-e00af682e81e','AI Ethics','Đạo đức AI nghiên cứu các vấn đề đạo đức liên quan đến phát triển AI.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f152ab-2bf3-11f0-926a-e00af682e81e','Edge AI','AI chạy trên thiết bị biên, giảm phụ thuộc vào đám mây.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f153b1-2bf3-11f0-926a-e00af682e81e','AI Health','Ứng dụng AI trong y tế để chẩn đoán và điều trị bệnh.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f154a4-2bf3-11f0-926a-e00af682e81e','AI Sec','Bảo mật AI nghiên cứu bảo vệ hệ thống AI khỏi tấn công.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('9b4efddd-0c76-4bf8-bc82-83f4eb61c74a','NextJs','Mới nhất','2025-05-02 13:04:16','2025-05-02 13:04:16',NULL),('bf62faa5-27c3-4637-805d-85e6446dd61c','Python','Mới nhất','2025-05-02 13:04:22','2025-05-02 13:04:22',NULL),('ea2b9370-f49c-4f97-b7bd-458a72b8eb96','News','Mới nhất','2025-05-02 13:04:02','2025-05-02 13:04:02',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_tags` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tag_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `topic_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `topic_tags_tagId_topicId_unique` (`tag_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `topic_tags_ibfk_745` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topic_tags_ibfk_746` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_tags`
--

LOCK TABLES `topic_tags` WRITE;
/*!40000 ALTER TABLE `topic_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `course_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `is_custom` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'approved',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `topics_ibfk_1331` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `topics_ibfk_1332` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `topics_ibfk_1333` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `uid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('admin','user','teacher') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('active','inactive','suspended') COLLATE utf8mb4_general_ci DEFAULT 'active',
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1302f77c-0219-41e6-b90b-5b6a172d9f22','mai@gmail.com','1746110366852',NULL,'User 1','$2b$10$4iBRHi3Yt7QkjEve6AZ7veyWQ4ior4lDLddEnRX.ZCdqQksYM4uKu',NULL,'active',NULL,'2025-05-01 23:39:26','2025-05-01 23:39:26',NULL),('4851e3fa-2abd-47dd-8bc6-af9fe19d20a6','tanmai833@gmail.com','tanmaiii','rzJ5LW0uQeRUhQ0lxeNDlP9HVTz2','Đinh Tấn Mãi',NULL,'user','active','https://avatars.githubusercontent.com/u/90459047?v=4','2025-05-05 23:13:17','2025-05-05 23:13:17',NULL),('932cc25a-0a00-4d66-bf81-71cace9f2403','test@gmail.com','1746420460405',NULL,'test@gmail.com','$2b$10$AZ4Jsbf6YMWzIuwORZBSe.9GDvItiANs3ppFmRCSVRrqfpB0YzENi',NULL,'active',NULL,'2025-05-05 13:47:40','2025-05-05 13:47:40',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-11 12:34:22
