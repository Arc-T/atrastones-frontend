import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
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
import Pagination from "./pagination";
import type { PaginatedResponse } from "@/types/page";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: PaginatedResponse<TData>;
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  pageSize?: number;
}

export default function DataTable<TData, TValue>({
  columns = [],
  data,
  isLoading = false,
  onRowClick,
  pageSize: defaultPageSize = 10,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const tableData = useMemo(() => data?.content || [], [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.page.totalPages ?? -1,
  });

  const paginatedData = table.getRowModel().rows.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  };

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-200 dark:border-slate-700"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap ${header.column.getCanSort()
                        ? "cursor-pointer select-none hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        : ""
                        }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {header.column.getCanSort() && (
                          <SortIcon
                            sortDirection={header.column.getIsSorted()}
                          />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
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
                paginatedData.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.025 }}
                    onClick={() => onRowClick?.(row.original)}
                    className={`border-b border-slate-50 dark:border-slate-800/50 last:border-0 transition-colors ${onRowClick
                      ? "cursor-pointer hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20"
                      : "hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                      }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-sm text-slate-700 dark:text-slate-300"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
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
        totalItems={tableData.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
}

// Helper component for sort icons
function SortIcon({ sortDirection }: { sortDirection: false | "asc" | "desc" }) {
  if (sortDirection === "asc") {
    return <ArrowUp className="w-3 h-3 text-indigo-500" />;
  }
  if (sortDirection === "desc") {
    return <ArrowDown className="w-3 h-3 text-indigo-500" />;
  }
  return <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" />;
}