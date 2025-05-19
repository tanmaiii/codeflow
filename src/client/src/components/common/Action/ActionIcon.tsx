import { Button } from '@/components/ui/button';
import { Pencil, Trash, Eye, Plus } from 'lucide-react';
import { MyTooltip } from '@/components/common/MyTooltip';

type ActionIconType = 'update' | 'delete' | 'view' | 'create' | 'default' | 'non-icon';

export interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType?: ActionIconType;
  children?: React.ReactNode;
}

export default function ActionIcon({
  actionType = 'default',
  children,
  ...props
}: ActionIconProps) {
  if (actionType === 'default') {
    return (
      <MyTooltip content={'Action'}>
        <Button variant="outline" size="sm" className="w-fit" {...props}>
          {children}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'update') {
    return (
      <MyTooltip content="Update">
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Pencil />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete') {
    return (
      <MyTooltip content="Delete">
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Trash />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'view') {
    return (
      <MyTooltip content="View">
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Eye />
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'create') {
    return (
      <MyTooltip content="Create">
        <Button className="text-color-2 hover:text-primary" variant="none" {...props}>
          <Plus />
        </Button>
      </MyTooltip>
    );
  }
}
