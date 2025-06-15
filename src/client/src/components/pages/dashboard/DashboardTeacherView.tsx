'use client';
import { DashboardFullSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import { paths } from '@/data/path';
import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import {
  IconArrowRight,
  IconBook,
  IconClock,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CourseCard, EmptyState, QuickActions, RecentActivity, StatCard, TeachingAnalytics } from './components';

interface TeacherDashboardStats {
  totalCourses: number;
  totalStudents: number;
  pendingTopics: number;
  activeCourses: number;
}

export default function DashboardTeacherView() {
  const router = useRouter();
  const { user } = useUserStore();
  const t = useTranslations('dashboard');

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

  if (coursesLoading) {
    return <DashboardFullSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('courses')}
          value={stats.totalCourses}
          icon={IconBook}
          description={t('created')}
          color="default"
          onClick={() => router.push(paths.COURSES)}
          progress={80}
        />
        <StatCard
          title={t('students')}
          value={stats.totalStudents}
          icon={IconUsers}
          description={t('totalRegistrations')}
          color="success"
          progress={65}
        />
        <StatCard
          title={t('pendingTopics')}
          value={stats.pendingTopics}
          icon={IconClock}
          description={t('needReview')}
          color="warning"
        />
        <StatCard
          title={t('activeCoursesFull')}
          value={stats.activeCourses}
          icon={IconTrendingUp}
          description={t('inProgress')}
          color="success"
          progress={90}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions variant="teacher" />

      {/* Teacher's Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{t('myCourses')}</h3>
            <p className="text-muted-foreground">{t('manageTrackCourses')}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push(paths.COURSES)}
            className="hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
          >
            {t('viewAll')}
            <IconArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {teacherCourses?.data && teacherCourses.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherCourses.data.slice(0, 6).map((course: ICourse) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                variant="teacher"
                gradientColor="from-indigo-500 to-purple-500"
              />
            ))}
          </div>
        ) : (
          <EmptyState variant="teacher" />
        )}
      </div>

      {/* Teaching Analytics */}
      <TeachingAnalytics 
        stats={{
          totalStudents: stats.totalStudents,
          activeCourses: stats.activeCourses,
          pendingTopics: stats.pendingTopics,
        }}
      />

      {/* Recent Activity */}
      <RecentActivity variant="teacher" />
    </div>
  );
} 