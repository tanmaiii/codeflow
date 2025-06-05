import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IRepos } from '@/interfaces/repos';
import { cn } from '@/lib/utils';
import TextInput from '../Input/TextInput/TextInput';
import { RepoSchemaType } from '@/lib/validations/useRepoSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import reposService from '@/services/repos.service';
import { useRepoSchema } from '@/lib/validations/useRepoSchema';
import { useTranslations } from 'next-intl';

export default function CardRepo_Update({ repo }: { repo: IRepos }) {
  const tCommon = useTranslations('common');
  const tRepo = useTranslations('repo');
  const queryClient = useQueryClient();
  const schema = useRepoSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RepoSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: repo.name,
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: RepoSchemaType) => {
      await reposService.update(repo.id, {
        name: data.name,
        topicId: repo.topicId,
      });
    },
    onSuccess: () => {
      toast.success(tCommon('updateSuccess'));
      queryClient.invalidateQueries({ queryKey: ['repos', repo.topicId, { page: 1, limit: 10 }] });
      reset();
    },
    onError: () => {
      toast.error(tCommon('updateError'));
    },
  });

  return (
    <DialogContent className={cn('px-4')}>
      <DialogHeader>
        <DialogTitle>{tRepo('updateRepo')}</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <TextInput
          label={tRepo('nameRepo')}
          {...register('name')}
          description={tRepo('createRepoDescription')}
          error={errors.name?.message}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(data => mutation.mutate(data))}
          >
            {tCommon('update')}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
