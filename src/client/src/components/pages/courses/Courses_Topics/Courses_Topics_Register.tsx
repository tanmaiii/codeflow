'use client';
import MySelect from '@/components/common/MySelect';
import TitleHeader from '@/components/layout/TitleHeader';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import TextHeading from '@/components/ui/text';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Courses_Topics_CreateByStudent from './Courses_Topics_CreateByStudent';
import Courses_Topics_CreateByTeacher from './Courses_Topics_CreateByTeacher';

const TYPE_TOPIC = [
  {
    value: 'teacher',
    label: 'Giảng viên gợi ý',
    labelEn: 'Teacher suggestion',
  },
  {
    value: 'student',
    label: 'Sinh viên tự chọn',
    labelEn: 'Student choose',
  },
];

export default function Courses_Topics_Register() {
  const tTopic = useTranslations('topic');
  const tCourse = useTranslations('course');
  const { id } = useParams();
  const [isCustom, setIsCustom] = useState<boolean>(true);
  const { data: Q_Course } = useQ_Course_GetDetail({ id: id as string });

  return (
    <div className="flex flex-col  gap-4 py-10 justify-center items-center mx-auto bg-background-2">
      <Card className="w-full max-w-4xl min-h-[80vh] py-4 px-4 lg:px-6 lg:py-8">
        <TitleHeader title={tTopic('topic')} onBack />

        <div className="flex flex-col items-center gap-3">
          <Label>{tCourse('register')}</Label>
          <TextHeading className="text-xl">{Q_Course?.data?.title ?? ''}</TextHeading>
        </div>

        <MySelect
          defaultValue="student"
          label={tTopic('typeTopic')}
          onChange={value => setIsCustom(value === 'student')}
          options={TYPE_TOPIC}
          name="type"
        />

        {isCustom ? <Courses_Topics_CreateByStudent /> : <Courses_Topics_CreateByTeacher />}
      </Card>
    </div>
  );
}
