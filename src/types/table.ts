import type { ColumnDef } from "@tanstack/react-table";
import type { Pagination } from "./page";

export type DataTableProps<TData, TParams extends Pagination> = {
  columns: ColumnDef<TData>[];
  fetchData: (params: TParams) => Promise<any>;
  queryKey: string;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  mapParams?: (p: Pagination, search: string) => TParams;
  showIndexColumn?: boolean;
  searchField?: string;
};