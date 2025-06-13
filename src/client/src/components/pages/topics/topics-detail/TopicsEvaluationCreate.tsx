import React, { useRef } from 'react';
import ActionModal from '@/components/common/Action/ActionModal';
import TextareaInput from '@/components/common/Input/TextareaInput/TextareaInput';
import { Button } from '@/components/ui/button';
import { ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { IconPlus, IconMessageCircle, IconStar } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEvaluationSchema } from '@/lib/validations/evaluationSchema';
import { evaluationSchemaType } from '@/lib/validations/evaluationSchema';

export default function TopicsEvaluationCreate({ topic }: { topic: ITopic }) {
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
  });

  const mutation = useMutation({
    mutationFn: async (data: evaluationSchemaType) => {
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
      title="Thêm nhận xét"
      icon={
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <IconPlus className="w-4 h-4" />
          <span className="font-medium">Nhận xét</span>
        </div>
      }
      actionType={'default'}
      className="max-w-[600px]"
    >
      <div className="space-y-6 p-2">
        {/* Header */}
        <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-full border border-blue-200/50 dark:border-blue-700/50">
            <IconMessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Dự án: {topic.title}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6">
          {/* Content Input */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl -z-10"></div>
            <div className="relative p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl">
              <TextareaInput
                label="Nội dung đánh giá"
                placeholder="Nhập nhận xét và đánh giá chi tiết về dự án..."
                className="min-h-[200px] border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm resize-none focus:ring-2 focus:ring-blue-500/20"
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
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang lưu...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconStar className="w-4 h-4" />
                  {tCommon('create')}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ActionModal>
  );
}
