import { RHFSubmitButton } from "@/components/custom/elements/form/button";
import { RHFInput } from "@/components/custom/elements/form/input";
import { RHFSelect } from "@/components/custom/elements/form/select";
import { RHFSwitch } from "@/components/custom/elements/form/switch";
import { RHFTextarea } from "@/components/custom/elements/form/text-area";
import PageHeader from "@/components/custom/page-header";
import { FieldGroup } from "@/components/ui/field";
import {
  useGetAttribute,
  useGetAttributeTypes,
  useUpdateAttribute,
} from "@/hooks/use-attributes";
import { useGetCategories } from "@/hooks/use-categories";
import { mapToSelectOptions } from "@/lib/utils";
import { CustomIsErrorPage } from "@/pages/is-error";
import { CustomIsLoadingPage } from "@/pages/is-loading";
import { CustomNoResourcePage } from "@/pages/no-resource";
import {
  useCreateAttributeForm,
  type CreateAttributeFormValues,
} from "@/types/attribute";
import {
  Edit,
  FileText,
  Filter,
  FolderTree,
  HelpCircle,
  Info,
  Shapes,
  Sparkles,
  Tag,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
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

  const {
    data: attributeTypes,
    isPending: isPendingAttributeTypes,
    isError: isAttributeTypeError,
  } = useGetAttributeTypes();

  const { data: attribute, isLoading: isLoadingAttribute } = useGetAttribute(
    Number(id),
  );

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useCreateAttributeForm(attribute);

  if (isLoadingAttribute) {
    return <CustomIsLoadingPage />;
  }

  if (!id) {
    return (
      <CustomNoResourcePage
        title="select_attribute_first"
        header="select_attribute"
        description="select_attribute_description"
        resourcePath="/attributes"
        resourceLabel={t("Browse Attributes")}
      />
    );
  }

  if (!attribute) {
    return <CustomIsErrorPage />;
  }

  function onSubmit(values: CreateAttributeFormValues) {
    updateAttribute(
      {
        id: Number(id),
        data: values,
      },
      {
        onSuccess: () => {
          toast.success(t("Attribute updated successfully"));
          navigate(`/attributes/${id}`);
        },
      },
    );
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="edit"
          icon={<Edit />}
          resourceId={id}
          resourceName={attribute.name}
        />

        <form
          id="edit-attribute-form"
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-sm font-medium">{t("ai_helper")}</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.open("/docs/attributes", "_blank")}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <HelpCircle className="size-3.5" />
                {t("need_help")}?
              </button>

              <span className="h-4 w-px bg-border" />

              <button
                type="button"
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <FileText className="size-3.5" />
                {t("view_examples")}
              </button>
            </div>
          </div>

          <FieldGroup className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
            <RHFInput
              name="name"
              control={control}
              label="name"
              placeholder="attribute_name_placeholder"
              icon={<Tag className="size-5" />}
              required
            />

            <RHFSelect
              name="categoryId"
              control={control}
              isPending={isPendingCategories}
              isError={isCategoriesError}
              label="category"
              description="select_category"
              options={mapToSelectOptions(categories?.content)}
              icon={<FolderTree className="size-5" />}
              required
            />

            <RHFSwitch
              name="isFilterable"
              control={control}
              label="attribute_is_filterable"
              description="attribute_is_filterable_description"
              icon={<Filter className="size-5" />}
            />

            <RHFSelect
              name="type"
              control={control}
              isPending={isPendingAttributeTypes}
              isError={isAttributeTypeError}
              label="attribute_type"
              description="attribute_type_description"
              valueType="string"
              options={
                attributeTypes?.map((item) => ({
                  value: item,
                  label: item,
                })) ?? []
              }
              icon={<Shapes className="size-5" />}
              required
            />

            <div className="lg:col-span-2 space-y-4">
              <RHFTextarea
                name="description"
                control={control}
                label="attribute_description"
                rows={5}
                icon={<FileText className="size-5" />}
              />

              <span className="flex items-center gap-1.5 rounded-lg bg-primary/5 p-3 text-xs text-muted-foreground">
                <Info className="size-3" />
                <span className="text-destructive">*</span>
                {t("required_fields_are_marked")}
              </span>
            </div>
          </FieldGroup>

          <div className="flex justify-end border-t border-border px-6 py-4">
            <RHFSubmitButton
              isSubmitting={isPending}
              disabled={!isDirty || !isValid}
              defaultText="update"
            ></RHFSubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}
