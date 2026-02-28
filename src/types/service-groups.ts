import type { Pagination } from "./page";

export interface ServiceGroup {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceGroupFilter extends Pagination {
  name: string;
}
