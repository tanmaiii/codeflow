"use client";

import { ILinkItem } from "@/interfaces/common";
import { useSidebarStore } from "@/stores/sidebar-store";
import clsx from "clsx";
import {
  Book,
  FolderGit,
  Home,
  Layout,
  LogOut,
  LucideIcon,
  Settings,
  Users,
} from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  users: Users,
  settings: Settings,
  home: Home,
  book: Book,
  project: FolderGit,
};

const RenderNavItem = ({
  item,
  prefix,
}: {
  item: ILinkItem;
  prefix: string;
}) => {
  const Icon = iconMap[item.icon] || Home;
  const { collapsed } = useSidebarStore();
  const currentLocale = useLocale();

  return (
    <Link
      key={item.href}
      href={`${prefix}${item.href}`}
      className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <Icon className="w-5 h-5" />
      {!collapsed && (
        <span className="font-medium">{currentLocale === "vi" ? item.vi : item.en}</span>
      )}
    </Link>
  );
};

type SidebarProps = {
  prefix?: string; // admin thì '/admin', user thì ''
  menu: ILinkItem[];
};

export default function Sidebar({ menu, prefix = "" }: SidebarProps) {
  const { collapsed } = useSidebarStore();
  const currentLocale = useLocale();

  return (
    <aside
      className={clsx(
        `h-[calc(100vh-56px)] border-r bg-white dark:bg-zinc-950 flex flex-col transition-all duration-300 
        fixed left-0 top-14 bottom-0 md:sticky`,
        collapsed ? "hidden md:flex w-16" : "w-full md:w-64"
      )}
    >
      <Link
        href={`${prefix}/`}
        className="p-4 gap-2 flex items-center w-full justify-start"
      >
        <Image
          width={40}
          height={40}
          src={"/images/codeflow.png"}
          alt="logo.png"
        />
        {!collapsed && (
          <h4 className="text-2xl font-bold text-primary">CodeFlow</h4>
        )}
      </Link>

      <nav className="flex-1 space-y-1 px-2">
        {menu.map((item) => (
          <RenderNavItem item={item} prefix={prefix} key={item.href} />
        ))}
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
