"use client";

import { menuAdmin } from "@/data/menuAdmin";
import { useSidebarStore } from "@/stores/sidebar-store";
import clsx from "clsx";
import { Layout, LogOut, LucideIcon, Settings, Users } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  users: Users,
  settings: Settings,
};

export default function Sidebar() {
  const { collapsed } = useSidebarStore();
  const currentLocale = useLocale();

  return (
    <aside
      className={clsx(
        `h-[calc(100vh-4rem)] border-r bg-white dark:bg-zinc-900 flex flex-col transition-all duration-300 
        fixed left-0 top-14 bottom-0 md:relative md:top-0`,
        collapsed ? "hidden md:flex w-16" : "w-full md:w-64"
      )}
    >
      <div className="p-4 gap-2 flex items-center w-full justify-start">
        <Image
          width={40}
          height={40}
          src={"/images/codeflow.png"}
          alt="logo.png"
        />
        {!collapsed && <h4 className="text-2xl font-bold">CodeFlow</h4>}
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {menuAdmin.map((item) => {
          const Icon = iconMap[item.icon] || Layout;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Icon className="w-5 h-5" />
              {!collapsed && (
                <span>{currentLocale === "vi" ? item.vi : item.en}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t flex flex-col gap-2">
        <Link
          href="/logout"
          className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && (
            <span>{currentLocale === "vi" ? "Đăng xuất" : "Logout"}</span>
          )}
        </Link>
      </div>
    </aside>
  );
}
