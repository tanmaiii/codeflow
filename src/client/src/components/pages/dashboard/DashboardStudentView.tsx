'use client';
import { Button } from '@/components/ui/button';
import { 
  IconBook, 
  IconClock, 
  IconTrendingUp, 
  IconTarget,
  IconArrowRight,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { paths } from '@/data/path';
import { useQuery } from '@tanstack/react-query';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import { ICourse } from '@/interfaces/course';
import { StatCard, CourseCard, QuickActions, RecentActivity, EmptyState } from './components';
import { DashboardFullSkeleton } from '@/components/skeletons';
import { useTranslations } from 'next-intl';

interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  completedTopics: number;
  upcomingDeadlines: number;
}

export default function DashboardStudentView() {
  const router = useRouter();
  const { user } = useUserStore();
  const t = useTranslations('dashboard');

  // Fetch enrolled courses
  const { data: enrolledCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: () => courseService.getAllRegistered({ page: 1, limit: 6 }),
    enabled: !!user,
  });

  // Mock statistics - in real app, this would come from API
  const stats: DashboardStats = {
    totalCourses: enrolledCourses?.data?.length || 0,
    activeCourses: enrolledCourses?.data?.filter((course: ICourse) => {
      const currentDate = new Date();
      const startDate = new Date(course.startDate);
      const endDate = new Date(course.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    }).length || 0,
    completedTopics: 0, // Would need topics API
    upcomingDeadlines: 0, // Would need deadlines API
  };

  if (coursesLoading) {
    return <DashboardFullSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalCourses')}
          value={stats.totalCourses}
          icon={IconBook}
          description={t('enrolled')}
          color="default"
          progress={75}
        />
        <StatCard
          title={t('activeCourses')}
          value={stats.activeCourses}
          icon={IconTrendingUp}
          description={t('currentCourses')}
          color="success"
          progress={85}
        />
        <StatCard
          title={t('completedTopics')}
          value={stats.completedTopics}
          icon={IconTarget}
          description={t('thisTermCompleted')}
          color="success"
          progress={60}
        />
        <StatCard
          title={t('upcomingDeadlines')}
          value={stats.upcomingDeadlines}
          icon={IconClock}
          description={t('next7Days')}
          color="warning"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions variant="student" />

      {/* Enrolled Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{t('enrolledCourses')}</h3>
            <p className="text-muted-foreground">{t('continueJourney')}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push(paths.COURSES)}
            className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
          >
            {t('viewAll')}
            <IconArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {enrolledCourses?.data && enrolledCourses.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.data.slice(0, 6).map((course: ICourse) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                variant="student"
                gradientColor="from-blue-500 to-indigo-500"
              />
            ))}
          </div>
        ) : (
          <EmptyState variant="student" />
        )}
      </div>

      {/* Recent Activity */}
      <RecentActivity variant="student" />
    </div>
  );
}
