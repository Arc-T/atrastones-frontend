import { RHFSubmitButton } from "@/components/custom/elements/form/button";
import { RHFInput } from "@/components/custom/elements/form/input";
import { RHFSelect } from "@/components/custom/elements/form/select";
import { RHFSwitch } from "@/components/custom/elements/form/switch";
import { RHFTextarea } from "@/components/custom/elements/form/text-area";
import PageHeader from "@/components/custom/page-header";
import { FieldGroup } from "@/components/ui/field";
import {
  useCreateAttribute,
  useGetAttributeTypes,
} from "@/hooks/use-attributes";
import { useGetCategories } from "@/hooks/use-categories";
import { mapToSelectOptions } from "@/lib/utils";
import {
  useCreateAttributeForm,
  type CreateAttributeFormValues,
} from "@/types/attribute";
import {
  FileText,
  Filter,
  FolderTree,
  HelpCircle,
  PenBox,
  Shapes,
  Tag,
  Sparkles,
  Info,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function AttributesCreate() {
  const { t } = useTranslation();
  const { mutate: createAttribute, isPending } = useCreateAttribute();
  const {
    data: categories,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = useGetCategories();
  const {
    data: attributeTypes,
    isPending: isPendingAttributeTypes,
    isError: isErrorAttributeTypes,
  } = useGetAttributeTypes();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useCreateAttributeForm();

  function onSubmit(values: CreateAttributeFormValues) {
    createAttribute(values);
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t("create_new_attribute")} icon={<PenBox />} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-border bg-card shadow-sm"
      >
        {/* Card Header - Now actually useful! */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/30 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-sm font-medium">{t("ai_helper")}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open("/docs/attributes", "_blank")}
            >
              <HelpCircle className="size-3.5" />
              {t("need_help")}?
            </button>
            <span className="h-4 w-px bg-border" />
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
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
            isError={isErrorCategories}
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
            isError={isErrorAttributeTypes}
            label="attribute_type"
            description="attribute_type_description"
            valueType="string"
            options={
              attributeTypes?.map((item) => ({ value: item, label: item })) ??
              []
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
            <span className="rounded-lg text-xs text-muted-foreground flex items-center gap-1.5 bg-primary/5 p-3">
              <Info className="mr-1 inline-block h-3 w-3" />
              <span className="text-destructive">*</span>{" "}
              {t("required_fields_are_marked")}
            </span>
          </div>
        </FieldGroup>

        <div className="flex justify-end border-t border-border px-6 py-4">
          <RHFSubmitButton isSubmitting={isPending} disabled={!isValid} />
        </div>
      </form>
    </div>
  );
}
