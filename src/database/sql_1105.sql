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

DROP TABLE IF EXISTS `comments`;
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
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`),
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_5` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_documents`
--

DROP TABLE IF EXISTS `course_documents`;
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
INSERT INTO `course_documents` VALUES ('ab33bfa2-0293-4a34-9809-ce22afd25d9b','1746947450846_PART_2_Spetking.pdf','1746947450846_PART_2_Spetking.pdf','62b307b0-2dcf-4a22-850c-454b4545b0d5','2025-05-11 16:10:50','2025-05-11 16:10:50',NULL),('fb42a029-6195-40d0-8c51-5989cf50d589','1746947450847_Spetking_AVKC4.pdf','1746947450847_Spetking_AVKC4.pdf','62b307b0-2dcf-4a22-850c-454b4545b0d5','2025-05-11 16:10:50','2025-05-11 16:10:50',NULL);
/*!40000 ALTER TABLE `course_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_tags`
--

DROP TABLE IF EXISTS `course_tags`;
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
  CONSTRAINT `course_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `course_tags_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_tags`
--

LOCK TABLES `course_tags` WRITE;
/*!40000 ALTER TABLE `course_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `topic_deadline` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `max_group_members` int NOT NULL DEFAULT '3',
  `author_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
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
INSERT INTO `courses` VALUES ('62b307b0-2dcf-4a22-850c-454b4545b0d5','Vỡ lòng về Automation với n8n','<p>Tự động hóa quy trình làm việc dễ dàng với n8n – Khóa học vỡ lòng cho người mới bắt đầu</p><p></p><h2><strong>Nội dung bài học</strong></h2><ul class=\"list-disc ml-3\"><li><p>Hiểu rõ cách hoạt động của n8n – Nắm vững các khái niệm cơ bản về automation, workflow và cách sử dụng n8n để tự động hóa công việc.</p></li><li><p>Xây dựng quy trình tự động hóa – Biết cách tạo, chỉnh sửa và triển khai các workflow tự động hóa giúp tối ưu công việc hàng ngày.</p></li><li><p>Kết nối và tích hợp ứng dụng – Thành thạo cách sử dụng n8n để kết nối nhiều ứng dụng (Google Sheets, Slack, Email, API…) mà không cần viết code.</p></li><li><p>Ứng dụng thực tế vào công việc – Có thể tự động hóa các tác vụ cá nhân hoặc trong doanh nghiệp, giúp tiết kiệm thời gian và nâng cao hiệu suất làm việc.</p></li></ul><p></p><h2><strong>Yêu cầu</strong></h2><ul class=\"list-disc ml-3\"><li><p>Không yêu cầu trình độ trước.</p></li></ul><h2><strong>Mô tả</strong></h2><p>Bạn muốn tự động hóa công việc nhưng không biết lập trình? Bạn đang tìm kiếm một công cụ giúp tối ưu quy trình làm việc một cách dễ dàng? <strong>Khóa học \"Vỡ lòng về Automation với n8n\"</strong> sẽ giúp bạn làm chủ n8n – một nền tảng tự động hóa mạnh mẽ, dễ sử dụng và hoàn toàn miễn phí.</p><p>Trong khóa học này, bạn sẽ:<br>- Hiểu rõ khái niệm về automation và cách hoạt động của n8n<br>- Biết cách tạo và quản lý workflow tự động từ đơn giản đến nâng cao<br>- Kết nối n8n với các ứng dụng phổ biến như Google Sheets, Slack, Email, API…<br>- Ứng dụng n8n vào thực tế để tối ưu công việc và nâng cao hiệu suất<br>- Tiết kiệm thời gian bằng cách tự động hóa các tác vụ lặp đi lặp lại<br>- Không cần biết lập trình vẫn có thể tạo workflow mạnh mẽ</p><p>Dù bạn là <strong>người mới bắt đầu, nhà quản lý, marketer hay lập trình viên</strong>, khóa học này sẽ giúp bạn tự động hóa dễ dàng mà không cần code phức tạp.</p><p>Với phương pháp giảng dạy trực quan, bài tập thực hành thực tế và hướng dẫn từng bước, bạn sẽ nhanh chóng nắm vững cách sử dụng n8n để cải thiện công việc hàng ngày.</p><p>Tham gia ngay để khám phá sức mạnh của n8n và biến công việc của bạn trở nên nhẹ nhàng hơn!</p><h2><strong>Đối tượng của khóa học này:</strong></h2><ul class=\"list-disc ml-3\"><li><p>Người mới bắt đầu với Automation – Những ai chưa có kinh nghiệm về tự động hóa và muốn tìm hiểu cách sử dụng n8n để tối ưu quy trình làm việc.</p></li><li><p>Nhà quản lý và doanh nghiệp – Những người muốn tự động hóa công việc lặp lại, giảm thời gian xử lý thủ công và nâng cao hiệu suất làm việc.</p></li><li><p>Marketer &amp; Chuyên viên vận hành – Những ai cần kết nối các công cụ marketing, CRM, email hoặc quản lý dữ liệu mà không cần lập trình.</p></li><li><p>Lập trình viên &amp; Chuyên viên IT – Những người muốn sử dụng n8n để tích hợp API, xây dựng quy trình tự động phức tạp và tối ưu hóa hệ thống.</p></li></ul>','1746947450835_ÃDASD.png','2025-05-11 02:00:00','2025-05-31 02:00:00','2025-06-08 02:00:00',0,3,'ef46bf3f-840c-43b2-a9b8-1aed7f3b3a04','2025-05-11 16:10:50','2025-05-11 16:10:50',NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
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
  CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
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

DROP TABLE IF EXISTS `groups`;
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
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
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

DROP TABLE IF EXISTS `post_likes`;
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
  CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likes`
--

LOCK TABLES `post_likes` WRITE;
/*!40000 ALTER TABLE `post_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tags`
--

DROP TABLE IF EXISTS `post_tags`;
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
  CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tags`
--

LOCK TABLES `post_tags` WRITE;
/*!40000 ALTER TABLE `post_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
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
INSERT INTO `posts` VALUES ('e1a5a90f-2938-421e-a40a-d2e2c51cad4b','How to Become a Top 1% Programmer: The Path You Have to Take','<p>So, you want to become better than 99% of programmers. But you are doing the exact same things that 99% of programmers are already doing — watching video tutorials, doing online courses, and solving Leetcode problems. Everybody is doing that.</p><p></p><p>Today, we are going to discuss how, if we are in the field of coding and programming, we can go into the top 1% of our field. How we can stand out from the crowd and move forward. Now, all the things we are going to discuss today will be fairly simple; there is no need for us to make any major sacrifices.</p><p></p><p>But yes, realistically speaking, none of these are things that if we do for one day, we will reach the top 1%. These are things on which we will have to invest conscious effort and consciously invest time, and gradually, if we keep following all these things over time, then definitely we will reach the top 1% in our field.</p><p></p><blockquote><p><em>“The secret of getting ahead is getting started.”&nbsp;— Mark Twain</em></p></blockquote><p></p><p>Doing what everyone else is doing is the very definition of how to become average. And there’s nothing wrong with that. But if you want to get ahead of others, you have to be willing to do what others are not willing to do.</p><p></p><p>Here are such things you can do right now.</p><h2><strong>Enjoy the Process</strong></h2><p></p><p>Now, the very first thing we can do among these is to enjoy the process. So basically, the thing we can pick from here is the mindset. About our work — the more meaningful we understand that whatever work we are doing, whatever things we are doing, whatever skill we are trying to build feels to us as meaningful, the more we enjoy that thing.</p><p></p><blockquote><p><em>“Pleasure in the job puts perfection in the work.”&nbsp;— Aristotle</em></p></blockquote><p></p><p>The more that thing brings happiness for us. Therefore, if we want to become the top 1% of coders, then we will have to genuinely enjoy the process of coding. In every field, the top % of people are those who genuinely enjoy their work more than other people. Therefore, it is important for us to consciously enjoy it as well.</p><h2><strong>The Right Mindset for Growth</strong></h2><p>Now, here, “enjoying” does not mean at all that if we are watching a movie or going out with friends or eating good food, we will start enjoying coding to that extent. Definitely, it is such a thing in which we will be putting in more effort; but at the end, doing this does not mean that if we code merely for mental peace or a sense of satisfaction, then my job will get done — this is absolutely the wrong approach.</p><p></p><blockquote><p><em>“Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.”&nbsp;— Unknown</em></p></blockquote><p></p><p>Because after a week, that thing will slip from our mind, and then we will not feel like doing it. So, we will have to consciously enjoy our work, find meaning in it so that that thing actually makes us happy — so that the whole process of coding and programming starts giving us happiness.</p><h2><strong>Master Debugging Skills</strong></h2>',1,'ef46bf3f-840c-43b2-a9b8-1aed7f3b3a04','1746951435164_1_7XkV_Y7RIq3u-gbbTMTBRg.png','2025-05-11 17:17:15','2025-05-11 17:17:15',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
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
  CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `submissions_ibfk_3` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `submissions_ibfk_4` FOREIGN KEY (`submission_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
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

DROP TABLE IF EXISTS `tags`;
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
INSERT INTO `tags` VALUES ('565c9fce-af6b-464b-b388-b90657ca3a33','CSDL','Mới nhất','2025-05-02 13:04:06','2025-05-02 13:04:06',NULL),('8c70b879-33c8-4cd6-ac53-9ad520bba8e0','React','Mới nhất','2025-05-02 13:04:11','2025-05-02 13:04:11',NULL),('92c3e1e6-2bf3-11f0-926a-e00af682e81e','ML','Học máy là lĩnh vực nghiên cứu các thuật toán cho phép máy tính học từ dữ liệu.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c44fc1-2bf3-11f0-926a-e00af682e81e','DL','Học sâu là một nhánh của học máy sử dụng mạng nơ-ron nhiều lớp.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c45335-2bf3-11f0-926a-e00af682e81e','NLP','Xử lý ngôn ngữ tự nhiên giúp máy tính hiểu và tạo ra ngôn ngữ con người.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c45460-2bf3-11f0-926a-e00af682e81e','CV','Thị giác máy tính giúp máy \"nhìn\" và phân tích hình ảnh, video.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48dbd-2bf3-11f0-926a-e00af682e81e','RL','Học tăng cường là phương pháp học dựa trên phần thưởng và phạt.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48ea8-2bf3-11f0-926a-e00af682e81e','GenAI','AI sinh dữ liệu mới như văn bản, hình ảnh, âm thanh.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48ef5-2bf3-11f0-926a-e00af682e81e','AI Ethics','Đạo đức AI nghiên cứu các vấn đề đạo đức liên quan đến phát triển AI.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48f36-2bf3-11f0-926a-e00af682e81e','Edge AI','AI chạy trên thiết bị biên, giảm phụ thuộc vào đám mây.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48f79-2bf3-11f0-926a-e00af682e81e','AI Health','Ứng dụng AI trong y tế để chẩn đoán và điều trị bệnh.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('92c48faf-2bf3-11f0-926a-e00af682e81e','AI Sec','Bảo mật AI nghiên cứu bảo vệ hệ thống AI khỏi tấn công.','2025-05-08 17:02:38','2025-05-08 17:02:38',NULL),('94f145d6-2bf3-11f0-926a-e00af682e81e','ML','Học máy là lĩnh vực nghiên cứu các thuật toán cho phép máy tính học từ dữ liệu.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14c35-2bf3-11f0-926a-e00af682e81e','DL','Học sâu là một nhánh của học máy sử dụng mạng nơ-ron nhiều lớp.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14dda-2bf3-11f0-926a-e00af682e81e','NLP','Xử lý ngôn ngữ tự nhiên giúp máy tính hiểu và tạo ra ngôn ngữ con người.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14ef4-2bf3-11f0-926a-e00af682e81e','CV','Thị giác máy tính giúp máy \"nhìn\" và phân tích hình ảnh, video.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f14feb-2bf3-11f0-926a-e00af682e81e','RL','Học tăng cường là phương pháp học dựa trên phần thưởng và phạt.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f150e3-2bf3-11f0-926a-e00af682e81e','GenAI','AI sinh dữ liệu mới như văn bản, hình ảnh, âm thanh.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f151cb-2bf3-11f0-926a-e00af682e81e','AI Ethics','Đạo đức AI nghiên cứu các vấn đề đạo đức liên quan đến phát triển AI.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f152ab-2bf3-11f0-926a-e00af682e81e','Edge AI','AI chạy trên thiết bị biên, giảm phụ thuộc vào đám mây.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f153b1-2bf3-11f0-926a-e00af682e81e','AI Health','Ứng dụng AI trong y tế để chẩn đoán và điều trị bệnh.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('94f154a4-2bf3-11f0-926a-e00af682e81e','AI Sec','Bảo mật AI nghiên cứu bảo vệ hệ thống AI khỏi tấn công.','2025-05-08 17:02:42','2025-05-08 17:02:42',NULL),('9b4efddd-0c76-4bf8-bc82-83f4eb61c74a','NextJs','Mới nhất','2025-05-02 13:04:16','2025-05-02 13:04:16',NULL),('bf62faa5-27c3-4637-805d-85e6446dd61c','Python','Mới nhất','2025-05-02 13:04:22','2025-05-02 13:04:22',NULL),('ea2b9370-f49c-4f97-b7bd-458a72b8eb96','News','Mới nhất','2025-05-02 13:04:02','2025-05-02 13:04:02',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_tags`
--

DROP TABLE IF EXISTS `topic_tags`;
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
  CONSTRAINT `topic_tags_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topic_tags_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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

DROP TABLE IF EXISTS `topics`;
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
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `topics_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `topics_ibfk_3` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
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

DROP TABLE IF EXISTS `users`;
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
INSERT INTO `users` VALUES ('ef46bf3f-840c-43b2-a9b8-1aed7f3b3a04','mai@gmail.com','1746944557036',NULL,'User 1','$2b$10$LUyxufR/aBl3qA/sSSOjueQNZuLo7IhRKDzS6/oYq/N3Q8IqltcKq',NULL,'active',NULL,'2025-05-11 15:22:37','2025-05-11 15:22:37',NULL);
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

-- Dump completed on 2025-05-11 17:52:26
