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
