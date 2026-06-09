import { useTranslation } from "react-i18next";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { AlertCircle, Loader2 } from "lucide-react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  options: SelectOption[];

  label?: string;
  description?: string;

  disabled?: boolean;
  isPending?: boolean;
  isError?: boolean;
}

export function RHFSelect<T extends FieldValues>({
  name,
  control,
  options,
  label,
  description,
  disabled,
  isPending = false,
  isError = false,
}: FormSelectProps<T>) {
  const { t, i18n } = useTranslation();

  const placeholder = t(
    isPending ? "loading" : isError ? "failed_to_fetch" : "select",
  );

  const selectDisabled = disabled || isPending || isError;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="responsive" data-invalid={fieldState.invalid}>
          <FieldContent>
            {label && <FieldLabel>{t(label)}</FieldLabel>}

            {description && (
              <FieldDescription>{t(description)}</FieldDescription>
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>

          <Select
            disabled={selectDisabled}
            value={field.value != null ? String(field.value) : ""}
            onValueChange={(value) => {
              field.onChange(Number(value));
            }}
          >
            <SelectTrigger
              dir={i18n.dir()}
              aria-invalid={fieldState.invalid || isError}
              className={
                isError
                  ? "flex w-full items-center justify-between gap-2 border-destructive data-[placeholder]:text-destructive"
                  : "flex w-full items-center justify-between gap-2"
              }
            >
              <SelectValue placeholder={placeholder} />

              {isPending && <Loader2 className="size-4 animate-spin" />}

              {isError && <AlertCircle className="text-destructive size-4" />}
            </SelectTrigger>

            <SelectContent dir={i18n.dir()} position="item-aligned">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
