'use client';
import CardCourse from '@/components/common/CardCourse/CardCourse';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { paths } from '@/data/path';
import { useRouter, useSearchParams } from 'next/navigation';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { useTranslations } from 'next-intl';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useQ_Course_GetAllRegistered from '@/hooks/query-hooks/Course/useQ_Course_GetAllRegistered';
import NoData from '@/components/common/NoData/NoData';

const tabs = [
  { id: 'all', label: 'All Courses' },
  { id: 'registered', label: 'Registered Courses' },
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

  const Q_RegisteredCourses = useQ_Course_GetAllRegistered({
    params: {
      page: Number(page),
      limit: 8,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  const isLoading = tab === 'all' ? Q_Courses.isLoading : Q_RegisteredCourses.isLoading;
  const error = tab === 'all' ? Q_Courses.error : Q_RegisteredCourses.error;
  const currentData = tab === 'all' ? Q_Courses.data : Q_RegisteredCourses.data;

  const handleTabChange = (tabId: string) => {
    // Reset page to 1 when changing tabs
    router.push(`${localPath(paths.COURSES)}?page=1&tab=${tabId}`);
  };

  if (isLoading) return <TextDescription>Loading...</TextDescription>;
  if (error) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="w-full h-full">
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2">
          {tabs.map(({ id }) => (
            <div
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md ${
                tab === id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <TextHeading>{t(id === 'all' ? 'allCourses' : 'registeredCourses')}</TextHeading>
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
        {currentData?.data?.length === 0 && <NoData />}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5 py-2">
          {currentData?.data?.map(course => (
            <CardCourse key={course.id} course={course} />
          ))}
        </div>
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={currentData?.pagination.currentPage || 1}
          totalPages={currentData?.pagination.totalPages || 1}
          onPageChange={page => router.push(`${localPath(paths.COURSES)}?page=${page}&tab=${tab}`)}
        />
      </div>
    </div>
  );
}
