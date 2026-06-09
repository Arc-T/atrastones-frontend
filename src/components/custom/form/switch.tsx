import { useTranslation } from "react-i18next";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Switch } from "@/components/ui/switch";

interface RHFSwitchProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;

  label?: string;
  description?: string;

  disabled?: boolean;
  className?: string;
}

export function RHFSwitch<T extends FieldValues>({
  name,
  control,
  label,
  description,
  disabled,
}: RHFSwitchProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <FieldContent>
            {label && <FieldLabel>{t(label)}</FieldLabel>}

            {description && (
              <FieldDescription>{t(description)}</FieldDescription>
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>

          <Switch
            dir="ltr"
            id={field.name}
            name={field.name}
            checked={!!field.value}
            disabled={disabled}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
