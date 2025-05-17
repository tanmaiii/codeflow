import { Control, Controller, FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';
import { MultiSelect as MultiSelectShadeUI } from '../../ui/multi-select';
import { Label } from '@/components/ui/label';

interface Props<T extends FieldValues = FieldValues> {
  label: string;
  id?: string;
  name: Path<T>;
  control?: Control<T>;
  type?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  options: { label: string; value: string }[];
  defaultValue?: string[];
}

export default function MyMultiSelect<T extends FieldValues>({
  label,
  id,
  control,
  name,
  registration,
  error,
  options,
  defaultValue,
  ...props
}: Props<T>) {
  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id} className="mb-2 text-color-2">
        {label}
      </Label>
      <Controller
        name={name ?? ''}
        control={control}
        render={({ field }) => (
          <MultiSelectShadeUI
            options={options}
            defaultValue={defaultValue}
            {...registration}
            {...props}
            onValueChange={field.onChange}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
