"use client";
import { useSidebarStore } from "@/stores/sidebar-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LocaleSwitcher from "../localeSwicher";
import ThemeToggle from "../themeToggle";
import { ButtonWithTooltip } from "../ui/button";
import { useTranslations } from "next-intl";

export default function Header() {
  const { collapsed, toggle } = useSidebarStore();
  const t = useTranslations("settings");

  return (
    <header
      className="sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b 
      px-4 py-2 flex items-center justify-between w-full h-14 md:16"
    >
      <div>
        <ButtonWithTooltip
          tooltip={collapsed ? t("showSidebar") : t("hiddenSidebar")}
          variant="ghost"
          onClick={toggle}
          className=""
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </ButtonWithTooltip>
      </div>
      <div>
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
