import { useState, useRef, type ReactNode } from "react";
import { Search, Filter, X, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface FilterBarProps {
  addLink: string;
  onSearch?: (value: string) => void;
  children?: ReactNode;
  activeFilterCount?: number;
  onClearFilters?: () => void;
  actions?: ReactNode;
}

export default function FilterBar({
  children,
  addLink,
  onClearFilters,
  actions,
}: FilterBarProps) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white gap-2"
        >
          <Filter className="w-4 h-4" />
          {t("filter")}
        </Button>

        <Link to={addLink}>
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            {t("add")}
          </Button>
        </Link>

        {actions}
      </div>

      <div
        ref={filtersRef}
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: showFilters ? "1fr" : "0fr",
          opacity: showFilters ? 1 : 0,
        }}
      >
        <div className="overflow-hidden space-y-2 mt-3 mb-1">
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
            {children}
            {onClearFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-500 hover:text-red-600 gap-1"
              >
                <X className="w-3 h-3" /> {t("clear")}
              </Button>
            )}
            <Button size="sm">{t("apply")}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
