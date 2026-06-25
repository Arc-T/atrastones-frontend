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
  valueType?: "string" | "number";
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
  valueType = "number",
  isPending = false,
  isError = false,
}: FormSelectProps<T>) {
  const { t, i18n } = useTranslation();
  const selectDisabled = disabled || isPending || isError;
  const statusKey = isPending
    ? "loading"
    : isError
      ? "failed_to_fetch"
      : "select";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid || isError;

        return (
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
              onValueChange={(value) =>
                field.onChange(valueType === "number" ? Number(value) : value)
              }
            >
              <SelectTrigger
                dir={i18n.dir()}
                aria-invalid={isInvalid}
                className={`flex w-full items-center justify-between gap-2${isError ? " border-destructive data-placeholder:text-destructive" : ""}`}
              >
                <SelectValue placeholder={t(statusKey)} />
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {isError && <AlertCircle className="size-4 text-destructive" />}
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
        );
      }}
    />
  );
}
