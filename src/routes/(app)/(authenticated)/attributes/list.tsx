import { useTranslation } from "react-i18next";
import PageHeader from "@/components/custom/page-header";
import { attributeListColumn } from "./-column";
import { useGetAttributes } from "@/hooks/use-attributes";
import DataTable from "@/components/custom/datatable/table";
import type { AttributeFilter } from "@/types/attribute";
import { useState, useMemo } from "react";
import ActionBar from "@/components/custom/datatable/search-bar";
import AttributeSearch from "./-search";
import { UNPAGED } from "@/types/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  RefreshCw,
  Download,
  Filter,
  AlertCircle,
  FileUp,
  Settings2,
  LayoutGrid,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function AttributesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Partial<AttributeFilter>>(UNPAGED);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    isLoading,
    data: attributes,
    refetch,
    error,
  } = useGetAttributes(filter);

  const totalCount = attributes?.page?.totalElements ?? 0;
  const hasFilters = useMemo(() => {
    return Object.keys(filter).some(
      (key) =>
        key !== "page" &&
        key !== "size" &&
        filter[key as keyof AttributeFilter] !== undefined,
    );
  }, [filter]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success(t("Data refreshed successfully"));
    } catch {
      toast.error(t("Failed to refresh data"));
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    toast.info(t("Exporting data..."));
    // Implement export logic
  };

  const handleAddNew = () => {
    navigate("/attributes/new");
  };

  const handleClearFilters = () => {
    setFilter(UNPAGED);
    toast.info(t("Filters cleared"));
  };

  // Error State
  if (error) {
    return (
      <>
        <PageHeader title={t("attributes_list")} />
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {t("Failed to load attributes")}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {t(
                "There was an error loading the attribute list. Please try again.",
              )}
            </p>
            <Button
              variant="outline"
              className="mt-4 gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              {t("Retry")}
            </Button>
          </div>
        </Card>
      </>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <PageHeader title={t("attributes_list")} />
          <p className="mt-1 text-sm text-muted-foreground">
            {t("Manage your attributes and their properties")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-md border border-border">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none h-9 w-9"
              onClick={() => setViewMode("table")}
              aria-label={t("Table view")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none h-9 w-9"
              onClick={() => setViewMode("grid")}
              aria-label={t("Grid view")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>

          {/* Add New Button */}
          <Button onClick={handleAddNew} className="gap-2 h-9">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Add Attribute")}</span>
            <span className="sm:hidden">{t("Add")}</span>
          </Button>

          {/* More Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Settings2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleRefresh} className="gap-2">
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {t("Refresh")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                {t("Export")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive">
                <FileUp className="h-4 w-4" />
                {t("Import")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-xl border bg-card">
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <ActionBar addLink={""}>
              <AttributeSearch
                onSearch={(params) => setFilter(params)}
                onClear={() => setFilter(UNPAGED)}
              />
            </ActionBar>
          </div>

          <div className="flex items-center gap-2">
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground h-8"
              >
                {t("Clear Filters")}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Data Table */}
        {viewMode === "table" ? (
          <DataTable
            columns={attributeListColumn}
            data={attributes}
            isLoading={isLoading}
            onRowClick={(row) => navigate(`/attributes/${(row as any).id}`)}
            onPaginationClick={(page) => setFilter(page)}
            pageSize={filter.size || 5}
          />
        ) : (
          // Grid View (Optional - can be implemented later)
          <div className="p-6 text-center text-muted-foreground">
            {t("Grid view coming soon")}
          </div>
        )}
      </div>
    </div>
  );
}
