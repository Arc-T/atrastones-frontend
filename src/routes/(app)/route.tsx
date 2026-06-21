import { UserService } from "@/services/user-service";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoadingFallback } from "./-loading";

export const Route = createFileRoute("/(app)")({
  beforeLoad: async ({ location, context: { queryClient } }) => {
    if (location.pathname === "/login") return;

    try {
      await queryClient.fetchQuery({
        queryKey: ["auth-session"],
        queryFn: UserService.validateUserFromSession,
        staleTime: 5000,
        retry: false,
      });
    } catch {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
        statusCode: 403,
      });
    }
  },
  pendingComponent: () => <LoadingFallback message="validating" />,
});
