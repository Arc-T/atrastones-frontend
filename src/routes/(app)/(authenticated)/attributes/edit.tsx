import { RHFInput } from "@/components/custom/form/input";
import { RHFSelect } from "@/components/custom/form/select";
import { RHFSwitch } from "@/components/custom/form/switch";
import PageHeader from "@/components/custom/page-header";
import { SelectResource } from "@/components/custom/select-resource";
import { FieldGroup } from "@/components/ui/field";
import {
  useGetAttribute,
  useGetAttributeTypes,
  useUpdateAttribute,
} from "@/hooks/use-attributes";
import { useGetCategories } from "@/hooks/use-categories";
import { mapToSelectOptions } from "@/lib/utils";
import {
  useCreateAttributeForm,
  type CreateAttributeFormValues,
} from "@/types/attribute";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Save,
  X,
  AlertCircle,
  Loader2,
  Info,
  Edit3,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export function AttributesEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: updateAttribute, isPending } = useUpdateAttribute();
  const {
    data: categories,
    isPending: isPendingCategories,
    isError: isCategoriesError,
  } = useGetCategories();

  const { data: attribute, isLoading: isLoadingAttribute } = useGetAttribute(
    Number(id),
  );
  const {
    data: attributeTypes,
    isPending: isPendingAttributeTypes,
    isError: isAttributeTypeError,
  } = useGetAttributeTypes();

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    reset,
  } = useCreateAttributeForm(attribute);

  // Handle loading state
  if (isLoadingAttribute) {
    return (
      <>
        <PageHeader title={t("edit_selected_attribute")} />
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-10 w-full animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </>
    );
  }

  // No ID selected
  if (!id) {
    return (
      <SelectResource
        title="select_attribute_first"
        header="select_attribute"
        description="select_attribute_description"
        resourcePath="/attributes"
        resourceLabel={t("Browse Attributes")}
      />
    );
  }

  // Handle attribute not found
  if (!attribute) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-destructive">
          {t("Attribute not found")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(
            "The attribute you're trying to edit doesn't exist or has been deleted",
          )}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/attributes")}
        >
          {t("View All Attributes")}
        </Button>
      </div>
    );
  }

  function onSubmit(formValues: CreateAttributeFormValues) {
    updateAttribute(
      { id: Number(id), data: formValues },
      {
        onSuccess: () => {
          toast.success(t("Attribute updated successfully"));
          navigate(`/attributes/${id}`);
        },
      },
    );
  }

  const handleCancel = () => {
    if (isDirty) {
      if (
        confirm(t("You have unsaved changes. Are you sure you want to leave?"))
      ) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      {/* Header with Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div>
            <PageHeader
              title={t("edit_selected_attribute")}
              // className="mb-0"
            />
            <p className="text-sm text-muted-foreground">
              {t("Editing")}:{" "}
              <span className="font-medium">{attribute?.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        id="edit-attribute-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 w-full rounded-2xl border border-border bg-card shadow-sm"
        aria-busy={isPendingCategories || isPendingAttributeTypes}
      >
        <div className="p-4 sm:p-6">
          {/* Form Status Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/30 px-4 py-2">
            <div className="flex items-center gap-2 text-sm">
              <Edit3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Editing attribute details")}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {hasErrors && (
                <span className="flex items-center gap-1 text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {t("Has errors")}
                </span>
              )}
              {isDirty && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Info className="h-3 w-3" />
                  {t("Unsaved changes")}
                </span>
              )}
              {!isDirty && !hasErrors && (
                <span className="text-muted-foreground">{t("No changes")}</span>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <FieldGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Name Field */}
            <RHFInput
              name="name"
              control={control}
              label="name"
              placeholder="attribute_name_placeholder"
            />

            {/* Category Select */}
            <RHFSelect
              name="categoryId"
              isPending={isPendingCategories}
              control={control}
              isError={isCategoriesError}
              label={"category"}
              description={"select_category"}
              options={mapToSelectOptions(categories?.content)}
            />

            {/* Type Select */}
            <RHFSelect
              name="type"
              isPending={isPendingAttributeTypes}
              control={control}
              isError={isAttributeTypeError}
              label={"attribute_type"}
              valueType="string"
              description={"select_attribute_type"}
              options={
                attributeTypes?.map((item) => ({
                  value: item,
                  label: item,
                })) ?? []
              }
            />

            {/* Filterable Switch */}
            <div className="flex items-end">
              <RHFSwitch
                name="isFilterable"
                control={control}
                label="multi_factor_authentication"
                description="enable_mfa_description"
              />
            </div>
          </FieldGroup>

          {/* Help Text */}
          <div className="mt-4 rounded-lg bg-primary/5 p-3 text-xs text-muted-foreground">
            <Info className="mr-1 inline-block h-3 w-3" />
            {t("All fields marked with * are required")}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3 sm:px-6">
          <div className="text-xs text-muted-foreground">
            <span>{t("Last updated")}: </span>
            <span className="font-mono">{new Date().toLocaleString()}</span>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => reset()}
              disabled={!isDirty || isPending}
            >
              {t("Reset")}
            </Button>
            <Button
              type="submit"
              form="edit-attribute-form"
              size="sm"
              disabled={!isValid || !isDirty || isPending}
              className="gap-2"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {t("Save")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
