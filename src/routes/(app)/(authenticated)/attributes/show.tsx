import { FieldGroup } from "@/components/ui/field";
import { useGetAttribute } from "@/hooks/use-attributes";
import { InfoIcon, PenBoxIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
      {value ?? "-"}
    </div>
  </div>
);

export function AttributesShow() {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: attribute } = useGetAttribute(Number(id));

  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
        <InfoIcon className="mb-4 h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold">{t("select_attribute")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("please_select_attribute_first")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 pb-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <PenBoxIcon className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t("attribute_details")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("view_attribute_information")}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <FieldGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Field label={t("name")} value={attribute?.name} />

          <Field label={t("category")} value={attribute?.category?.name} />

          <Field
            label={t("filterable")}
            value={attribute?.isFilterable ? t("enabled") : t("disabled")}
          />
        </FieldGroup>
      </div>
    </>
  );
}
