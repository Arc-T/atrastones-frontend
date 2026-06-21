import { useState, useRef, type ReactNode } from "react";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  addLink: string;
  onSearch?: (value: string) => void;
  children?: ReactNode;
  activeFilterCount?: number;
  onClearFilters?: () => void;
  actions?: ReactNode;
}

export default function ActionBar({
  children,
  // onClearFilters,
}: ActionBarProps) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex justify-start items-center gap-2">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="gap-2"
        >
          {t("filter")}
          <Filter className="w-4 h-4" />
        </Button>
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
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
