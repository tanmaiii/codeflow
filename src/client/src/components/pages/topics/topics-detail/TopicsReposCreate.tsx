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
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useQ_Topic_GetDetail from '@/hooks/query-hooks/Topic/useQ_Topic_GetDetail';
import { ENUM_TYPE_COURSE } from '@/constants/enum';
import { LoadingOverlay } from '@/components/common/Loading';

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
    <ActionModal title={tRepo('createRepo')} actionType={'create'} className="max-w-[50vw]">
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <div className="flex flex-col gap-2">
          <TextInput
            label={tRepo('nameRepo')}
            className="min-h-[200px]"
            defaultValue={`${repoName}-`}
            {...register('name')}
            error={errors.name?.message}
            description={tRepo('createRepoDescription')}
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
