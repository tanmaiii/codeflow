"use client";
import { useSidebarStore } from "@/stores/sidebar_store";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../localeSwicher";
import ThemeToggle from "../themeToggle";
import { Button, ButtonWithTooltip } from "../ui/button";
import Link from "next/link";
import { paths } from "@/data/path";

export default function Header() {
  const { collapsed, toggle } = useSidebarStore();
  const t = useTranslations("settings");
  const tAuth = useTranslations("auth");

  return (
    <header
      className="fixed top-0 z-30 bg-white dark:bg-dark-1 border-b 
      px-4 py-2 flex items-center justify-between w-full h-14 md:16"
    >
      <div>
        <ButtonWithTooltip
          tooltip={collapsed ? t("showSidebar") : t("hiddenSidebar")}
          variant="ghost"
          onClick={toggle}
          className="p-3"
        >
          {collapsed ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </ButtonWithTooltip>
      </div>
      <div className="gap-2 flex">
        <LocaleSwitcher />
        <ThemeToggle />
        <Button>
          <Link className="text-white" href={paths.LOGIN}>
            {tAuth("login")}
          </Link>
        </Button>
      </div>
    </header>
  );
}
