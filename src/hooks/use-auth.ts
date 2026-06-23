import { UserService } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export function useAuthSession() {
  return useQuery({
    queryKey: ["sa-admin"],
    queryFn: UserService.validateUserFromSession,
    retry: false,
  });
}
