'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IStatusObj } from '@/constants/object';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';

interface MySelectProps<T extends FieldValues = FieldValues> {
  label: string;
  options: IStatusObj[];
  name: Path<T>;
  control?: Control<T>;
  error?: FieldError;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  isTranslate?: boolean;
}

export default function MySelect<T extends FieldValues>({
  options,
  name,
  control,
  error,
  defaultValue = '',
  disabled = false,
  required = false,
  className = '',
  label,
  onChange,
  isTranslate = true,
}: MySelectProps<T>) {
  // const currentLocale = getCurrentLocale();
  const t = useTranslations();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  if (control && !onChange) {
    return (
      <div className="w-full">
        <Label className="mb-2 text-color-2">{label}</Label>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue as PathValue<T, Path<T>>}
          rules={{ required }}
          render={({ field }) => (
            <Select
              value={field.value}
              required={required}
              onValueChange={field.onChange}
              disabled={disabled || field.disabled}
            >
              <SelectTrigger className={`w-full !h-13 !rounded-xl bg-background-1 ${className}`}>
                <SelectValue placeholder={`${t('common.select')} ${label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {isTranslate ? t(option.labelKey) : option.labelKey}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }

  // Support for uncontrolled usage without react-hook-form
  return (
    <div className="w-full">
      <Label className="mb-2 text-color-2">{label}</Label>
      <Select
        disabled={disabled}
        value={value}
        required={required}
        onValueChange={newValue => {
          setValue(newValue);
          onChange?.(newValue);
        }}
      >
        <SelectTrigger className={`w-full !h-13 !rounded-lg ${className}`}>
          <SelectValue placeholder={`${t('common.select')} ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.labelKey)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
