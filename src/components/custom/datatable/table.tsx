import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
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
import type { PaginatedRequest, PaginatedResponse } from "@/types/page";
import { cn } from "@/lib/utils";

/* -------------------- props -------------------- */

interface DataTableProps<T> {
  columns: ColumnDef<T, string>[];
  data?: PaginatedResponse<T>;
  isLoading: boolean;
  onRowClick?: (row: T) => void;
  onPaginationClick: (page: PaginatedRequest) => void;
  pageSize?: number;
}

/* -------------------- component -------------------- */

export default function DataTable<T>({
  columns,
  data,
  isLoading,
  onRowClick,
  onPaginationClick,
  pageSize = 5,
}: DataTableProps<T>) {
  const { t } = useTranslation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState<PaginatedRequest>({
    page: 0,
    size: pageSize,
  });

  const rows = data?.content ?? [];
  const totalPages = data?.page?.totalPages ?? 0;

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const visibleRows = table.getRowModel().rows;

  /* -------------------- pagination sync -------------------- */

  const updatePagination = (next: Partial<PaginatedRequest>) => {
    const updated = { ...page, ...next };
    setPage(updated);
    onPaginationClick(updated);
  };

  /* -------------------- helpers -------------------- */

  const SortIcon = (dir: false | "asc" | "desc") =>
    dir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-indigo-500" />
    ) : dir === "desc" ? (
      <ArrowDown className="w-3 h-3 text-indigo-500" />
    ) : (
      <ArrowUpDown className="w-3 h-3 opacity-40" />
    );

  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-48 text-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Package className="w-10 h-10 opacity-40" />
          <p className="text-sm">{t("no_data")}</p>
        </div>
      </TableCell>
    </TableRow>
  );

  const LoadingState = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        {columns.map((_, j) => (
          <TableCell key={j}>
            <Skeleton className="h-4 w-full max-w-28" />
          </TableCell>
        ))}
      </TableRow>
    ));

  /* -------------------- UI -------------------- */

  return (
    <>
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            {/* HEADER */}
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sort = header.column.getIsSorted();

                    return (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          "text-[11px] uppercase tracking-widest text-muted-foreground",
                          canSort && "cursor-pointer select-none",
                        )}
                      >
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort && SortIcon(sort)}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {isLoading ? (
                <LoadingState />
              ) : visibleRows.length === 0 ? (
                <EmptyState />
              ) : (
                visibleRows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      "border-b last:border-0",
                      onRowClick && "cursor-pointer hover:bg-muted/50",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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

      {/* PAGINATION */}
      <Pagination
        page={page.page}
        pageSize={page.size}
        totalItems={data?.page?.totalElements ?? 0}
        onPageChange={(pageNumber: number) =>
          updatePagination({ page: pageNumber })
        }
        onPageSizeChange={(size: number) => updatePagination({ size, page: 0 })}
      />
    </>
  );
}
