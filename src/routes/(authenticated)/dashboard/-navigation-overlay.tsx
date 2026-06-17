import { Spinner } from "@/components/ui/spinner";

export const NavigationOverlay = () => (
  <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-4">
    <div className="rounded-full bg-background/70 px-3 py-1 shadow-sm backdrop-blur">
      <Spinner />
    </div>
  </div>
)