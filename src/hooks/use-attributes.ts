import { AttributeService } from "@/services/attribute-service";
import type { Attribute, AttributeFilter } from "@/types/attribute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const attributeKeys = {
  all: ["attributes"] as const,
  one: ["attribute"] as const,
  list: (filter?: Partial<AttributeFilter>) =>
    [...attributeKeys.all, "list", filter] as const,
};

export const useInvalidateAttributes = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: attributeKeys.all,
    });
};

export const useMutateCreateAttribute = () => {
  const invalidate = useInvalidateAttributes();

  return useMutation({
    mutationFn: AttributeService.create,
    onSuccess: invalidate,
  });
};

export const useGetAttributes = (filter?: Partial<AttributeFilter>) => {
  return useQuery({
    queryKey: attributeKeys.list(filter),
    queryFn: () => AttributeService.getAll(filter),
  });
};

export const useGetAttribute = (id: number) => {
  return useQuery({
    queryKey: attributeKeys.one,
    queryFn: () => AttributeService.getById(id),
    enabled: !!id,
  });
};

export const useUpdateAttribute = () => {
  const invalidate = useInvalidateAttributes();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Attribute>) =>
      AttributeService.update(id, data),
    onSuccess: invalidate,
  });
};
