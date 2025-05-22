import { Button } from '@/components/ui/button';
import { IMAGES } from '@/data/images';
import React from 'react';
import { Card } from '@/components/ui/card';
import { IconClockHour1, IconUser, IconStar } from '@tabler/icons-react';
import { ICourse } from '@/interfaces/course';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import Image from 'next/image';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { utils_CalculateWeeks } from '@/utils/date';
import { useRouter } from 'next/navigation';
import useQ_Course_GetMembers from '@/hooks/query-hooks/Course/useQ_Course_GetMembers';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { useTranslations } from 'next-intl';
import { useUserStore } from '@/stores/user_store';
import { ROLE } from '@/contants/enum';
import { paths } from '@/data/path';
import Link from 'next/link';

export default function Courses_Summary({ course }: { course: ICourse }) {
  const router = useRouter();
  const { data: members } = useQ_Course_GetMembers({
    id: course.id,
    params: { page: 1, limit: 1000 },
  });
  const { data: topics } = useQ_Topic_GetAllByCourseId({
    params: { courseId: course.id, page: 1, limit: 1 },
  });
  const { user } = useUserStore();

  const t = useTranslations('course');

  return (
    <Card className="flex flex-col justify-center gap-4 p-4">
      <div className="w-full h-48 relative rounded-md overflow-hidden border">
        <Image
          src={
            course?.thumbnail ? utils_ApiImageToLocalImage(course.thumbnail) : IMAGES.DEFAULT_COURSE
          }
          alt="Course 1"
          fill
          className="object-cover "
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <TextHeading className="text-2xl font-bold text-center">{course.title}</TextHeading>
        {user?.id === course.authorId && (
          <Button
            variant="default"
            className="w-fit px-10"
            onClick={() => router.push(paths.COURSE_TOPICS(course.id))}
          >
            {t('topics')}
          </Button>
        )}
        {user?.role === ROLE.USER && (
          <Button
            variant="default"
            className="w-fit px-10"
            onClick={() => router.push(paths.COURSE_REGISTER(course.id))}
          >
            {t('register')}
          </Button>
        )}
        <div className="flex flex-col flex-1 items-center w-full gap-2">
          <div className="flex items-center gap-2">
            <IconClockHour1 className="text-color-2" />
            {/* <TextDescription className="text-sm font-bold">{`Thời lượng ${utils_CalculateWeeks(
              course?.startDate ?? '',
              course?.endDate ?? '',
            )} tuần`}</TextDescription> */}
            <TextDescription className="text-sm font-bold">{`${t('duration', {
              weeks: utils_CalculateWeeks(course?.startDate ?? '', course?.endDate ?? ''),
            })}`}</TextDescription>
          </div>
          <div className="flex items-center gap-2">
            <IconUser className="text-color-2" />
            <Link href={paths.COURSE_MEMBER(course.id)}>
              <TextDescription className="text-sm font-bold">
                {members?.data?.length} {t('students')}
              </TextDescription>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <IconStar className="text-color-2" />
            <TextDescription className="text-sm font-bold">
              {topics?.pagination.totalItems} {t('topics')}
            </TextDescription>
          </div>
        </div>
      </div>
    </Card>
  );
}
