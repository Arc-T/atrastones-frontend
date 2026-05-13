import { useTranslation } from "react-i18next";

export function useDirection() {
  const { t } = useTranslation();
  const dir = t("direction") as "ltr" | "rtl";
  return { dir, isRTL: dir === "rtl" };
}
