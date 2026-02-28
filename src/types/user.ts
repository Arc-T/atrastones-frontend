import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface User {
  username: string;
  password: string;
}

export type UserFormValues = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  username: z.string().min(1, "نام کاربری الزامی است"),
  password: z.string().min(1, "'پسورد الزامی است"),
  rememberMe: z.boolean(),
});

export const useUserForm = () =>
  useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });
