'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  IconBook, 
  IconClock, 
  IconTrendingUp, 
  IconUsers,
  IconTarget,
  IconCalendar,
  IconPlus
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { paths } from "@/data/path";
import { useQuery } from "@tanstack/react-query";
import courseService from "@/services/course.service";
import { useUserStore } from "@/stores/user_store";
import { ICourse } from "@/interfaces/course";

interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  completedTopics: number;
  upcomingDeadlines: number;
}

export default function DashboardStudentView() {
  const router = useRouter();
  const { user } = useUserStore();

  // Fetch enrolled courses
  const { data: enrolledCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: () => courseService.getAllRegistered({ page: 1, limit: 6 }),
    enabled: !!user,
  });

  // Mock statistics - in real app, this would come from API
  const stats: DashboardStats = {
    totalCourses: enrolledCourses?.data?.length || 0,
    activeCourses: enrolledCourses?.data?.filter((course: ICourse) => course.status).length || 0,
    completedTopics: 0, // Would need topics API
    upcomingDeadlines: 0, // Would need deadlines API
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    description, 
    color = "default" 
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    description: string;
    color?: "default" | "success" | "warning" | "danger";
  }) => (
    <Card className="p-4">
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
            {course.status ? "Đang học" : "Tạm dừng"}
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
              <Skeleton className="h-32 w-full" />
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
          <h2 className="text-2xl font-bold">Chào mừng trở lại, {user?.name}!</h2>
          <p className="text-muted-foreground">
            Đây là tổng quan về tiến trình học tập của bạn
          </p>
        </div>
        <Button onClick={() => router.push(paths.COURSES)} className="gap-2">
          <IconPlus className="w-4 h-4" />
          Tham gia khóa học
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tổng khóa học"
          value={stats.totalCourses}
          icon={IconBook}
          description="Đã đăng ký"
          color="default"
        />
        <StatCard
          title="Đang học"
          value={stats.activeCourses}
          icon={IconTrendingUp}
          description="Khóa học hiện tại"
          color="success"
        />
        <StatCard
          title="Đề tài hoàn thành"
          value={stats.completedTopics}
          icon={IconTarget}
          description="Trong học kỳ này"
          color="success"
        />
        <StatCard
          title="Deadline sắp tới"
          value={stats.upcomingDeadlines}
          icon={IconClock}
          description="Trong 7 ngày tới"
          color="warning"
        />
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Khóa học đã đăng ký</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(paths.COURSES)}
          >
            Xem tất cả
          </Button>
        </div>

        {enrolledCourses?.data && enrolledCourses.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.data.slice(0, 6).map((course: ICourse) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <IconBook className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">Chưa có khóa học nào</h4>
            <p className="text-muted-foreground mb-4">
              Bắt đầu hành trình học tập bằng cách tham gia một khóa học
            </p>
            <Button onClick={() => router.push(paths.COURSES)}>
              Khám phá khóa học
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
            <p className="text-sm">Hoạt động của bạn sẽ được hiển thị ở đây</p>
          </div>
        </Card>
      </div>
    </div>
  );
} 