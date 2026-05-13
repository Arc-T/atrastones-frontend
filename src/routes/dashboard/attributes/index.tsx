import { createFileRoute} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/custom/page-header";
import { AttributeFilters, attributeListColumn } from "./-attribute-table";
import { useGetAttributes } from "@/hooks/use-attributes";
import DataTable from "@/components/custom/datatable/table";

export const Route = createFileRoute("/dashboard/attributes/")({
  component: AttributesIndex,
  context: () => ({ breadcrumb: "attributes" }),
});

function AttributesIndex() {
  const { t } = useTranslation();
  const { isLoading, data: attributes } = useGetAttributes();

  return (
    <>
      <PageHeader title={t("attributes_list")} />
      <DataTable
        columns={attributeListColumn}
        data={attributes}
        searchable={true}
        filterBarChildren={<AttributeFilters />}
        isLoading={isLoading}
      />
    </>
  );
}
