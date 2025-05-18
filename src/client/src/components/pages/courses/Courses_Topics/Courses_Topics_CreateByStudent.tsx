'use client';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import MyMultiSelect from '@/components/common/MyMultiSelect/MyMultiSelect';
import { Button } from '@/components/ui/button';
import { TopicSchemaType, useTopicSchema } from '@/lib/validations/topicSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

const members = [
  {
    value: '1',
    label: 'Nguyễn Văn A',
  },
  {
    value: '2',
    label: 'Nguyễn Văn B',
  },
  {
    value: '3',
    label: 'Nguyễn Văn C',
  },
];

export default function Courses_Topics_CreateByStudent() {
  const tTopic = useTranslations('topic');
  const tCommon = useTranslations('common');
  const schema = useTopicSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-3">
      <TextInput label={tTopic('title')} error={errors.title?.message} {...register('title')} />
      <TextareaInput
        label={tTopic('description')}
        className="min-h-[200px]"
        error={errors.description?.message}
        {...register('description')}
      />
      <MyMultiSelect
        label={tTopic('members')}
        name="members"
        control={control}
        maxLength={2}
        options={members.map(member => ({
          value: member.value,
          label: member.label,
        }))}
      />
      <div className="flex justify-end mt-auto">
        <Button type="submit" className="w-fit" disabled={isSubmitting}>
          {tCommon('create')}
        </Button>
      </div>
    </form>
  );
}
