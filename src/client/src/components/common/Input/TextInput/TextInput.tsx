import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { cx } from 'class-variance-authority';
import { useTranslations } from 'next-intl';

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: string;
  description?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function TextInput({
  label,
  id,
  type = 'text',
  registration,
  error,
  description,
  ...props
}: FormFieldProps) {
  const t = useTranslations('common');
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-color-2 mb-2">
        {label}
      </Label>
      <Input
        autoComplete="off"
        id={id}
        type={type}
        className={cx('bg-background-1', error && 'border-1 border-red-500')}
        placeholder={t('enter') + ' ' + label}
        {...registration}
        {...props}
      />
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
