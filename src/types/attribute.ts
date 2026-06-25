import { useForm } from "react-hook-form";
import type { Category } from "./category";
import type { PaginatedRequest } from "./page";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface Attribute {
  id: number;
  name: string;
  type: string;
  isFilterable: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  // ******************** Relations ********************.
  category: Category;
}

export interface AttributeFilter extends PaginatedRequest {
  name: string;
}

// ****************** Register ******************

export const attributeFormSchema = z.object({
  name: z.string().min(2, { message: "نام ویژگی باید حداقل ۲ کاراکتر باشد" }),
  isFilterable: z.boolean(),
  categoryId: z.number({ error: "انتخاب دسته‌بندی الزامی است" }).positive(),
  type: z.string(),
});

export type CreateAttributeFormValues = z.infer<typeof attributeFormSchema>;

export const useCreateAttributeForm = (attribute?: Attribute) =>
  useForm<CreateAttributeFormValues>({
    resolver: zodResolver(attributeFormSchema),
    mode: "onSubmit",
    values: attribute
      ? {
          name: attribute.name,
          categoryId: attribute.categoryId,
          isFilterable: attribute.isFilterable,
          type: attribute.type,
        }
      : undefined,
    defaultValues: {
      name: "",
      categoryId: undefined,
      isFilterable: false,
      type: "",
    },
  });

// ****************** Search ******************

export const attributeSearchFormSchema = z.object({
  name: z.string().min(2, { message: "نام ویژگی باید حداقل ۲ کاراکتر باشد" }),
  // isFilterable: z.boolean(),
  // categoryId: z.number({error: "انتخاب دسته‌بندی الزامی است"}).positive(),
});

export type AttributeSearchFormValues = z.infer<
  typeof attributeSearchFormSchema
>;

export const useSearchAttributeForm = () =>
  useForm<AttributeSearchFormValues>({
    resolver: zodResolver(attributeSearchFormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
  });
