'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  IconBook, 
  IconUsers, 
  IconTarget,
  IconTrendingUp,
  IconPlus,
  IconCalendar,
  IconChalkboard,
  IconClock,
  IconCheckbox
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { paths } from "@/data/path";
import { useQuery } from "@tanstack/react-query";
import courseService from "@/services/course.service";
import { useUserStore } from "@/stores/user_store";
import { ICourse } from "@/interfaces/course";

interface TeacherDashboardStats {
  totalCourses: number;
  totalStudents: number;
  pendingTopics: number;
  activeCourses: number;
}

export default function DashboardTeacherView() {
  const router = useRouter();
  const { user } = useUserStore();

  // Fetch teacher's courses
  const { data: teacherCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ['teacher-courses', user?.id],
    queryFn: () => courseService.getAllByUser(user?.id || '', { page: 1, limit: 6 }),
    enabled: !!user?.id,
  });

  // Calculate statistics
  const stats: TeacherDashboardStats = {
    totalCourses: teacherCourses?.data?.length || 0,
    totalStudents: teacherCourses?.data?.reduce((sum: number, course: ICourse & {enrollmentCount?: number}) => 
      sum + (course.enrollmentCount || 0), 0) || 0,
    pendingTopics: 0, // Would need topics API
    activeCourses: teacherCourses?.data?.filter((course: ICourse) => course.status).length || 0,
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    description, 
    color = "default",
    onClick
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    description: string;
    color?: "default" | "success" | "warning" | "danger";
    onClick?: () => void;
  }) => (
    <Card 
      className={`p-4 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Icon className={`w-8 h-8 ${
          color === "success" ? "text-green-600" :
          color === "warning" ? "text-yellow-600" :
          color === "danger" ? "text-red-600" :
          "text-blue-600"
        }`} />
      </div>
    </Card>
  );

  const CourseCard = ({ course }: { course: ICourse }) => (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(paths.COURSES_DETAIL(course.id))}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm line-clamp-2">{course.title}</h4>
          <Badge variant={course.status ? "default" : "secondary"} className="text-xs">
            {course.status ? "Hoạt động" : "Tạm dừng"}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <IconUsers className="w-3 h-3" />
            <span>{(course as ICourse & {enrollmentCount?: number}).enrollmentCount || 0} sinh viên</span>
          </div>
          
          <div className="flex items-center gap-1">
            <IconTarget className="w-3 h-3" />
            <span>{(course as ICourse & {topicCount?: number}).topicCount || 0} đề tài</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              router.push(paths.COURSE_TOPICS(course.id));
            }}
          >
            <IconChalkboard className="w-3 h-3 mr-1" />
            Đề tài
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              router.push(paths.COURSE_MEMBER(course.id));
            }}
          >
            <IconUsers className="w-3 h-3 mr-1" />
            Thành viên
          </Button>
        </div>
      </div>
    </Card>
  );

  if (coursesLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-20 w-full" />
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-40 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Chào mừng giảng viên {user?.name}!</h2>
          <p className="text-muted-foreground">
            Quản lý khóa học và theo dõi tiến độ sinh viên
          </p>
        </div>
        <Button onClick={() => router.push(paths.COURSE_CREATE)} className="gap-2">
          <IconPlus className="w-4 h-4" />
          Tạo khóa học mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Khóa học"
          value={stats.totalCourses}
          icon={IconBook}
          description="Đã tạo"
          color="default"
          onClick={() => router.push(paths.COURSES)}
        />
        <StatCard
          title="Sinh viên"
          value={stats.totalStudents}
          icon={IconUsers}
          description="Tổng đăng ký"
          color="success"
        />
        <StatCard
          title="Đề tài chờ duyệt"
          value={stats.pendingTopics}
          icon={IconClock}
          description="Cần xem xét"
          color="warning"
          onClick={() => router.push(paths.TOPICS)}
        />
        <StatCard
          title="Khóa học hoạt động"
          value={stats.activeCourses}
          icon={IconTrendingUp}
          description="Đang diễn ra"
          color="success"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push(paths.COURSE_CREATE)}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <IconPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Tạo khóa học</h3>
              <p className="text-sm text-muted-foreground">Thêm khóa học mới</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push(paths.TOPICS)}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <IconCheckbox className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Duyệt đề tài</h3>
              <p className="text-sm text-muted-foreground">Xem xét đề tài sinh viên</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push(paths.NOTIFICATION)}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <IconCalendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium">Thông báo</h3>
              <p className="text-sm text-muted-foreground">Xem thông báo mới</p>
            </div>
          </div>
        </Card>
      </div>

      {/* My Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Khóa học của tôi</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(paths.COURSES)}
          >
            Xem tất cả
          </Button>
        </div>

        {teacherCourses?.data && teacherCourses.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherCourses.data.slice(0, 6).map((course: ICourse) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <IconBook className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">Chưa có khóa học nào</h4>
            <p className="text-muted-foreground mb-4">
              Bắt đầu bằng cách tạo khóa học đầu tiên của bạn
            </p>
            <Button onClick={() => router.push(paths.COURSE_CREATE)}>
              <IconPlus className="w-4 h-4 mr-2" />
              Tạo khóa học
            </Button>
          </Card>
        )}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hoạt động gần đây</h3>
        <Card className="p-6">
          <div className="text-center text-muted-foreground">
            <IconCalendar className="w-12 h-12 mx-auto mb-4" />
            <p>Chưa có hoạt động nào gần đây</p>
            <p className="text-sm">Hoạt động giảng dạy của bạn sẽ được hiển thị ở đây</p>
          </div>
        </Card>
      </div>
    </div>
  );
} 