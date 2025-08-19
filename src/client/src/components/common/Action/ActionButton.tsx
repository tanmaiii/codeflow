import { MyTooltip } from '@/components/common/MyTooltip';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type ActionButtonType =
  | 'update'
  | 'delete'
  | 'view'
  | 'create'
  | 'default'
  | 'restore'
  | 'delete-soft'
  | 'button';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType?: ActionButtonType;
  label?: string;
}

export default function ActionButton({
  actionType = 'default',
  label,
  ...props
}: ActionButtonProps) {
  const t = useTranslations('common');

  if (actionType === 'default') {
    return (
      <MyTooltip content={t('action')}>
        <Button variant="outline" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }

  if (actionType === 'restore') {
    return (
      <MyTooltip content={t('restore')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete') {
    return (
      <MyTooltip content={t('delete')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'update') {
    return (
      <MyTooltip content={t('update')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'delete-soft') {
    return (
      <MyTooltip content={t('deleteSoft')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'view') {
    return (
      <MyTooltip content={t('view')}>
        <Button variant="default" size="sm" className="w-fit" {...props}>
          {label}
        </Button>
      </MyTooltip>
    );
  }
  if (actionType === 'create') {
    return (
      <MyTooltip content={t('create')}>
        <Button
          variant="default"
          size="sm"
          className="w-fit bg-green-500 text-white hover:bg-green-500/90"
          {...props}
        >
          <IconPlus className="w-4 h-4" />
          {label}
        </Button>
      </MyTooltip>
    );
  }
}
