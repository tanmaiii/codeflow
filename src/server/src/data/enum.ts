export enum ENUM_TOPIC_STATUS {
  PENDING = 'pending', // Trạng thái chờ duyệt
  APPROVED = 'approved', // Trạng thái đã duyệt
  REJECTED = 'rejected', // Trạng thái bị từ chối
}

export enum ENUM_USER_ROLE {
  ADMIN = 'admin', // Quản trị viên
  USER = 'user', // Người dùng bình thường
  TEACHER = 'teacher', // Giảng viên
}

export enum ENUM_USER_STATUS {
  ACTIVE = 'active', // Hoạt động
  INACTIVE = 'inactive', // Không hoạt động
  SUSPENDED = 'suspended', // Tạm ngưng
}

export enum ENUM_TYPE_NOTIFICATION {
  TOPIC_EVALUATION = 'TOPIC_EVALUATION', // Đánh giá chủ đề
  COMMENT = 'COMMENT', // Bình luận
  COMMENT_REPLY = 'COMMENT_REPLY', // Bình luận trả lời
  LIKE_POST = 'LIKE_POST', // Thích bài viết
  JOIN_COURSE = 'JOIN_COURSE', // Tham gia khóa học
  REGISTER_TOPIC = 'REGISTER_TOPIC', // Đăng ký chủ đề
  APPROVE_TOPIC = 'APPROVE_TOPIC', // Phê duyệt chủ đề
  REJECT_TOPIC = 'REJECT_TOPIC', // Từ chối chủ đề
  SYSTEM = 'SYSTEM', // Hệ thống
}

export enum ENUM_TYPE_COURSE {
  MAJOR = 'major', // Chuyên ngành
  FOUNDATION = 'foundation', // Cơ sở ngành
  ELECTIVE = 'elective', // Môn học
  THESIS = 'thesis', // Khóa luận
}

export enum ENUM_TYPE_SYSTEM_SETTINGS {
  GEMINI_TOKEN = 'gemini_token', // Gemini
}

export enum ENUM_LANGUAGE {
  PHP = 'Php', // PHP
  HTML = 'Html', // HTML
  PYTHON = 'Python', // Python
  JAVA = 'Java', // Java
  DOTNET = 'Dotnet', // .NET
  NODEJS = 'Nodejs', // NodeJS
  JAVASCRIPT = 'Javascript', // JavaScript
  TYPESCRIPT = 'Typescript', // TypeScript
  C = 'C', // C
  CPP = 'Cpp', // C++
  SQL = 'Sql', // SQL
  CSHARP = 'Csharp', // C#
}