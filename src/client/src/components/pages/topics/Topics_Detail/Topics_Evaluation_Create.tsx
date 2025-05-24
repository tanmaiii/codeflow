import ActionModal from '@/components/common/Action/ActionModal';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  evaluation: z
    .string()
    .min(1, { message: 'Nội dung không được để trống' })
    .max(1000, { message: 'Nội dung không được vượt quá 1000 ký tự' }),
});

type SchemaType = z.infer<typeof schema>;

export default function Topics_Evaluation_Create({ topic }: { topic: ITopic }) {
  const tCommon = useTranslations('common');
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SchemaType) => {
      try {
        return await topicService.createEvaluation(topic.id, data);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
      reset();
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['topic', 'detail', topic.id] });
    },
    onError: error => {
      console.error('Error creating evaluation:', error);
      toast.error(tCommon('createError'));
    },
  });

  return (
    <ActionModal
      title={'Nhận xét'}
      icon={
        <>
          <IconPlus className="w-4 h-4" />
          Nhận xét
        </>
      }
      actionType={'default'}
      className="max-w-[50vw]"
    >
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <div className="flex flex-col gap-2">
          <TextareaInput
            label="Nội dung"
            className="min-h-[200px]"
            {...register('evaluation')}
            error={errors.evaluation?.message}
          />
          <div className="flex justify-end gap-2">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="outline">
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {tCommon('create')}
            </Button>
          </div>
        </div>
      </form>
    </ActionModal>
  );
}
