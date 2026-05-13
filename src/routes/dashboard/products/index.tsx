import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Package, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageWrapper from "@/components/custom/page-wrappers";
import Breadcrumb from "@/components/custom/auto-breadcrumb";
import PageHeader from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/custom/data-table";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/products/")({
  component: ProductsIndex,
});

function ProductsIndex() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => console.log("products"),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => console.log("products"),
  });

  const deleteMutation = useMutation({
    mutationFn: () => console.log("products"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat
      ? lang === "fa"
        ? cat.name_fa || cat.name_en
        : cat.name_en
      : "—";
  };

  const columns = [
    {
      accessorKey: "name_en",
      header: t("name"),
      cell: (row) => (
        <div className="flex items-center gap-3">
          {row.images?.[0] ? (
            <img
              src={row.images[0]}
              alt=""
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Package className="w-4 h-4 text-slate-400" />
            </div>
          )}
          <div>
            <p className="text-xs text-slate-400">{row.sku}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: t("price"),
      cell: (row) => (
        <span className="font-semibold">${row.price?.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "stock",
      header: t("stock"),
      cell: (row) => (
        <span
          className={`font-medium ${(row.stock || 0) < 10 ? "text-red-500" : "text-slate-700 dark:text-slate-300"}`}
        >
          {row.stock || 0}
        </span>
      ),
    },
    {
      accessorKey: "category_id",
      header: t("category"),
      cell: (row) => getCategoryName(row.category_id),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: (row) => "draft",
    },
    {
      id: "actions",
      header: t("actions"),
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Link to={"ProductEdit" + `?id=${row.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              deleteMutation.mutate(row.id);
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const filters = [
    {
      key: "status",
      label: t("status"),
      options: [
        { value: "draft", label: t("draft") },
        { value: "published", label: t("published") },
        { value: "archived", label: t("archived") },
      ],
    },
  ];

  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: t("catalog") }, { label: t("products") }]} />
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
    </PageWrapper>
  );
}
