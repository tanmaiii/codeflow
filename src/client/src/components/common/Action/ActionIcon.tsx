import { Button } from '@/components/ui/button';
import { Pencil, Trash, Eye, Plus } from 'lucide-react';
type ActionIconType = 'update' | 'delete' | 'view' | 'create' | 'default';

export interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: ActionIconType;
  children?: React.ReactNode;
}

export default function ActionIcon({ actionType, children, ...props }: ActionIconProps) {
  if (actionType === 'default') {
    return (
      <button {...props} className="w-full">
        {children}
      </button>
    );
  }
  if (actionType === 'update') {
    return (
      <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
        <Pencil />
      </Button>
    );
  }
  if (actionType === 'delete') {
    return (
      <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
        <Trash />
      </Button>
    );
  }
  if (actionType === 'view') {
    return (
      <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
        <Eye />
      </Button>
    );
  }
  if (actionType === 'create') {
    return (
      <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
        <Plus />
      </Button>
    );
  }
}
