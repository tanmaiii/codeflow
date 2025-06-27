-- =============================================
-- SAMPLE DATA FOR CODEFLOW DATABASE
-- =============================================

-- Disable foreign key checks để insert dữ liệu
SET FOREIGN_KEY_CHECKS = 0;

-- =============================================
-- USERS TABLE - Bảng người dùng
-- =============================================
INSERT INTO `users` (`id`, `email`, `username`, `uid`, `name`, `password`, `role`, `status`, `avatar`, `bio`, `created_at`, `updated_at`) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'admin@codeflow.com', 'admin_user', 'admin_uid_001', 'Nguyễn Văn Admin', '$2b$10$hashedpassword123', 'admin', 'active', '/public/images/avatar1.jpg', 'Quản trị viên hệ thống CodeFlow', NOW(), NOW()),
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'teacher1@university.edu', 'teacher_nguyen', 'teacher_uid_001', 'Nguyễn Thị Lan', '$2b$10$hashedpassword456', 'teacher', 'active', '/public/images/avatar2.jpg', 'Giảng viên khoa Công nghệ thông tin', NOW(), NOW()),
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'student1@student.edu', 'student_minh', 'student_uid_001', 'Trần Văn Minh', '$2b$10$hashedpassword789', 'user', 'active', '/public/images/avatar3.jpg', 'Sinh viên năm 4 chuyên ngành CNTT', NOW(), NOW()),
('d4e5f6g7-h8i9-0123-4567-890123defghi', 'student2@student.edu', 'student_linh', 'student_uid_002', 'Lê Thị Linh', '$2b$10$hashedpassword012', 'user', 'active', '/public/images/avatar4.jpg', 'Sinh viên năm 3 chuyên ngành KHMT', NOW(), NOW()),
('e5f6g7h8-i9j0-1234-5678-901234efghij', 'teacher2@university.edu', 'teacher_duc', 'teacher_uid_002', 'Phạm Văn Đức', '$2b$10$hashedpassword345', 'teacher', 'active', '/public/images/avatar5.jpg', 'Giảng viên khoa Khoa học máy tính', NOW(), NOW());

-- =============================================
-- TAGS TABLE - Bảng thẻ tag
-- =============================================
INSERT INTO `tags` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('tag001-1111-2222-3333-444444444444', 'JavaScript', 'Ngôn ngữ lập trình JavaScript và các framework liên quan', NOW(), NOW()),
('tag002-2222-3333-4444-555555555555', 'React', 'Thư viện React.js cho phát triển giao diện người dùng', NOW(), NOW()),
('tag003-3333-4444-5555-666666666666', 'Node.js', 'Môi trường runtime JavaScript cho backend', NOW(), NOW()),
('tag004-4444-5555-6666-777777777777', 'Database', 'Cơ sở dữ liệu và các công nghệ liên quan', NOW(), NOW()),
('tag005-5555-6666-7777-888888888888', 'Machine Learning', 'Học máy và trí tuệ nhân tạo', NOW(), NOW()),
('tag006-6666-7777-8888-999999999999', 'Web Development', 'Phát triển ứng dụng web full-stack', NOW(), NOW());

-- =============================================
-- COURSES TABLE - Bảng khóa học
-- =============================================
INSERT INTO `courses` (`id`, `title`, `description`, `thumbnail`, `start_date`, `end_date`, `reg_start_date`, `reg_end_date`, `topic_deadline`, `status`, `max_group_members`, `password`, `author_id`, `type`, `created_at`, `updated_at`) VALUES
('course01-1111-2222-3333-444444444444', 'Lập trình Web với React.js', 'Khóa học về phát triển ứng dụng web hiện đại với React.js, Redux và các công nghệ frontend tiên tiến', '/public/images/course1.jpg', '2024-02-01', '2024-06-30', '2024-01-15', '2024-01-31', '2024-03-15', 1, 4, NULL, 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'major', NOW(), NOW()),
('course02-2222-3333-4444-555555555555', 'Cơ sở dữ liệu nâng cao', 'Khóa học về thiết kế, tối ưu hóa và quản trị cơ sở dữ liệu MySQL, PostgreSQL', '/public/images/course2.jpg', '2024-02-15', '2024-07-15', '2024-01-20', '2024-02-10', '2024-04-01', 1, 3, 'db2024', 'e5f6g7h8-i9j0-1234-5678-901234efghij', 'foundation', NOW(), NOW()),
('course03-3333-4444-5555-666666666666', 'Trí tuệ nhân tạo cơ bản', 'Giới thiệu về Machine Learning, Deep Learning và các ứng dụng AI trong thực tế', '/public/images/course3.jpg', '2024-03-01', '2024-08-01', '2024-02-10', '2024-02-25', '2024-04-15', 1, 5, NULL, 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'elective', NOW(), NOW());

