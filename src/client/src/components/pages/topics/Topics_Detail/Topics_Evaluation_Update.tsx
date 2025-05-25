import ActionModal from '@/components/common/Action/ActionModal';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { useEvaluationSchema } from '@/lib/validations/evaluationSchema';
import { evaluationSchemaType } from '@/lib/validations/evaluationSchema';
import topicService from '@/services/topic.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ITopic, ITopicEvaluation } from '@/interfaces/topic';

export default function Topics_Evaluation_Update({
  topic,
  evaluation,
}: {
  topic: ITopic;
  evaluation: ITopicEvaluation;
}) {
  const tCommon = useTranslations('common');
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const schema = useEvaluationSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<evaluationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      evaluation: evaluation.evaluation,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: evaluationSchemaType) => {
      try {
        return await topicService.updateEvaluation(topic.id, evaluation.id, data);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      reset();
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: ['topic', 'detail', topic.id] });
    },
    onError: error => {
      console.error('Error updating evaluation:', error);
      toast.error(tCommon('updateError'));
    },
  });

  return (
    <ActionModal title={'Cập nhật nhận xét'} actionType={'update'} className="max-w-[50vw]">
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
              {tCommon('update')}
            </Button>
          </div>
        </div>
      </form>
    </ActionModal>
  );
}
