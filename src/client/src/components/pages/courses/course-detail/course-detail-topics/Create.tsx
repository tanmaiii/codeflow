'use client';
import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import topicService from '@/services/topic.service';
import { toast } from 'sonner';
import { useRef } from 'react';
import { DialogClose } from '@/components/ui/dialog';
import { TopicSchemaType, useTopicSchema } from '@/lib/validations/topicSchema';

export default function CoursesDetailTopicsCreate({ courseId }: { courseId: string }) {
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
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: TopicSchemaType) => {
      return topicService.create({
        isCustom: false,
        status: 'pending',
        courseId: courseId,
        ...data,
      });
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      reset();
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: () => {
      toast.error(t('createError'));
    },
  });

  return (
    <ActionModal
      title={tTopic('createTopic')}
      icon={
        <>
          <IconPlus className="w-4 h-4" />
          {tTopic('createTopic')}
        </>
      }
      actionType={'default'}
      className="max-w-[50vw]"
    >
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="flex flex-col gap-3">
        <TextInput label={tTopic('title')} error={errors.title?.message} {...register('title')} />
        <TextareaInput
          label={tTopic('description')}
          className="min-h-[200px]"
          error={errors.description?.message}
          {...register('description')}
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
