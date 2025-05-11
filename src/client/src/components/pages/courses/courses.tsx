'use client';
import CardCourse from '@/components/common/CardCourse/CardCourse';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import { useRouter, useSearchParams } from 'next/navigation';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { useTranslations } from 'next-intl';
import NoData from '@/components/common/NoData/NoData';
const tabs = [
  { id: 'all', label: 'All Courses' },
  { id: 'registered', label: 'Registered Courses' },
  { id: 'completed', label: 'Completed Courses' },
];

export default function Courses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const tab = searchParams.get('tab') || 'all';
  const { localPath } = useH_LocalPath();
  const t = useTranslations('course');

  const Q_Courses = useQ_Course_GetAll({
    params: {
      page: Number(page),
      limit: 8,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  if (Q_Courses.isLoading) return <TextDescription>Loading...</TextDescription>;
  if (Q_Courses.error) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="w-full h-full">
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2">
          {tabs.map(({ id, label }) => (
            <div
              key={id}
              onClick={() => router.push(`${localPath(paths.COURSES)}?page=${page}&tab=${id}`)}
              className={`flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md ${
                tab === id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <TextHeading>{label}</TextHeading>
            </div>
          ))}
        </div>
        <Button
          onClick={() => router.push(localPath(paths.COURSE_CREATE))}
          variant="outline"
          className="bg-background-1"
          size="sm"
        >
          {t('createCourse')}
        </Button>
      </div>
      <div className="min-h-[600px]">
        {Q_Courses.data?.data?.length === 0 && <NoData />}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5 py-2">
          {Q_Courses.data &&
            Q_Courses.data?.data?.map(course => <CardCourse key={course.id} course={course} />)}
        </div>
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={Q_Courses.data?.pagination.currentPage || 1}
          totalPages={Q_Courses.data?.pagination.totalPages || 1}
          onPageChange={page => router.push(`${localPath(paths.COURSES)}?page=${page}&tab=${tab}`)}
        />
      </div>
    </div>
  );
}
