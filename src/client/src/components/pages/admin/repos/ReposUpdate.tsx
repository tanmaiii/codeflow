import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { LoadingOverlay } from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { IRepos } from '@/interfaces/repos';
import { RepoSchemaType, useRepoSchema } from '@/lib/validations/useRepoSchema';
import reposService from '@/services/repos.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ReposUpdate({ repos }: { repos: IRepos }) {
  const tCommon = useTranslations('common');
  const tRepos = useTranslations('repos');
  const schema = useRepoSchema();
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RepoSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: repos.name,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RepoSchemaType) => {
      await reposService.update(repos.id, {
        name: data.name,
        topicId: repos.topicId,
      });
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      reset();
      closeRef.current?.click();
    },
    onError: () => {
      toast.error(tCommon('updateError'));
    },
  });

  if (mutation.isPending) {
    return <LoadingOverlay message="updating..." />;
  } 

  return (
    <ActionModal title={tRepos('updateRepo')} actionType={'update'} className="max-w-[50vw]">
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <div className="flex flex-col gap-2">
          <TextInput label={tRepos('name')} {...register('name')} error={errors.name?.message} />
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
