import { Spinner } from "@/components/ui/spinner";
import { t } from "i18next";

export const LoadingFallback = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4" role="status">
      <Spinner />
      <p className="text-muted-foreground">{t(message)}</p>
    </div>
  </div>
);
