# Hướng dẫn sử dụng dữ liệu mẫu

## Tổng quan
File `sample_data.sql` chứa dữ liệu mẫu cho tất cả các bảng trong hệ thống CodeFlow. Mỗi bảng có ít nhất 3-5 dòng dữ liệu với mối quan hệ logic và có ý nghĩa.

## Cấu trúc dữ liệu mẫu

### 1. Users (Người dùng)
- **Admin**: `admin@codeflow.com` (Quản trị viên hệ thống)
- **Teachers**: 2 giảng viên (Nguyễn Thị Lan, Phạm Văn Đức)
- **Students**: 2 sinh viên (Trần Văn Minh, Lê Thị Linh)

### 2. Tags (Thẻ)
- JavaScript, React, Node.js
- Database, Machine Learning, Web Development

### 3. Courses (Khóa học)
- **Lập trình Web với React.js** (major)
- **Cơ sở dữ liệu nâng cao** (foundation)
- **Trí tuệ nhân tạo cơ bản** (elective)

### 4. Topics (Chủ đề đồ án)
- **Website bán hàng online** (approved)
- **Hệ thống quản lý thư viện** (pending)
- **Chatbot AI hỗ trợ học tập** (approved)

### 5. Posts (Bài viết)
- Hướng dẫn setup React.js
- Best practices thiết kế database
- Chia sẻ kinh nghiệm làm đồ án

### 6. Các bảng khác
- Course enrollments (Đăng ký khóa học)
- Topic members (Thành viên nhóm)
- Topic evaluations (Đánh giá chủ đề)
- Repositories (Kho code)
- Submissions (Nộp bài)
- Comments (Bình luận)
- Notifications (Thông báo)
- User settings (Cài đặt người dùng)
- System settings (Cài đặt hệ thống)

## Cách sử dụng

### 1. Import dữ liệu vào database
```bash
# Đảm bảo database đã được tạo
mysql -u your_username -p your_database_name < sample_data.sql
```

### 2. Chạy với MySQL Workbench
- Mở file `sample_data.sql`
- Chọn database target
- Execute script

### 3. Với Node.js/Sequelize
```javascript
// Có thể sử dụng raw query để import
await sequelize.query(fs.readFileSync('./sample_data.sql', 'utf8'));
```

## Lưu ý quan trọng

### Foreign Key Constraints
- Script tự động disable/enable foreign key checks
- Đảm bảo thứ tự import đúng dependencies

### UUID Format
- Tất cả ID sử dụng format UUID hợp lệ
- Đảm bảo tính nhất quán trong relationships

### Timestamps
- Sử dụng `NOW()` function cho createdAt/updatedAt
- Tương thích với múi giờ server

### Dữ liệu có logic
- Sinh viên đăng ký khóa học trước khi tham gia topic
- Teachers được assign cho courses phù hợp
- Comments và notifications liên kết đúng entities

## Test data accounts

### Admin
- Email: `admin@codeflow.com`
- Username: `admin_user`
- Role: `admin`

### Teacher 1
- Email: `teacher1@university.edu`
- Username: `teacher_nguyen`
- Role: `teacher`

### Student 1
- Email: `student1@student.edu`
- Username: `student_minh`
- Role: `user`

## Customization

Bạn có thể:
1. Thay đổi số lượng records cho mỗi bảng
2. Tùy chỉnh nội dung phù hợp với context dự án
3. Thêm/bớt fields theo model changes
4. Cập nhật relationships khi schema thay đổi

## Troubleshooting

### Lỗi Foreign Key
```sql
-- Kiểm tra foreign key constraints
SHOW CREATE TABLE table_name;

-- Disable tạm thời nếu cần
SET FOREIGN_KEY_CHECKS = 0;
-- ... import data ...
SET FOREIGN_KEY_CHECKS = 1;
```

### Lỗi Duplicate Entry
```sql
-- Xóa dữ liệu cũ trước khi import
TRUNCATE TABLE table_name;
-- Hoặc xóa selective
DELETE FROM table_name WHERE condition;
```

### Character Encoding
Đảm bảo file SQL được lưu với UTF-8 encoding để support tiếng Việt. 