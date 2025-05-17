import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, Control, Path, FieldValues, FieldError, PathValue } from 'react-hook-form';
import { getCurrentLocale } from '@/lib/utils';
import { Label } from '@/components/ui/label';
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
}: MySelectProps<T>) {
  const currentLocale = getCurrentLocale();

  if (control) {
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
                <SelectValue placeholder={`Select ${label}`} />
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
      <Select disabled={disabled}>
        <SelectTrigger className={`w-full !h-13 !rounded-lg ${className}`}>
          <SelectValue placeholder={`Select ${label}`} />
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
