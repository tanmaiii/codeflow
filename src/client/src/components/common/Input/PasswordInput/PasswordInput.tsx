import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cx } from 'class-variance-authority';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export default function PasswordInput({
  label,
  id,
  registration,
  error,
  ...props
}: FormFieldProps) {
  const t = useTranslations('common');
  const [isOff, setIsOff] = useState<boolean>(false);

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id} className="mb-2 text-color-2">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          autoComplete="off"
          id={id}
          type={isOff ? 'text' : 'password'}
          className={cx('bg-background-1', error && 'border-1 border-red-500')}
          placeholder={t('enter') + ' ' + label}
          {...registration}
          {...props}
        />
        <Button
          onClick={() => setIsOff(!isOff)}
          variant="none"
          type="button"
          className="border-0 absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-color-1 hover:bg-transparent focus:bg-transparent active:bg-transparent"
        >
          {!isOff ? (
            <EyeIcon style={{ width: '24px', height: '24px' }} />
          ) : (
            <EyeOff style={{ width: '24px', height: '24px' }} />
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
