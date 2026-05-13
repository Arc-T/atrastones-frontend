import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from "@/components/layout/topbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useDirection } from "@/hooks/use-direction";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Suspense, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function RouteError() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">
          An unexpected error occurred
        </p>
        <button
          onClick={() => router.invalidate()}
          className="mt-4 text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function RoutePending() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader size="lg" />
    </div>
  );
}

export const Route = createFileRoute("/dashboard")({
  component: Layout,
  errorComponent: RouteError,
  pendingComponent: RoutePending,
  context: () => ({ breadcrumb: "dashboard" }),
});

function Layout() {
  const location = useLocation();
  const { dir, isRTL } = useDirection();
  const isMobile = useIsMobile();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <Toaster
        position="top-center"
        expand
        richColors
        duration={4000}
        className={cn("sm:max-w-[420px]", isMobile && "bottom-4 top-auto")}
      />

      <SidebarProvider defaultOpen={!isMobile}>
        <div
          className="flex min-h-dvh w-full bg-background antialiased"
          dir={dir}
          role="application"
          aria-label="Dashboard layout"
        >
          <AppSidebar dir={dir} side={isRTL ? "right" : "left"} />

          <SidebarInset className="flex flex-1 flex-col">
            <TopBar />

            <main
              ref={mainRef}
              className={cn(
                "flex-1 overflow-y-auto",
                "scroll-smooth",
                "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30",
              )}
              tabIndex={-1}
            >
              <div className="mx-auto w-full p-2 sm:p-4 lg:p-6">
                <Suspense fallback={<RoutePending />}>
                  <AnimatePresence mode="wait">
                    <motion.main
                      key={location.pathname}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="mx-auto w-full"
                    >
                      <Outlet />
                    </motion.main>
                  </AnimatePresence>
                </Suspense>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
