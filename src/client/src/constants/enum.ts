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
  ALERT_STATUS = 'alert_status',
  BUGS = 'bugs',
  VULNERABILITIES = 'vulnerabilities',
  CODE_SMELLS = 'code_smells',
  SQALE_INDEX = 'sqale_index',
  SQALE_RATING = 'sqale_rating',
  RELIABILITY_RATING = 'reliability_rating',
  SECURITY_RATING = 'security_rating',
  SECURITY_HOTSPOTS = 'security_hotspots',
  SECURITY_REVIEW_RATING = 'security_review_rating',
  COVERAGE = 'coverage',
  LINE_COVERAGE = 'line_coverage',
  UNCOVERED_LINES = 'uncovered_lines',
  LINES_TO_COVER = 'lines_to_cover',
  DUPLICATED_LINES_DENSITY = 'duplicated_lines_density',
  DUPLICATED_BLOCKS = 'duplicated_blocks',
  DUPLICATED_LINES = 'duplicated_lines',
  COMPLEXITY = 'complexity',
  COGNITIVE_COMPLEXITY = 'cognitive_complexity',
  NCLoc = 'ncloc',
  FILES = 'files',
  FUNCTIONS = 'functions',
  CLASSES = 'classes',
}