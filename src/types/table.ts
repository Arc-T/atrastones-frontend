import type { ColumnDef } from "@tanstack/react-table";
import type { PaginatedRequest } from "./page";

export type DataTableProps<TData, TParams extends PaginatedRequest> = {
  columns: ColumnDef<TData>[];
  fetchData: (params: TParams) => Promise<any>;
  queryKey: string;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  mapParams?: (p: PaginatedRequest, search: string) => TParams;
  showIndexColumn?: boolean;
  searchField?: string;
};