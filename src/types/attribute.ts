import { useForm } from "react-hook-form";
import type { Category } from "./category";
import type { Pagination } from "./page";
import z from "zod";

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

export interface AttributeFilter extends Pagination {
  name: string;
}

// ****************** Register ******************

export const attributeFormSchema = z.object({
  name: z.string().min(2, { message: "نام ویژگی باید حداقل ۲ کاراکتر باشد" }),
  isFilterable: z.boolean(),
  // categoryId: z.number({error: "انتخاب دسته‌بندی الزامی است"}).positive(),
});

export type AttributeFormValues = z.infer<typeof attributeFormSchema>;

export const createAttributeForm = (attribute?: Attribute) =>
  useForm<AttributeFormValues>({
    // resolver: zodResolver(attributeFormSchema),
    mode: "onSubmit",
    values: attribute
      ? {
          name: attribute.name,
          // categoryId: attribute.categoryId,
          isFilterable: attribute.isFilterable,
        }
      : undefined,
    defaultValues: {
      name: "",
      // categoryId: undefined,
      isFilterable: false,
    },
  });
