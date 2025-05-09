import { MultiSelectProps } from "../../ui/multi-select";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { MultiSelect as MultiSelectShadeUI } from "../../ui/multi-select";
import { Label } from "@/components/ui/label";

interface Props extends MultiSelectProps {
  label: string;
  id?: string;
  type?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function MyMultiSelect({
  label,
  id,
  registration,
  error,
  ...props
}: Props) {
  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id} className="mb-2 text-color-2">
        {label}
      </Label>
      <MultiSelectShadeUI {...props} {...registration} />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
