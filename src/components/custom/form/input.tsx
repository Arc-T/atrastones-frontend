import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type ControllerRenderProps,
} from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RHFInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;

  label?: string;
  description?: string;
  placeholder?: string;

  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: string;
  disabled?: boolean;

  icon?: ReactNode;
  inputClassName?: string;
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
  icon,
  inputClassName,
}: RHFInputProps<T>) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const renderInput = (
    field: ControllerRenderProps<T, FieldPath<T>>,
    invalid: boolean,
  ) => (
    <div className="relative">
      <Input
        {...field}
        dir={dir}
        type={type}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        placeholder={placeholder ? t(placeholder) : undefined}
        className={cn(icon && (isRTL ? "pl-10" : "pr-10"), inputClassName)}
      />

      {icon && (
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
            isRTL ? "left-3" : "right-3",
          )}
        >
          {icon}
        </span>
      )}
    </div>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { invalid, error } = fieldState;

        return (
          <Field data-invalid={invalid}>
            {label && <FieldLabel dir={dir}>{t(label)}</FieldLabel>}

            {renderInput(field, invalid)}

            {description && (
              <FieldDescription dir={dir}>{t(description)}</FieldDescription>
            )}

            {invalid && error && <FieldError dir={dir} errors={[error]} />}
          </Field>
        );
      }}
    />
  );
}
