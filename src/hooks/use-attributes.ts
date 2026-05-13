import { AttributeService } from "@/services/attribute-service";
import type { Attribute, AttributeFilter } from "@/types/attribute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation<Attribute, Error, Partial<Attribute>>({
        mutationFn: (data) => AttributeService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attributes"] });
        },
    });
};

export const useGetAttributes = (filter?: Partial<AttributeFilter>) => {
    return useQuery({
        queryKey: ["attributes"],
        queryFn: () => AttributeService.getAll(filter)
    });
}

export const useUpdateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation<Attribute, Error, { id: number } & Partial<Attribute>>({
        mutationFn: ({ id, ...data }) => AttributeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attributes"] });
        },
    });
};