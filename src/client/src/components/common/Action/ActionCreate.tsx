import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import ActionModal, { ActionModalProps } from './ActionModal';

interface ActionCreateProps<T extends FieldValues> extends Omit<ActionModalProps, 'onSubmit'> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  handleSubmit: (values: T) => void;
  onSuccess?: () => void;
  onError?: () => void;
  reactHookForm?: UseFormReturn<T>;
}

export default function ActionCreate<T extends FieldValues>({
  title,
  description,
  children,
  handleSubmit,
  onSuccess,
  onError,
  icon,
  reactHookForm,
  ...props
}: ActionCreateProps<T>) {
  const mutation = useMutation({
    mutationFn: async (values: T) => {
      console.log(values);
      await handleSubmit(values);
    },
    onSuccess: () => {
      toast.success('Created successfully');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to create');
      onError?.();
    },
  });

  return (
    <ActionModal
      title={title}
      description={description}
      icon={icon}
      {...props}
      actionType={props.actionType ?? 'create'}
    >
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
            {mutation.isPending ? 'Creating...' : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </ActionModal>
  );
}
