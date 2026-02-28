import { Package, Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Attribute } from "@/types/attribute";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const attributeListColumn: ColumnDef<Attribute>[] = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({row}) => (
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
    header: "price",
    cell: ({row}) => (
      <span className="font-semibold">${row.price?.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "stock",
    cell: ({row}) => (
      <span
        className={`font-medium ${(row.stock || 0) < 10 ? "text-red-500" : "text-slate-700 dark:text-slate-300"}`}
      >
        {row.stock || 0}
      </span>
    ),
  },
  {
    accessorKey: "category_id",
    header: "category",
    cell: ({row}) => getCategoryName(row.category_id),
  },
  {
    accessorKey: "status",
    header: "status",
    cell: () => "draft",
  },
  {
    id: "actions",
    header: "actions",
    cell: ({row}) => (
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

export const filters = [
  {
    key: "status",
    label: "status",
    options: [
      { value: "draft", label: "draft" },
      { value: "published", label: "published" },
      { value: "archived", label: "archived" },
    ],
  },
];