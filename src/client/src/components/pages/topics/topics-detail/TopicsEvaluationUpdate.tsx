import React, { useRef } from 'react';
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ITopic, ITopicEvaluation } from '@/interfaces/topic';
import { IconEdit, IconDeviceFloppy } from '@tabler/icons-react';

export default function TopicsEvaluationUpdate({
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
    <ActionModal 
      title="Cập nhật nhận xét" 
      actionType={'update'} 
      className="max-w-[600px]"
    >
      <div className="space-y-6 p-2">
        {/* Header */}
        <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-full border border-orange-200/50 dark:border-orange-700/50">
            <IconEdit className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Chỉnh sửa đánh giá: {topic.title}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6">
          {/* Content Input */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl -z-10"></div>
            <div className="relative p-4 border border-orange-200/50 dark:border-orange-700/50 rounded-xl">
              <TextareaInput
                label="Cập nhật nội dung đánh giá"
                placeholder="Chỉnh sửa nhận xét và đánh giá về dự án..."
                className="min-h-[200px] border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm resize-none focus:ring-2 focus:ring-orange-500/20"
                {...register('evaluation')}
                error={errors.evaluation?.message}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <DialogClose asChild ref={closeRef}>
              <Button 
                type="button" 
                variant="outline"
                className="px-6 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang cập nhật...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconDeviceFloppy className="w-4 h-4" />
                  {tCommon('update')}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ActionModal>
  );
}
