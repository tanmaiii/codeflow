'use client'
import { Card } from '@/components/ui/card';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { useParams } from 'next/navigation';
import Courses_Summary from './Courses_Summary';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import TextHeading from '@/components/ui/text';

export default function Courses_Detail() {
  const params = useParams();
  const id = params.id as string;

  const Q_data = useQ_Course_GetDetail({
    id: id,
  })

  if (Q_data.isLoading) return <div>Loading...</div>
  if (Q_data.isError) return <div>Error</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <Card className="flex flex-col gap-4 p-4 min-h-[90vh]">
          <div className="flex flex-col gap-4">
            <TextHeading className="text-3xl font-bold">{Q_data.data?.data?.title}</TextHeading>
            <SwapperHTML content={Q_data.data?.data?.description ?? ""} />
          </div>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-4 xl:col-span-3">
        {Q_data.data?.data && <Courses_Summary course={Q_data.data?.data} />}
      </div>
    </div>
  );
}
