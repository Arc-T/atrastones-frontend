import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from "@/components/layout/topbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useDirection } from "@/hooks/use-direction";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserService } from "@/services/user-service";
import { LoadingFallback } from "../-loading";
import { Suspense } from "react";
import { RouteError } from "./-error";

const validateAuth = async ({ location, context: { queryClient } }: any) => {
  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["auth-session"],
      queryFn: UserService.validateUserFromSession,
      staleTime: 5000,
      retry: false,
    });

    if (!user) throw new Error("No session");
  } catch (err) {
    throw redirect({
      to: "/login",
      search: { redirect: location.pathname },
    });
  }
};

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: Layout,
  beforeLoad: validateAuth,
  pendingComponent: () => <LoadingFallback message="validating" />,
  errorComponent: RouteError,
});

function AppProviders({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <Toaster position="top-center" expand richColors duration={4000} />
      <SidebarProvider defaultOpen={!isMobile}>{children}</SidebarProvider>
    </ThemeProvider>
  );
}

function Layout() {
  const { dir, isRTL } = useDirection();

  return (
    <AppProviders>
      <div
        className="flex min-h-dvh w-full bg-background antialiased"
        dir={dir}
      >
        <AppSidebar dir={dir} side={isRTL ? "right" : "left"} />

        <SidebarInset className="flex flex-1 flex-col">
          <TopBar />

          <main className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6">
            <Suspense fallback={<LoadingFallback message="loading" />}>
              <Outlet />
            </Suspense>
          </main>
        </SidebarInset>
      </div>
    </AppProviders>
  );
}
