import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { LoadingOverlay } from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { ENUM_TYPE_COURSE } from '@/constants/enum';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { RepoSchemaType, useRepoSchema } from '@/lib/validations/useRepoSchema';
import reposService from '@/services/repos.service';
import { util_repos_name } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { IconBrandGithub } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
    <ActionModal title={tRepo('createRepo')} actionType={'create'} className="max-w-[600px]">
      <div className="space-y-6 p-2">
        <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6">
          {/* Repository Info */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-slate-900/50 rounded-xl -z-10"></div>
            <div className="relative p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl">
              <TextInput
                label={tRepo('nameRepo')}
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
                  {tRepo('instruction')}
                </div>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>{tRepo('instructionName')}</li>
                  <li>{tRepo('instructionNameDescription')}</li>
                  <li>{tRepo('instructionNameSuggest')}</li>
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
            <Button type="submit" disabled={isSubmitting}>
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
