import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface RHFSubmitButtonProps {
  isSubmitting: boolean;
  loadingText?: string;
  defaultText?: string;

  disabled?: boolean;
  className?: string;
}

export function RHFSubmitButton({
  isSubmitting,
  loadingText = "sending",
  defaultText = "saving",
  disabled,
  className,
}: RHFSubmitButtonProps) {
  const { t } = useTranslation();
  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      className={cn(
        "w-full font-semibold py-3 flex items-center justify-center shadow-md transition-all hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary/50 mt-2",
        isSubmitting && "opacity-60 cursor-not-allowed",
        className,
      )}
    >
      {isSubmitting ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <CheckCircle2 className="w-4 h-4 mr-2" />
      )}

      {isSubmitting ? t(loadingText) : t(defaultText)}
    </Button>
  );
}
