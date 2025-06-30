export enum ENUM_STATUS_TOPIC {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ENUM_STATUS_COURSE {
  PENDING = 'pending', // chưa bắt đầu
  COMPLETED = 'completed', // đã bắt đầu
}

export enum ENUM_TYPE_COURSE {
  MAJOR = 'major',
  FOUNDATION = 'foundation',
  THESIS = 'thesis',
  ELECTIVE = 'elective',
}

export enum ROLE {
  USER = 'user',
  TEACHER = 'teacher',
  ADMIN = 'admin',
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

export enum ENUM_TYPE_REPOS {
  MAJOR = 'major',
  FOUNDATION = 'foundation',
  THESIS = 'thesis',
  ELECTIVE = 'elective',
}

export enum ENUM_TYPE_SYSTEM_SETTINGS {
  GEMINI_TOKEN = 'gemini_token', // Gemini
}