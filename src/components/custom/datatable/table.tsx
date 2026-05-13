import { useState, useMemo, type ReactNode } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Package } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { ColumnDef } from "@tanstack/react-table";
import FilterBar from "./filter";
import Pagination from "./pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  searchable?: boolean;
  addLink: string;
  pageSize?: number;
  onSearch?: (value: string) => void;
  filterBarChildren?: ReactNode;
  activeFilterCount?: number;
  onClearFilters?: () => void;
  actions?: ReactNode;
  // Custom filter function for complex filtering
  customFilter?: (data: TData[]) => TData[];
}

export default function DataTable<TData>({
  columns = [],
  data = [],
  isLoading = false,
  onRowClick,
  addLink,
  searchable,
  pageSize: defaultPageSize = 10,
  onSearch,
  filterBarChildren,
  onClearFilters,
  actions,
  customFilter,
}: DataTableProps<TData>) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    dir: "asc" | "desc";
  }>({ key: null, dir: "asc" });

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply custom filter if provided
    if (customFilter) {
      result = customFilter(result);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a: any, b: any) => {
        const aVal = a[sortConfig.key!];
        const bVal = b[sortConfig.key!];
        if (aVal < bVal) return sortConfig.dir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.dir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, sortConfig, customFilter]);

  const paginatedData = filteredData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  };

  return (
    <div className="space-y-2">
      {/* Header row with Add button + Filter bar */}
      <div className="flex items-center justify-start gap-4">
        {/* Filter bar - remove any margin/padding that might affect layout */}
        <div className="flex-1">
          {searchable && (
            <FilterBar onClearFilters={onClearFilters} actions={actions} addLink={""}>
              {filterBarChildren}
            </FilterBar>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-200 dark:border-slate-700">
                {columns.map((col: any) => (
                  <TableHead
                    key={col.accessorKey || col.id}
                    onClick={() =>
                      col.accessorKey && handleSort(col.accessorKey)
                    }
                    className={`text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap ${
                      col.accessorKey
                        ? "cursor-pointer select-none hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {t(col.header)}
                      {col.accessorKey &&
                        (sortConfig.key === col.accessorKey ? (
                          sortConfig.dir === "asc" ? (
                            <ArrowUp className="w-3 h-3 text-indigo-500" />
                          ) : (
                            <ArrowDown className="w-3 h-3 text-indigo-500" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        ))}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow
                      key={i}
                      className="border-b border-slate-50 dark:border-slate-800/50"
                    >
                      {columns.map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full max-w-30 rounded-lg" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center"
                  >
                    <div className="flex flex-col items-center gap-3 text-slate-300 dark:text-slate-600">
                      <div className="opacity-40">
                        <Package className="w-10 h-10" />
                      </div>
                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        {t("no_data")}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row: any, i: number) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.025 }}
                    onClick={() => onRowClick?.(row)}
                    className={`border-b border-slate-50 dark:border-slate-800/50 last:border-0 transition-colors ${
                      onRowClick
                        ? "cursor-pointer hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20"
                        : "hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                    }`}
                  >
                    {columns.map((col: any) => (
                      <td
                        key={col.accessorKey || col.id}
                        className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                      >
                        {col.cell ? col.cell(row) : row[col.accessorKey]}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
