import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import ActionModal, { ActionModalProps } from './ActionModal';

interface ActionUpdateProps<T extends FieldValues> extends Omit<ActionModalProps, 'onSubmit'> {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  handleSubmit: (values: T) => void;
  onSuccess?: () => void;
  onError?: () => void;
  reactHookForm?: UseFormReturn<T>;
}

export default function ActionUpdate<T extends FieldValues>({
  title,
  description,
  children,
  handleSubmit,
  onSuccess,
  onError,
  icon,
  reactHookForm,
  ...props
}: ActionUpdateProps<T>) {
  const mutation = useMutation({
    mutationFn: async (values: T) => {
      console.log(values);
      await handleSubmit(values);
    },
    onSuccess: () => {
      toast.success('Updated successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to update');
      onError?.();
    },
  });

  return (
    <ActionModal title={title} description={description} icon={icon} {...props}>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (reactHookForm) {
            reactHookForm.handleSubmit(data => mutation.mutate(data))(e);
          } else {
            const formData = new FormData(e.currentTarget);
            const values = Object.fromEntries(formData.entries()) as unknown as T;
            mutation.mutate(values);
          }
        }}
        className="flex flex-col gap-3"
      >
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </form>
    </ActionModal>
  );
}
