import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Bell, Globe, Maximize, Minimize, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useTheme } from "../theme-provider";
import AutoBreadcrumb from "../custom/auto-breadcrumb";

const iconBtn =
  "size-9 text-muted-foreground hover:text-foreground transition-colors";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);

  const lang = i18n.resolvedLanguage ?? "fa";
  const dir = i18n.dir();
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // fullscreen listener
  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between px-4 border-b bg-background/70 backdrop-blur">
      {/* Left */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />

        <AutoBreadcrumb />
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Fullscreen */}
        <Button
          variant="ghost"
          size="icon"
          className={`hidden md:flex ${iconBtn}`}
          onClick={() =>
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.documentElement.requestFullscreen()
          }
        >
          {fullscreen ? (
            <Minimize className="size-4" />
          ) : (
            <Maximize className="size-4" />
          )}
        </Button>

        {/* Theme */}
        <Button
          variant="ghost"
          size="icon"
          className={iconBtn}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.div>
        </Button>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 px-3 text-muted-foreground hover:text-foreground"
            >
              <Globe className="size-4" />
              <span className="text-xs font-semibold tracking-wide">
                {lang.toUpperCase()}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align={dir === "rtl" ? "start" : "end"}
            className="w-36"
          >
            {["en", "fa"].map((l) => (
              <DropdownMenuItem
                key={l}
                onClick={() => i18n.changeLanguage(l)}
                className={lang === l ? "text-primary font-medium" : ""}
              >
                {l === "en" ? "🇺🇸 English" : "🇮🇷 فارسی"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className={`relative ${iconBtn}`}>
          <Bell className="size-4" />
          <span className="absolute top-1.5 end-1.5 size-2 rounded-full bg-destructive" />
        </Button>
      </div>
    </header>
  );
}
