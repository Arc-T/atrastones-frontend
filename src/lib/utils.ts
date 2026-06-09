import { useLocation, useNavigate } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { dir } from "i18next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRTL(): boolean {
  return dir() === "rtl";
}

export function mapToSelectOptions<T extends { id: number; name: string }>(
  items?: T[],
) {
  return (
    items?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) ?? []
  );
}

export function toQueryString(params?: Record<string, any>): string {
  if (!params) return "";
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  return query ? `?${query}` : "";
}

export function formatPrice(value: string | number) {
  return typeof value === "string" ? Number(value.replace(/\D/g, "")) : value;
}

export function createTabController(tabMap: Record<string, string>) {
  const location = useLocation();
  const navigate = useNavigate();

  // detect active tab based on the current path
  const activeTab =
    Object.keys(tabMap).find((key) => location.pathname.includes(key)) ||
    "list";

  const handleTabChange = (value: string) => {
    const url = tabMap[value];
    if (url && url !== location.pathname) {
      navigate({ to: url });
    }
  };

  return { activeTab, handleTabChange };
}
