import StatCard from '@/components/common/StatCard';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ICourse } from '@/interfaces/course';
import { Award, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CourseStatsCards({ course }: { course: ICourse }) {
  const t = useTranslations('courseDashboard.stats');

  const { data: members } = useQ_Course_GetMembers({
    id: course?.id ?? '',
    params: { page: 1, limit: -1 },
  });

  const { data: topics } = useQ_Topic_GetAllByCourseId({
    params: {
      page: 1,
      limit: 0,
      courseId: course?.id ?? '',
    },
  });

  if (!course) return null;

  const getProgessCourse = (deadline: string, startDate: string) => {
    if (!deadline || !startDate) return 0;
    return Math.round(
      ((new Date().getTime() - new Date(startDate).getTime()) /
        (new Date(course.topicDeadline).getTime() - new Date(course.regStartDate).getTime())) *
        100,
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title={t('totalStudents')}
        value={members?.pagination?.totalItems ?? 0}
        icon={Users}
        description={t('enrolledDescription')}
        color="default"
      />
      <StatCard
        title={t('activeStudents')}
        value={members?.data?.filter(item => item.topicMembers.length > 0).length ?? 0}
        icon={GraduationCap}
        description={t('activeDescription')}
        color="success"
        progress={
          members?.data && members?.pagination?.totalItems 
            ? (members.data.filter(item => item.topicMembers.length > 0).length / members.pagination.totalItems) * 100
            : 0
        }
      />
      <StatCard
        title={t('completionProgress')}
        value={`${getProgessCourse(course.topicDeadline, course.regStartDate)}%`}
        icon={TrendingUp}
        description={t('progressDescription')}
        color="warning"
        progress={getProgessCourse(course.topicDeadline, course.regStartDate)}
      />
      <StatCard
        title={t('totalTopics')}
        value={topics?.pagination?.totalItems ?? 0}
        icon={Award}
        description={t('topicsDescription')}
        color="success"
      />
    </div>
  );
}
