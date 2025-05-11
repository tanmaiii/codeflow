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

export default function Courses_Summary({ course }: { course: ICourse }) {
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
        <Button variant="default" className="w-fit px-10">
          Tham gia
        </Button>
        <div className="flex flex-col flex-1 items-center w-full gap-2">
          <div className="flex items-center gap-2">
            <IconClockHour1 className="text-color-2" />
            <TextDescription className="text-sm font-bold">{`Thời lượng ${utils_CalculateWeeks(
              course?.startDate ?? '',
              course?.endDate ?? '',
            )} tuần`}</TextDescription>
          </div>
          <div className="flex items-center gap-2">
            <IconUser className="text-color-2" />
            <TextDescription className="text-sm font-bold">1000 học viên</TextDescription>
          </div>
          <div className="flex items-center gap-2">
            <IconStar className="text-color-2" />
            <TextDescription className="text-sm font-bold">4.5/5</TextDescription>
          </div>
        </div>
      </div>
    </Card>
  );
}
