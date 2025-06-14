import React, { useRef } from 'react';
import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { RepoSchemaType, useRepoSchema } from '@/lib/validations/useRepoSchema';
import reposService from '@/services/repos.service';
import { util_repos_name } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { ENUM_TYPE_COURSE } from '@/constants/enum';
import { LoadingOverlay } from '@/components/common/Loading';
import { IconBrandGithub, IconPlus, IconGitBranch, IconCode } from '@tabler/icons-react';

export default function TopicsReposCreate({ topicId }: { topicId: string }) {
  const tRepo = useTranslations('repos');
  const tCommon = useTranslations('common');
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const schema = useRepoSchema();
  const { data: Q_Topic } = useQ_Topic_GetDetail({ id: topicId });

  const repoName = util_repos_name({
    type: Q_Topic?.data?.course?.type as ENUM_TYPE_COURSE,
    name: Q_Topic?.data?.title ?? '',
    groupName: Q_Topic?.data?.groupName ?? '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RepoSchemaType>({
    resolver: zodResolver(schema),
  });
  
  const mutation = useMutation({
    mutationFn: async (data: RepoSchemaType) => {
      await reposService.create({
        topicId,
        ...data,
      });
    },
    onSuccess: () => {
      toast.success(tCommon('createSuccess'));
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      reset();
      closeRef.current?.click();
    },
    onError: () => {
      toast.error(tCommon('createError'));
    },
  });

  if (mutation.isPending) {
    return <LoadingOverlay message="creating..." />;
  }

  return (
    <ActionModal 
      title="Tạo Repository" 
      actionType={'create'} 
      className="max-w-[600px]"
      icon={
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <IconPlus className="w-4 h-4" />
          <span className="font-medium text-sm">Repository</span>
        </div>
      }
    >
      <div className="space-y-6 p-2">
        {/* Header */}
        <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            <IconBrandGithub className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tạo repository cho: {Q_Topic?.data?.title}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6">
          {/* Repository Info */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-slate-900/50 rounded-xl -z-10"></div>
            <div className="relative p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <IconCode className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Thông tin Repository</span>
              </div>
              
              {/* Suggested name display */}
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <IconGitBranch className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Tên gợi ý
                  </span>
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded border">
                  {repoName}-
                </div>
              </div>

              <TextInput
                label="Tên Repository"
                placeholder="Nhập tên repository..."
                defaultValue={`${repoName}-`}
                {...register('name')}
                error={errors.name?.message}
                description={tRepo('createRepoDescription')}
              />
            </div>
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-700/50">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded bg-amber-200 dark:bg-amber-800">
                <IconBrandGithub className="w-4 h-4 text-amber-700 dark:text-amber-300" />
              </div>
              <div>
                <div className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                  Hướng dẫn đặt tên
                </div>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Tên repository chỉ chứa chữ cái, số và dấu gạch ngang (-)</li>
                  <li>• Không được chứa khoảng trắng hoặc ký tự đặc biệt</li>
                  <li>• Nên sử dụng tên có ý nghĩa và dễ nhận biết</li>
                </ul>
              </div>
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
              className="px-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang tạo...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconBrandGithub className="w-4 h-4" />
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
