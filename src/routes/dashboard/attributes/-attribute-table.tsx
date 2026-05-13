import type { ColumnDef } from "@tanstack/react-table";
import type { Attribute } from "@/types/attribute";
import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import { Badge } from "@/components/ui/badge";

export const attributeListColumn: ColumnDef<Attribute>[] = [
  {
    accessorKey: "name",
    header: "name",
    enableSorting: true,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "isFilterable",
    header: "is_filterable",
    enableSorting: false,
    cell: ({ row }) => {
      const value = row.original.isFilterable;
      return value ? (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          بله
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          خیر
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "category_name",
    enableSorting: false,
    cell: ({ row }) => {
      const category = row.original.category;
      return <span>{category?.name ?? "-"}</span>;
    },
  },
];

export const AttributeFilters = (): ReactNode => {
  return (
    <>
      <Select value={"test"}>
        <SelectTrigger className="w-40 bg-white dark:bg-slate-900">
          <SelectValue placeholder={t("status")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("all")}</SelectItem>
          <SelectItem value="draft">{t("draft")}</SelectItem>
          <SelectItem value="published">{t("published")}</SelectItem>
          <SelectItem value="archived">{t("archived")}</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={t("min_price")}
          className="w-32 bg-white dark:bg-slate-900"
        />
        <span className="text-slate-400">-</span>
        <Input
          type="number"
          placeholder={t("max_price")}
          className="w-32 bg-white dark:bg-slate-900"
        />
      </div>
    </>
  );
};
