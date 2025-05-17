'use client';
import MyDateInput from '@/components/common/MyDateInput';
import TextHeading from '@/components/ui/text';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import { courseSchemaType, useCourseSchema } from '@/lib/validations/courseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Courses_Update() {
  const { id } = useParams();
  const Q_Course = useQ_Course_GetDetail({
    id: id?.toString() || '',
  });
  const t = useTranslations('course');
  const schema = useCourseSchema();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<courseSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      regStartDate: new Date(Q_Course.data?.data.regStartDate || ''),
      regEndDate: new Date(Q_Course.data?.data.regEndDate || ''),
      startDate: new Date(Q_Course.data?.data.startDate || ''),
      endDate: new Date(Q_Course.data?.data.endDate || ''),
      topicDeadline: new Date(Q_Course.data?.data.topicDeadline || ''),
    },
  });

  // useEffect(() => {
  //   if (Q_Course.data?.data) {
  //     reset({
  //       regStartDate: new Date(Q_Course.data.data.regStartDate),
  //       regEndDate: new Date(Q_Course.data.data.regEndDate),
  //       startDate: new Date(Q_Course.data.data.startDate),
  //       endDate: new Date(Q_Course.data.data.endDate),
  //       topicDeadline: new Date(Q_Course.data.data.topicDeadline),
  //     });
  //   }
  // }, [Q_Course.data, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <TextHeading>{Q_Course.data?.data.title}</TextHeading>
        <MyDateInput
          label={t('startDate')}
          name="startDate"
          control={control}
          registration={register('startDate')}
          error={errors.startDate?.message}
        />
      </form>
    </div>
  );
}
