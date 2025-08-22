'use client';

import TitleHeader from '@/components/layout/TitleHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { TextDescription } from '@/components/ui/text';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import ActiveStudentsList from './components/ActiveStudentsList';
import BestTopicsList from './components/BestTopicsList';
import ChartComplexity from './components/ChartComplexity';
import LanguageChart from './components/LanguageChart';
import CodeActivityChart from './components/StudentProgressChart';
import TopicApprovalChart from './components/TopicApprovalChart';
import CourseStatsCards from './CourseStatsCards';

export default function CourseDashboard() {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations('courseDashboard');

  const { data: dataCourse, isLoading, isError } = useQ_Course_GetDetail({ id: id });

  if (isLoading) return <Skeleton className="w-full h-[90vh]" />;
  if (isError) return <div>Error</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <TitleHeader title={t('title')} onBack />
          <TextDescription>
            {t('description')} {dataCourse?.data?.title}
          </TextDescription>
        </div>
      </div>

      {/* Stats Cards */}
      {dataCourse?.data && <CourseStatsCards course={dataCourse.data} />}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeActivityChart courseId={id} />
        <TopicApprovalChart courseId={id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LanguageChart courseId={id} />
        <ChartComplexity courseId={id} />
      </div>

      <BestTopicsList courseId={id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActiveStudentsList courseId={id} />
      </div>
    </div>
  );
}
