# Dashboard Components

Thư mục này chứa các component con được tách ra từ Dashboard để dễ quản lý và tái sử dụng.

## Cấu trúc Components

### 📊 StatCard
Component hiển thị thống kê với icon và progress bar.

**Props:**
- `title`: Tiêu đề thống kê
- `value`: Giá trị số
- `icon`: Icon component từ Tabler Icons
- `description`: Mô tả ngắn
- `color`: Màu theme ('default' | 'success' | 'warning' | 'danger')
- `onClick`: Callback khi click (optional)
- `progress`: Giá trị progress bar (optional)

### 📚 CourseCard
Component hiển thị thông tin khóa học với các variant khác nhau.

**Props:**
- `course`: Object khóa học (ICourse)
- `variant`: Loại hiển thị ('student' | 'teacher')
- `gradientColor`: Màu gradient cho border top

**Features:**
- Student variant: Hiển thị trạng thái "Đang học"
- Teacher variant: Hiển thị trạng thái "Hoạt động" + buttons quản lý

### ⚡ QuickActions
Component các hành động nhanh, khác nhau cho student và teacher.

**Props:**
- `variant`: Loại người dùng ('student' | 'teacher')

**Student Actions:**
- Tham gia khóa học mới

**Teacher Actions:**
- Tạo khóa học mới
- Quản lý đề tài

### 📈 TeachingAnalytics
Component thống kê giảng dạy (chỉ dành cho teacher).

**Props:**
- `stats`: Object chứa thống kê
  - `totalStudents`: Tổng số sinh viên
  - `activeCourses`: Số khóa học hoạt động
  - `pendingTopics`: Số đề tài chờ duyệt

### 🎯 EmptyState
Component hiển thị khi không có dữ liệu.

**Props:**
- `variant`: Loại người dùng ('student' | 'teacher')

**Features:**
- Student: Khuyến khích tham gia khóa học
- Teacher: Khuyến khích tạo khóa học

### 📅 RecentActivity
Component hiển thị hoạt động gần đây.

**Props:**
- `variant`: Loại người dùng ('student' | 'teacher')

**Features:**
- Màu sắc và nội dung khác nhau theo variant
- Timeline style với dots và timestamps

## Cách sử dụng

```tsx
import { 
  StatCard, 
  CourseCard, 
  QuickActions, 
  RecentActivity, 
  EmptyState, 
  TeachingAnalytics 
} from './components';

// Sử dụng StatCard
<StatCard
  title="Tổng khóa học"
  value={10}
  icon={IconBook}
  description="Đã đăng ký"
  color="default"
  progress={75}
/>

// Sử dụng CourseCard
<CourseCard 
  course={courseData}
  variant="student"
  gradientColor="from-blue-500 to-indigo-500"
/>

// Sử dụng QuickActions
<QuickActions variant="student" />
```

## Lợi ích

✅ **Tái sử dụng**: Components có thể dùng cho cả student và teacher
✅ **Dễ bảo trì**: Mỗi component có trách nhiệm riêng biệt
✅ **Consistent**: Styling và behavior nhất quán
✅ **Flexible**: Props cho phép customize theo nhu cầu
✅ **Type Safe**: TypeScript interfaces đầy đủ 