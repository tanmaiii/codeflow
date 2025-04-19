"use client";
import { useThemeStore } from "@/stores/theme_store";
import { Moon, Sun } from "lucide-react";
import { ButtonWithTooltip } from "./ui/button";
import { useTranslations } from "next-intl";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const t = useTranslations("settings");

  return (
    <ButtonWithTooltip
      tooltip={t('switchTheme')}
      variant="ghost"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </ButtonWithTooltip>
  );
}
