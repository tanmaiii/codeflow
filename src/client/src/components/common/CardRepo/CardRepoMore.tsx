import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { IRepos } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useUserStore } from '@/stores/user_store';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisIcon, PenIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import MoreDropdown, { DropdownAction } from '../MoreDropdown';
import CardRepo_Update from './CardRepoUpdate';

interface CardRepo_MoreProps {
  repos: IRepos;
  className?: string;
}

export default function CardRepoMore({ repos, className }: CardRepo_MoreProps) {
  const user = useUserStore();
  const queryClient = useQueryClient();
  const t_common = useTranslations('common');
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const onView = () => {
    window.open(repos.url, '_blank');
  };

  const onUpdate = () => {
    setIsUpdateDialogOpen(true);
  };

  const mutationDelete = useMutation({
    mutationFn: () => {
      return reposService.delete(repos.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      toast.success(t_common('deleteSuccess'));
    },
    onError: () => {
      toast.error(t_common('deleteError'));
    },
  });

  const isAuthor = user?.user?.id === repos?.authorId;
  const isAdmin = user?.user?.role === 'admin';

  const actions: DropdownAction[] = [
    {
      id: 'view',
      label: 'View Repo',
      icon: <IconEye size={16} />,
      onClick: onView,
      isVisible: true,
    },
    {
      id: 'update',
      label: 'Update Repo',
      icon: <PenIcon size={16} />,
      onClick: onUpdate,
      isVisible: isAuthor || isAdmin,
    },
    {
      id: 'delete',
      label: 'Delete Repo',
      icon: <IconTrash size={16} />,
      onClick: () => {},
      isVisible: isAuthor || isAdmin,
      isDeleteAction: true,
    },
  ];

  const handleDelete = () => {
    return Promise.resolve(mutationDelete.mutate());
  };

  const customTrigger = (
    <Button variant="rounded" className="p-x-0" size="icon">
      <EllipsisIcon size={26} />
    </Button>
  );

  if (!isAuthor && !isAdmin) {
    return null;
  }

  return (
    <>
      <MoreDropdown
        actions={actions}
        className={className}
        deleteItemName={repos.name}
        onDelete={handleDelete}
        trigger={customTrigger}
      />
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <CardRepo_Update repos={repos} />
      </Dialog>
    </>
  );
}
