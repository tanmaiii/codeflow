'use client';
import CardCourse from '@/components/common/CardCourse/CardCourse';
import { MyPagination } from '@/components/common/MyPagination/MyPagination';
import NoData from '@/components/common/NoData/NoData';
import { CourseListSkeleton } from '@/components/skeletons/course';
import { Button } from '@/components/ui/button';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ROLE } from '@/constants/enum';
import { paths } from '@/data/path';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useQ_Course_GetAllByUser from '@/hooks/query-hooks/Course/useQ_Course_GetAllByUser';
import useQ_Course_GetAllRegistered from '@/hooks/query-hooks/Course/useQ_Course_GetAllRegistered';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { useUserStore } from '@/stores/user_store';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
const COURSE_TABS = [
  { id: 'all', label: 'allCourses' },
  { id: 'registered', label: 'registeredCourses' },
  { id: 'author', label: 'authorCourses' },
] as const;

const DEFAULT_SORT = { sortBy: 'createdAt', order: 'DESC' as const };

export default function CourseList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const tab = searchParams?.get('tab') || 'all';
  const { localPath } = useH_LocalPath();
  const t = useTranslations('course');
  const { user } = useUserStore();

  const queryParams = {
    page,
    limit: 10,
    ...DEFAULT_SORT,
  };

  const { data: allCourses, isLoading: isLoadingAll } = useQ_Course_GetAll({
    params: queryParams,
  });

  const { data: registeredCourses, isLoading: isLoadingRegistered } = useQ_Course_GetAllRegistered({
    params: queryParams,
  });

  const { data: authorCourses, isLoading: isLoadingAuthor } = useQ_Course_GetAllByUser({
    params: queryParams,
    userId: user?.id || '',
  });

  const isLoading = isLoadingAll || isLoadingRegistered || isLoadingAuthor;
  const currentData =
    tab === 'all' ? allCourses : tab === 'registered' ? registeredCourses : authorCourses;

  const handleTabChange = (tabId: string) => {
    router.push(`${localPath(paths.COURSES)}?page=1&tab=${tabId}`);
  };

  if (isLoading) return <CourseListSkeleton />;
  if (!currentData) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="w-full h-full">
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2">
          {COURSE_TABS.map(({ id, label }) => (
            <div
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md ${
                tab === id ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <TextHeading>{t(label)}</TextHeading>
            </div>
          ))}
        </div>
        {user?.role === ROLE.TEACHER && (
          <Button
            onClick={() => router.push(localPath(paths.COURSE_CREATE))}
            variant="outline"
            className="bg-background-1"
            size="sm"
          >
            {t('createCourse')}
          </Button>
        )}
      </div>
      <div className="min-h-[600px] mt-4">
        {!currentData.data?.length && <NoData />}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5 py-2">
          {currentData.data?.map(course => (
            <CardCourse key={course.id} course={course} />
          ))}
        </div>
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={currentData.pagination.currentPage || 1}
          totalPages={currentData.pagination.totalPages || 1}
          onPageChange={page => router.push(`${localPath(paths.COURSES)}?page=${page}&tab=${tab}`)}
        />
      </div>
    </div>
  );
}
