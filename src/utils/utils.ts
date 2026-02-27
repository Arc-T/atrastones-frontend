import i18n from "@/lang/i18n";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function isRTL(): boolean {
  const language = i18n.resolvedLanguage || "fa";
  return language.startsWith("fa");
}
