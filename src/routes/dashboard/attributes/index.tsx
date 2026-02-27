import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Package,  } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/custom/data-table";
import PageHeader from "@/components/custom/page-header";

export const Route = createFileRoute("/dashboard/attributes/")({
  component: AttributesIndex,
});

export default function AttributesIndex() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t("products")}
        action={
          <Link to={"ProductEdit"}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              <Plus className="w-4 h-4" /> {t("add")}
            </Button>
          </Link>
        }
      />
      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        filters={filters}
        emptyIcon={<Package className="w-10 h-10" />}
      />
    </>
  );
}
