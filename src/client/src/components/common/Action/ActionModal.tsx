import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ActionIcon, { ActionIconProps } from './ActionIcon';

export interface ActionModalProps extends ActionIconProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function ActionModal({
  title,
  description,
  children,
  icon,
  ...props
}: ActionModalProps) {
  if (props.actionType === 'default') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <ActionIcon {...props}>{icon}</ActionIcon>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActionIcon {...props} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
