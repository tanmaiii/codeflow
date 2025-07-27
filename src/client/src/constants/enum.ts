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

export enum ENUM_LANGUAGE {
  JAVASCRIPT_TYPESCRIPT = 'Javascript/Typescript', // JavaScript/TypeScript
  PYTHON = 'Python', // Python
  JAVA = 'Java', // Java
  DOTNET = 'Dotnet', // .NET
  STATIC = 'Static', // Static
}

export enum ENUM_FRAMEWORK {
  REACT = 'React', // React
  EXPRESS = 'Express', // Express
  NEXTJS = 'Nextjs', // Nextjs
  NESTJS = 'Nestjs', // Nestjs
  NODEJS = 'Nodejs', // Nodejs
  DJANGO = 'Django', // Django
  FLASK = 'Flask', // Flask
  SPRING_BOOT = 'Spring Boot', // Spring Boot
  ASP_NET = 'ASP.NET', // ASP.NET
  HTML = 'HTML', // HTML
}

export enum ENUM_METRICS_CODE_ANALYSIS {
  SECURITY_HOTSPOTS = 'security_hotspots', // Điểm nóng bảo mật
  BUGS = 'bugs', // Lỗi
  RELIABILITY_RATING = 'reliability_rating', // Độ tin cậy
  CODE_SMELLS = 'code_smells', // Mùi code
  DUPLICATED_LINES = 'duplicated_lines', // Dòng code lặp lại
  COVERAGE = 'coverage', // Phần trăm code được test
  DUPLICATED_LINES_DENSITY = 'duplicated_lines_density', // Mật độ dòng lặp lại
  ALERT_STATUS = 'alert_status', // Trạng thái cảnh báo
  SECURITY_HOTSPOTS_REVIEWED = 'security_hotspots_reviewed', // Điểm nóng bảo mật đã xem xét
  SECURITY_RATING = 'security_rating', // Đánh giá bảo mật
  VULNERABILITIES = 'vulnerabilities', // Lỗi bảo mật
  SQALE_INDEX = 'sqale_index', // Chỉ số SQALE
  SQALE_RATING = 'sqale_rating', // Đánh giá SQALE
  SECURITY_REVIEW_RATING = 'security_review_rating', // Đánh giá bảo mật đã xem xét
  LINE_COVERAGE = 'line_coverage', // Phần trăm dòng code được test
  UNCOVERED_LINES = 'uncovered_lines', // Dòng code không được test
  LINES_TO_COVER = 'lines_to_cover', // Dòng code cần test
  DUPLICATED_BLOCKS = 'duplicated_blocks', // Khối code lặp lại
  COMPLEXITY = 'complexity', // Độ phức tạp
  COGNITIVE_COMPLEXITY = 'cognitive_complexity', // Độ phức tạp trí tuệ
  NCLoc = 'ncloc', // Số dòng code
  FILES = 'files', // Số file
  FUNCTIONS = 'functions', // Số hàm
  CLASSES = 'classes', // Số lớp
}
