import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from "@/components/layout/topbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/dashboard")({
  context: () => ({ breadcrumb: "Dashboard" }),
  component: Layout,
});

function Layout() {
  const { i18n } = useTranslation();
  const location = useLocation();

  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <Toaster position="top-center" expand richColors />
      <SidebarProvider>
        <div className="flex min-h-dvh w-full bg-background">
          {/* Sidebar */}
          <AppSidebar dir={dir} side={isRTL ? "right" : "left"} />

          {/* Content Area */}
          <SidebarInset className="flex flex-1 flex-col">
            <TopBar />

            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-7xl p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default Layout;
