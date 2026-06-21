import { useEffect, useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import z from "zod";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { useMutateAuthenticate } from "@/hooks/use-user";
import {
  useAuthenticateForm,
  type AuthenticateUserFormValues,
} from "@/types/user";
import { RHFInput } from "@/components/custom/form/input";
import { RHFSubmitButton } from "@/components/custom/form/button";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/(anonymous)/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useAuthenticateForm();
  const { t, i18n } = useTranslation();
  const { mutate: authenticate, isPending } = useMutateAuthenticate();

  useEffect(() => {
    if (router.state.statusCode === 403) toast.error(t("please_login_first"));
  });

  function onSubmit(data: AuthenticateUserFormValues) {
    authenticate(data, {
      onSuccess: () => {
        navigate({ to: "/dashboard" });
      },
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      dir="rtl"
    >
      <Toaster
        dir={i18n.dir()}
        position="top-center"
        expand
        richColors
        duration={4000}
        className={cn("sm:max-w-105", isMobile && "bottom-4 top-auto")}
      />
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Card className="w-full">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">
                ورود به حساب کاربری
              </CardTitle>
              <CardDescription>
                لطفاً شماره موبایل و رمز عبور خود را وارد کنید
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <RHFInput
                  control={control}
                  name="username"
                  type="tel"
                  placeholder="form_enter_username"
                  label="username_label"
                  icon={<User />}
                />

                <RHFInput
                  control={control}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="form_enter_password"
                  label="password"
                  icon={
                    showPassword ? (
                      <EyeOff
                        className="h-4 w-4 hover:cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4 hover:cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )
                  }
                />
                <RHFSubmitButton
                  isPending={isPending}
                  defaultText="login"
                  loadingText="loading"
                  disabled={!isValid}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
