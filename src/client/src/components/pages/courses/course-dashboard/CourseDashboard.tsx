'use client';

import ChartLineCodeActivity from '@/components/common/MyChart/ChartLineCodeActivity';
import TitleHeader from '@/components/layout/TitleHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { TextDescription } from '@/components/ui/text';
import useQ_Course_GetCodeActivity from '@/hooks/query-hooks/Course/useQ_Course_GetCodeActivity';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ActiveStudentsList from './components/ActiveStudentsList';
import BestTopicsList from './components/BestTopicsList';
import LanguageChart from './components/LanguageChart';
import CourseStatsCards from './CourseStatsCards';
import ChartTopicStatus from '@/components/common/MyChart/ChartTopicStatus';
import useQ_Course_GetTopicStatus from '@/hooks/query-hooks/Course/useQ_Course_GetTopicStatus';
import { useQ_CodeAnalysis_GetByCourseId } from '@/hooks/query-hooks/CodeAnalysis/useQ_CodeAnalysis_GetByCourseId';
import ChartCodeQuality from '@/components/common/MyChart/ChartCodeQuality';

export default function CourseDashboard() {
  const params = useParams();
  const id = params?.id as string;
  const t = useTranslations('dashboard');
  const { data: dataCourse, isLoading, isError } = useQ_Course_GetDetail({ id: id });
  const [selectedDays, setSelectedDays] = useState(7);
  const { data: codeActivityResponse, isLoading: isLoadingCodeActivity } =
    useQ_Course_GetCodeActivity({
      courseId: id,
      days: selectedDays,
    });

  const { data: topicStatusResponse, isLoading: isLoadingTopicStatus } = useQ_Course_GetTopicStatus({courseId: id});

  const { data: codeAnalysisResponse, isLoading: isLoadingCodeAnalysis } =
    useQ_CodeAnalysis_GetByCourseId(id);

  if (isLoading) return <Skeleton className="w-full h-[90vh]" />;
  if (isError) return <div>Error</div>;

  return (
    <div className="p-2 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <TitleHeader title={t('titleCourse')} onBack />
          <TextDescription>
            {t('descriptionCourse')} {dataCourse?.data?.title}
          </TextDescription>
        </div>
      </div>

      {/* Stats Cards */}
      {dataCourse?.data && <CourseStatsCards course={dataCourse.data} />}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartLineCodeActivity
          data={codeActivityResponse?.data}
          setSelectedDays={setSelectedDays}
          selectedDays={selectedDays}
          isLoading={isLoadingCodeActivity}
        />
        <ChartTopicStatus data={topicStatusResponse?.data} isLoading={isLoadingTopicStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LanguageChart courseId={id} />
        <ChartCodeQuality data={codeAnalysisResponse?.data} isLoading={isLoadingCodeAnalysis} />
      </div>

      <BestTopicsList courseId={id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActiveStudentsList courseId={id} />
      </div>
    </div>
  );
}
