'use client';
import TitleHeader from '@/components/layout/TitleHeader';
import { Card } from '@/components/ui/card';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { useParams } from 'next/navigation';
import Courses_Detail_Topics_Table from './Courses_Detail_Topics_Table';
import { useTranslations } from 'next-intl';

export default function Courses_Detail_Topics() {
  const { id } = useParams();
  const t = useTranslations('course');
  const { data: course } = useQ_Course_GetDetail({ id: id as string });

  return (
    <Card className="p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <TitleHeader title={course?.data?.title ?? ''} onBack={true} description={t('topics')} />
      <Courses_Detail_Topics_Table courseId={id as string} />
    </Card>
  );
}
