import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserService } from "@/services/user-service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import z from "zod";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";

type LoginFormData = {
  username: string;
  password: string;
};

export const Route = createFileRoute("/(anonymous)/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  function onSubmit(data: LoginFormData) {
    UserService.authenticate(data).then(() => {
      navigate({ to: "/dashboard" });
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Toaster
        dir={i18n.dir()}
        position="top-center"
        expand
        richColors
        duration={4000}
        className={cn("sm:max-w-[420px]", isMobile && "bottom-4 top-auto")}
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

            <CardContent className="space-y-6">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="mobile">شماره موبایل</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="09xxxxxxxxx"
                    autoComplete="tel"
                    {...register("username", {
                      required: "شماره موبایل الزامی است",
                    })}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="current-password"
                      className="w-full pr-10"
                      {...register("password", {
                        required: "رمز عبور الزامی است",
                        minLength: {
                          value: 4,
                          message: "رمز عبور باید حداقل 4 کاراکتر باشد",
                        },
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ورود..." : "ورود"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