-- =============================================
-- COURSE_ENROLLMENTS TABLE - Bảng đăng ký khóa học
-- =============================================
INSERT INTO `course_enrollments` (`course_id`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
('course01-1111-2222-3333-444444444444', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 1, NOW(), NOW()),
('course01-1111-2222-3333-444444444444', 'd4e5f6g7-h8i9-0123-4567-890123defghi', 1, NOW(), NOW()),
('course02-2222-3333-4444-555555555555', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 1, NOW(), NOW()),
('course02-2222-3333-4444-555555555555', 'd4e5f6g7-h8i9-0123-4567-890123defghi', 1, NOW(), NOW()),
('course03-3333-4444-5555-666666666666', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 1, NOW(), NOW());

-- =============================================
-- COURSE_TAGS TABLE - Bảng quan hệ khóa học và tag
-- =============================================
INSERT INTO `course_tags` (`course_id`, `tag_id`, `created_at`, `updated_at`) VALUES
('course01-1111-2222-3333-444444444444', 'tag001-1111-2222-3333-444444444444', NOW(), NOW()),
('course01-1111-2222-3333-444444444444', 'tag002-2222-3333-4444-555555555555', NOW(), NOW()),
('course01-1111-2222-3333-444444444444', 'tag006-6666-7777-8888-999999999999', NOW(), NOW()),
('course02-2222-3333-4444-555555555555', 'tag004-4444-5555-6666-777777777777', NOW(), NOW()),
('course03-3333-4444-5555-666666666666', 'tag005-5555-6666-7777-888888888888', NOW(), NOW());

-- =============================================
-- COURSE_DOCUMENTS TABLE - Bảng tài liệu khóa học
-- =============================================
INSERT INTO `course_documents` (`id`, `course_id`, `title`, `url`, `created_at`, `updated_at`) VALUES
('doc001-1111-2222-3333-444444444444', 'course01-1111-2222-3333-444444444444', 'Bài giảng 1: Giới thiệu React', '/public/files/react_intro.pdf', NOW(), NOW()),
('doc002-2222-3333-4444-555555555555', 'course01-1111-2222-3333-444444444444', 'Source code demo React', '/public/files/react_demo.zip', NOW(), NOW()),
('doc003-3333-4444-5555-666666666666', 'course02-2222-3333-4444-555555555555', 'Thiết kế CSDL quan hệ', '/public/files/database_design.pdf', NOW(), NOW()),
('doc004-4444-5555-6666-777777777777', 'course03-3333-4444-5555-666666666666', 'Machine Learning cơ bản', '/public/files/ml_basic.pdf', NOW(), NOW());

-- =============================================
-- TOPICS TABLE - Bảng chủ đề đồ án
-- =============================================
INSERT INTO `topics` (`id`, `title`, `description`, `course_id`, `author_id`, `teacher_id`, `is_custom`, `status`, `group_name`, `created_at`, `updated_at`) VALUES
('topic01-1111-2222-3333-444444444444', 'Xây dựng website bán hàng online', 'Phát triển website thương mại điện tử hoàn chỉnh với React.js frontend và Node.js backend', 'course01-1111-2222-3333-444444444444', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 1, 'approved', 'Team Alpha', NOW(), NOW()),
('topic02-2222-3333-4444-555555555555', 'Hệ thống quản lý thư viện', 'Xây dựng ứng dụng quản lý thư viện với database MySQL và giao diện web responsive', 'course02-2222-3333-4444-555555555555', 'd4e5f6g7-h8i9-0123-4567-890123defghi', 'e5f6g7h8-i9j0-1234-5678-901234efghij', 0, 'pending', 'Team Beta', NOW(), NOW()),
('topic03-3333-4444-5555-666666666666', 'Chatbot AI hỗ trợ học tập', 'Phát triển chatbot thông minh sử dụng NLP để hỗ trợ sinh viên trong việc học tập', 'course03-3333-4444-5555-666666666666', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 1, 'approved', 'AI Team', NOW(), NOW());

-- =============================================
-- TOPIC_MEMBERS TABLE - Bảng thành viên nhóm chủ đề
-- =============================================
INSERT INTO `topic_members` (`topic_id`, `user_id`, `created_at`, `updated_at`) VALUES
('topic01-1111-2222-3333-444444444444', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NOW(), NOW()),
('topic01-1111-2222-3333-444444444444', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NOW(), NOW()),
('topic02-2222-3333-4444-555555555555', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NOW(), NOW()),
('topic03-3333-4444-5555-666666666666', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NOW(), NOW());

-- =============================================
-- TOPIC_TAGS TABLE - Bảng quan hệ chủ đề và tag
-- =============================================
INSERT INTO `topic_tags` (`topic_id`, `tag_id`, `created_at`, `updated_at`) VALUES
('topic01-1111-2222-3333-444444444444', 'tag001-1111-2222-3333-444444444444', NOW(), NOW()),
('topic01-1111-2222-3333-444444444444', 'tag002-2222-3333-4444-555555555555', NOW(), NOW()),
('topic01-1111-2222-3333-444444444444', 'tag006-6666-7777-8888-999999999999', NOW(), NOW()),
('topic02-2222-3333-4444-555555555555', 'tag004-4444-5555-6666-777777777777', NOW(), NOW()),
('topic03-3333-4444-5555-666666666666', 'tag005-5555-6666-7777-888888888888', NOW(), NOW());

-- =============================================
-- TOPIC_EVALUATIONS TABLE - Bảng đánh giá chủ đề
-- =============================================
INSERT INTO `topic_evaluations` (`id`, `topic_id`, `teacher_id`, `score`, `feedback`, `created_at`, `updated_at`) VALUES
('eval001-1111-2222-3333-444444444444', 'topic01-1111-2222-3333-444444444444', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 8.5, 'Ý tưởng tốt, thực hiện khá tốt. Cần cải thiện UI/UX và performance', NOW(), NOW()),
('eval002-2222-3333-4444-555555555555', 'topic03-3333-4444-5555-666666666666', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 9.0, 'Ứng dụng AI rất hay, accuracy cao và giao diện thân thiện', NOW(), NOW()),
('eval003-3333-4444-5555-666666666666', 'topic01-1111-2222-3333-444444444444', 'e5f6g7h8-i9j0-1234-5678-901234efghij', 7.8, 'Database design tốt nhưng cần tối ưu hóa query performance', NOW(), NOW());

-- =============================================
-- REPOS TABLE - Bảng repository
-- =============================================
INSERT INTO `repos` (`id`, `name`, `url`, `course_id`, `topic_id`, `author_id`, `created_at`, `updated_at`) VALUES
('repo001-1111-2222-3333-444444444444', 'ecommerce-website', 'https://github.com/teamalpha/ecommerce-website', 'course01-1111-2222-3333-444444444444', 'topic01-1111-2222-3333-444444444444', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NOW(), NOW()),
('repo002-2222-3333-4444-555555555555', 'library-management', 'https://github.com/teambeta/library-management', 'course02-2222-3333-4444-555555555555', 'topic02-2222-3333-4444-555555555555', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NOW(), NOW()),
('repo003-3333-4444-5555-666666666666', 'ai-chatbot-learning', 'https://github.com/aiteam/ai-chatbot-learning', 'course03-3333-4444-5555-666666666666', 'topic03-3333-4444-5555-666666666666', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NOW(), NOW());

-- =============================================
-- SUBMISSIONS TABLE - Bảng nộp bài
-- =============================================
INSERT INTO `submissions` (`id`, `topic_id`, `commit_hash`, `evaluation`, `submitted_at`, `created_at`, `updated_at`) VALUES
('sub001-1111-2222-3333-444444444444', 'topic01-1111-2222-3333-444444444444', 'a1b2c3d4e5f6789012345678901234567890abcd', 'Hoàn thành milestone 1: Authentication và User Management', '2024-03-15 10:30:00', NOW(), NOW()),
('sub002-2222-3333-4444-555555555555', 'topic01-1111-2222-3333-444444444444', 'b2c3d4e5f6789012345678901234567890abcdef', 'Hoàn thành milestone 2: Product Catalog và Shopping Cart', '2024-04-10 14:20:00', NOW(), NOW()),
('sub003-3333-4444-5555-666666666666', 'topic03-3333-4444-5555-666666666666', 'c3d4e5f6789012345678901234567890abcdefgh', 'Hoàn thành training model NLP cho chatbot', '2024-04-20 16:45:00', NOW(), NOW());

-- =============================================
-- POSTS TABLE - Bảng bài viết
-- =============================================
INSERT INTO `posts` (`id`, `title`, `content`, `author_id`, `thumbnail`, `status`, `created_at`, `updated_at`) VALUES
('post001-1111-2222-3333-444444444444', 'Hướng dẫn setup React.js cho người mới bắt đầu', '<h2>Giới thiệu về React.js</h2><p>React.js là một thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng...</p><h3>Cài đặt môi trường</h3><p>Đầu tiên, bạn cần cài đặt Node.js và npm...</p>', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', '/public/images/react-tutorial.jpg', 1, NOW(), NOW()),
('post002-2222-3333-4444-555555555555', 'Best practices khi thiết kế database', '<h2>Nguyên tắc thiết kế CSDL</h2><p>Việc thiết kế cơ sở dữ liệu tốt là nền tảng quan trọng...</p><h3>Normalization</h3><p>Chuẩn hóa dữ liệu giúp giảm redundancy...</p>', 'e5f6g7h8-i9j0-1234-5678-901234efghij', '/public/images/database-design.jpg', 1, NOW(), NOW()),
('post003-3333-4444-5555-666666666666', 'Chia sẻ kinh nghiệm làm đồ án tốt nghiệp', '<h2>Lựa chọn chủ đề</h2><p>Việc chọn đúng chủ đề đồ án rất quan trọng...</p><h3>Quy trình thực hiện</h3><p>Chia nhỏ công việc thành các milestone...</p>', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', '/public/images/thesis-tips.jpg', 1, NOW(), NOW());

-- =============================================
-- POST_TAGS TABLE - Bảng quan hệ bài viết và tag
-- =============================================
INSERT INTO `post_tags` (`post_id`, `tag_id`, `created_at`, `updated_at`) VALUES
('post001-1111-2222-3333-444444444444', 'tag001-1111-2222-3333-444444444444', NOW(), NOW()),
('post001-1111-2222-3333-444444444444', 'tag002-2222-3333-4444-555555555555', NOW(), NOW()),
('post002-2222-3333-4444-555555555555', 'tag004-4444-5555-6666-777777777777', NOW(), NOW()),
('post003-3333-4444-5555-666666666666', 'tag006-6666-7777-8888-999999999999', NOW(), NOW());

-- =============================================
-- POST_LIKES TABLE - Bảng like bài viết
-- =============================================
INSERT INTO `post_likes` (`post_id`, `user_id`, `created_at`, `updated_at`) VALUES
('post001-1111-2222-3333-444444444444', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NOW(), NOW()),
('post001-1111-2222-3333-444444444444', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NOW(), NOW()),
('post002-2222-3333-4444-555555555555', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NOW(), NOW()),
('post003-3333-4444-5555-666666666666', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NOW(), NOW());

-- =============================================
-- COMMENTS TABLE - Bảng bình luận
-- =============================================
INSERT INTO `comments` (`id`, `parent_id`, `author_id`, `submission_id`, `post_id`, `course_id`, `content`, `status`, `created_at`, `updated_at`) VALUES
('comm01-1111-2222-3333-444444444444', NULL, 'd4e5f6g7-h8i9-0123-4567-890123defghi', NULL, 'post001-1111-2222-3333-444444444444', NULL, 'Bài viết rất hữu ích! Cảm ơn thầy đã chia sẻ.', 1, NOW(), NOW()),
('comm02-2222-3333-4444-555555555555', 'comm01-1111-2222-3333-444444444444', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', NULL, 'post001-1111-2222-3333-444444444444', NULL, 'Rất vui khi bài viết giúp ích được các em!', 1, NOW(), NOW()),
('comm03-3333-4444-5555-666666666666', NULL, 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', NULL, 'post002-2222-3333-4444-555555555555', NULL, 'Thầy có thể giải thích thêm về indexing không ạ?', 1, NOW(), NOW()),
('comm04-4444-5555-6666-777777777777', NULL, 'd4e5f6g7-h8i9-0123-4567-890123defghi', 'sub001-1111-2222-3333-444444444444', NULL, 'course01-1111-2222-3333-444444444444', 'Code của em chạy tốt, tuy nhiên cần optimize thêm phần authentication.', 1, NOW(), NOW());

-- =============================================
-- NOTIFICATIONS TABLE - Bảng thông báo
-- =============================================
INSERT INTO `notifications` (`id`, `title`, `message`, `user_id`, `author_id`, `topic_id`, `course_id`, `post_id`, `repos_id`, `link`, `type`, `is_read`, `created_at`, `updated_at`) VALUES
('notif01-1111-2222-3333-444444444444', 'Chủ đề đã được phê duyệt', 'Chủ đề "Xây dựng website bán hàng online" của bạn đã được giảng viên phê duyệt.', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'topic01-1111-2222-3333-444444444444', 'course01-1111-2222-3333-444444444444', NULL, NULL, '/topics/topic01-1111-2222-3333-444444444444', 'APPROVE_TOPIC', 1, NOW(), NOW()),
('notif02-2222-3333-4444-555555555555', 'Bình luận mới trên bài viết', 'Có bình luận mới trên bài viết "Hướng dẫn setup React.js" của bạn.', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NULL, NULL, 'post001-1111-2222-3333-444444444444', NULL, '/posts/post001-1111-2222-3333-444444444444', 'COMMENT', 0, NOW(), NOW()),
('notif03-3333-4444-5555-666666666666', 'Đánh giá chủ đề mới', 'Chủ đề của bạn đã được đánh giá với điểm số 8.5/10.', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'topic01-1111-2222-3333-444444444444', 'course01-1111-2222-3333-444444444444', NULL, NULL, '/topics/topic01-1111-2222-3333-444444444444/evaluations', 'TOPIC_EVALUATION', 0, NOW(), NOW()),
('notif04-4444-5555-6666-777777777777', 'Có sinh viên đăng ký khóa học', 'Sinh viên Lê Thị Linh đã đăng ký khóa học "Lập trình Web với React.js".', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'd4e5f6g7-h8i9-0123-4567-890123defghi', NULL, 'course01-1111-2222-3333-444444444444', NULL, NULL, '/courses/course01-1111-2222-3333-444444444444/students', 'JOIN_COURSE', 0, NOW(), NOW());

-- =============================================
-- USER_SETTINGS TABLE - Bảng cài đặt người dùng
-- =============================================
INSERT INTO `user_settings` (`id`, `user_id`, `language`, `theme`, `email_notifications`, `push_notifications`, `privacy`, `created_at`, `updated_at`) VALUES
('us001-1111-2222-3333-444444444444', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'vi', 'dark', 1, 1, 'public', NOW(), NOW()),
('us002-2222-3333-4444-555555555555', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'vi', 'light', 1, 0, 'public', NOW(), NOW()),
('us003-3333-4444-5555-666666666666', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'vi', 'dark', 1, 1, 'private', NOW(), NOW()),
('us004-4444-5555-6666-777777777777', 'd4e5f6g7-h8i9-0123-4567-890123defghi', 'en', 'light', 0, 1, 'public', NOW(), NOW());

-- =============================================
-- SYSTEM_SETTINGS TABLE - Bảng cài đặt hệ thống
-- =============================================
INSERT INTO `system_settings` (`id`, `key`, `value`, `description`, `type`, `created_at`, `updated_at`) VALUES
('sys001-1111-2222-3333-444444444444', 'maintenance_mode', 'false', 'Chế độ bảo trì hệ thống', 'boolean', NOW(), NOW()),
('sys002-2222-3333-4444-555555555555', 'max_file_upload_size', '10485760', 'Kích thước file upload tối đa (bytes)', 'integer', NOW(), NOW()),
('sys003-3333-4444-5555-666666666666', 'default_course_duration', '120', 'Thời gian mặc định của khóa học (ngày)', 'integer', NOW(), NOW()),
('sys004-4444-5555-6666-777777777777', 'email_verification_required', 'true', 'Yêu cầu xác thực email khi đăng ký', 'boolean', NOW(), NOW());

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- END OF SAMPLE DATA
-- ============================================= 