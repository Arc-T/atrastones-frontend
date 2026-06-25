import { RHFSubmitButton } from "@/components/custom/form/button";
import { RHFInput } from "@/components/custom/form/input";
import { RHFSelect } from "@/components/custom/form/select";
import { RHFSwitch } from "@/components/custom/form/switch";
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
    <>
      <PageHeader title={t("create_new_attribute")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6"
        aria-busy={isPendingCategories}
      >
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
          <RHFInput
            name="name"
            control={control}
            label="name"
            placeholder="attribute_name_placeholder"
          />

          <RHFSelect
            name="categoryId"
            isPending={isPendingCategories}
            control={control}
            isError={isErrorCategories}
            label={"category"}
            description={"select_category"}
            options={mapToSelectOptions(categories?.content)}
          />

          <RHFSelect
            name="type"
            isPending={isPendingAttributeTypes}
            control={control}
            isError={isErrorAttributeTypes}
            label={"attribute_type"}
            description={"attribute_type_description"}
            valueType="string"
            options={
              attributeTypes?.map((item) => ({
                value: item,
                label: item,
              })) ?? []
            }
          />

          <RHFSwitch
            name="isFilterable"
            control={control}
            label="attribute_is_filterable"
            description="attribute_is_filterable_description"
          />
        </FieldGroup>
        <RHFSubmitButton
          isSubmitting={isPending}
          disabled={!isValid}
          className="mt-4"
        />
      </form>
    </>
  );
}
