import ActionModal from '@/components/common/Action/ActionModal';
import TextInput from '@/components/common/Input/TextInput/TextInput';
import { Button } from '@/components/ui/button';
import { RepoSchemaType, useRepoSchema } from '@/lib/validations/useRepoSchema';
import reposService from '@/services/repos.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Topics_Repo_Create({ topicId }: { topicId: string }) {
  const tRepo = useTranslations('repo');
  const tCommon = useTranslations('common');
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const schema = useRepoSchema();

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

  return (
    <ActionModal title={tRepo('createRepo')} actionType={'create'} className="max-w-[50vw]">
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <div className="flex flex-col gap-2">
          <TextInput
            label={tRepo('nameRepo')}
            className="min-h-[200px]"
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
