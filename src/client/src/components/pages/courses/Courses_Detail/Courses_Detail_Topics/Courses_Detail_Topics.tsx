'use client';
import { Card } from '@/components/ui/card';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { useParams } from 'next/navigation';
import Courses_Detail_Topics_Table from './Courses_Detail_Topics_Table';
import TextHeading from '@/components/ui/text';

export default function Courses_Detail_Topics() {
  const { id } = useParams();
  const { data: course } = useQ_Course_GetDetail({ id: id as string });

  return (
    <Card className="p-6 flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <TextHeading className="text-2xl font-bold">{course?.data?.title}</TextHeading>
      <Courses_Detail_Topics_Table courseId={id as string} />
    </Card>
  );
}
