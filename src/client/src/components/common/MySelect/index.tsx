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
import { getCurrentLocale } from '@/lib/utils';
import { Control, Controller, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface MySelectProps<T extends FieldValues = FieldValues> {
  label: string;
  options: { label: string; value: string; labelEn?: string }[];
  name: Path<T>;
  control?: Control<T>;
  error?: FieldError;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
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
}: MySelectProps<T>) {
  const currentLocale = getCurrentLocale();
  const t = useTranslations('common');
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
              onValueChange={field.onChange}
              disabled={disabled || field.disabled}
            >
              <SelectTrigger className={`w-full !h-13 !rounded-xl ${className}`}>
                <SelectValue placeholder={`${t('select')} ${label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {currentLocale === 'vi' ? option.label : option.labelEn}
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
        onValueChange={(newValue) => {
          setValue(newValue);
          onChange?.(newValue);
        }}
      >
        <SelectTrigger className={`w-full !h-13 !rounded-lg ${className}`}>
          <SelectValue placeholder={`${t('select')} ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {currentLocale === 'vi' ? option.label : option.labelEn}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
