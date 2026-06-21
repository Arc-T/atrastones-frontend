import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/custom/page-header";
import { attributeListColumn } from "./-column";
import { useGetAttributes } from "@/hooks/use-attributes";
import DataTable from "@/components/custom/datatable/table";
import type { AttributeFilter } from "@/types/attribute";
import { useState } from "react";
import ActionBar from "@/components/custom/datatable/search-bar";
import AttributeSearch from "./-search";
import { UNPAGED } from "@/types/page";

export const Route = createFileRoute("/(app)/(authenticated)/dashboard/attributes/")({
  component: AttributesIndex,
  context: () => ({ breadcrumb: "attributes" }),
});

function AttributesIndex() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Partial<AttributeFilter>>(UNPAGED);
  const { isLoading, data: attributes } = useGetAttributes(filter);

  return (
    <>
      <PageHeader title={t("attributes_list")} />
      <div className="space-y-2">
        <div className="flex items-center justify-start gap-4">
          <div className="flex-1">
            <ActionBar addLink={""}>
              <AttributeSearch
                onSearch={(params) => setFilter(params)}
                onClear={() => setFilter(UNPAGED)}
              />
            </ActionBar>
          </div>
        </div>

        <DataTable
          columns={attributeListColumn}
          data={attributes}
          isLoading={isLoading}
          onPaginationClick={(page) => setFilter(page)}
        />
      </div>
    </>
  );
}
