import { useTranslation } from "react-i18next";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

interface RHFInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;

  label?: string;
  description?: string;
  placeholder?: string;

  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: string;
  disabled?: boolean;
}

export function RHFInput<T extends FieldValues>({
  name,
  control,
  label,
  description,
  placeholder,
  type = "text",
  autoComplete = "off",
  disabled,
}: RHFInputProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{t(label)}</FieldLabel>}

          <Input
            {...field}
            type={type}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder ? t(placeholder) : undefined}
          />

          {description && <FieldDescription>{t(description)}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
