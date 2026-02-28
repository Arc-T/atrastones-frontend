import { UserService } from "@/services/user-service";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useValidateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<Boolean>({
    mutationFn: UserService.validateUserFromSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: UserService.validateUserFromSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
