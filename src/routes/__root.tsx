import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import NotFoundComponent from "@/pages/404";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  notFoundComponent: () => <NotFoundComponent />,
});
