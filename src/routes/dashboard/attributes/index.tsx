import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Package, } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/custom/data-table";
import PageHeader from "@/components/custom/page-header";
import { attributeListColumn, filters } from "./-attribute-table";
import { useGetAttributes } from "@/hooks/use-attributes";

export const Route = createFileRoute("/dashboard/attributes/")({
  component: AttributesIndex,
});

export default function AttributesIndex() {
  const { t } = useTranslation();
  const { isLoading, data: attriubtes} = useGetAttributes();

  return (
    <>
      <PageHeader
        title={t("products")}
        action={
          <Link to="/dashboard/products">
            <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              <Plus className="w-4 h-4" /> {t("add")}
            </Button>
          </Link>
        }
      />
      <DataTable
        columns={attributeListColumn}
        data={attriubtes}
        isLoading={isLoading}
        filters={filters}
        emptyIcon={<Package className="w-10 h-10" />}
      />
    </>
  );
}
