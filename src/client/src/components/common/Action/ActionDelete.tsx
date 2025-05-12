import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { TextDescription } from '@/components/ui/text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { toast } from 'sonner';
import ActionModal from './ActionModal';
interface ActionDeleteProps {
  deleteKey?: string;
  handleSubmit: () => void;
  icon?: React.ReactNode;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function ActionDelete({
  deleteKey = 'this item',
  handleSubmit,
  icon,
  onSuccess,
  onError,
}: ActionDeleteProps) {
  const t = useTranslations('common');
  const queryClient = useQueryClient();
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      return await handleSubmit();
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      onSuccess?.();
      queryClient.invalidateQueries();
      buttonCloseRef.current?.click();
    },
    onError: () => {
      toast.error(t('deleteError'));
      onError?.();
    },
  });

  return (
    <ActionModal
      actionType={icon ? 'default' : 'delete'}
      title={t('deleteConfirmTitle')}
      icon={icon}
    >
      <TextDescription className="text-md text-color-1">
        {t('deleteConfirm', { title: deleteKey })}
      </TextDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button ref={buttonCloseRef} variant="outline">
            {t('cancel')}
          </Button>
        </DialogClose>
        <Button variant="destructive" onClick={() => mutation.mutate()}>
          {t('delete')}
        </Button>
      </DialogFooter>
    </ActionModal>
  );
}
