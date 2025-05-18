import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useTopicSchema, TopicSchemaType } from '@/lib/validations/topicSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import topicService from '@/services/topic.service';
import { toast } from 'sonner';
import { useRef } from 'react';
import { DialogClose } from '@/components/ui/dialog';
import { ITopic } from '@/interfaces/topic';
import MySelect from '@/components/common/MySelect';
import { STATUS_TOPIC } from '@/contants/object';

export default function Courses_Detail_Topics_Update({ topic }: { topic: ITopic }) {
  const t = useTranslations('common');
  const tTopic = useTranslations('topic');
  const schema = useTopicSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: topic,
  });

  const mutation = useMutation({
    mutationFn: (data: TopicSchemaType) => {
      return topicService.update(topic.id, {
        ...data,
        courseId: topic.courseId,
      });
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      reset();
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => {
      toast.error(t('updateError'));
    },
  });

  return (
    <ActionModal title={tTopic('updateTopic')} actionType={'update'}>
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="flex flex-col gap-3">
        <TextInput label={tTopic('title')} error={errors.title?.message} {...register('title')} />
        <TextareaInput
          label={tTopic('description')}
          className="min-h-[200px]"
          error={errors.description?.message}
          {...register('description')}
        />
        <MySelect
          label={tTopic('status')}
          name="status"
          control={control}
          options={STATUS_TOPIC}
          error={errors.status}
          required={true}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild ref={closeRef}>
            <Button type="button" variant="outline">
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {t('create')}
          </Button>
        </div>
      </form>
    </ActionModal>
  );
}
