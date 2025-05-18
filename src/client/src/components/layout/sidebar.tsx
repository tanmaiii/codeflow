'use client';

import { ROLE_USER } from '@/contants/object';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import { ILinkItem } from '@/interfaces/common';
import apiConfig from '@/lib/api';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar_store';
import { useThemeStore } from '@/stores/theme_store';
import { useUserStore } from '@/stores/user_store';
import clsx from 'clsx';
import {
  Book,
  FolderGit,
  Home,
  Layout,
  LogOut,
  LucideIcon,
  Settings,
  Users,
  Newspaper,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  users: Users,
  settings: Settings,
  home: Home,
  book: Book,
  project: FolderGit,
  article: Newspaper,
};

const RenderNavItem = ({ item, prefix }: { item: ILinkItem; prefix: string }) => {
  const Icon = iconMap[item.icon] || Home;
  const { collapsed } = useSidebarStore();
  const currentLocale = useLocale();

  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, '');

  let isActive = false;
  if (item.href === '/') {
    isActive = pathWithoutLocale === '/' || pathname === '/en' || pathname === '/vi';
  } else {
    isActive =
      pathWithoutLocale === `${prefix}${item.href}` ||
      pathWithoutLocale.startsWith(`${prefix}${item.href}/`);
  }

  return (
    <Link
      key={item.href}
      href={`${prefix}${item.href}`}
      className={cn(
        'flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-primary/10',
        isActive && 'bg-primary/10',
      )}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && (
        <span className="font-medium">{currentLocale === 'vi' ? item.vi : item.en}</span>
      )}
    </Link>
  );
};

type SidebarProps = {
  prefix?: string; // admin thì '/admin', user thì ''
  menu: ILinkItem[];
};

export default function Sidebar({ menu, prefix = '' }: SidebarProps) {
  const { collapsed } = useSidebarStore();
  const { theme } = useThemeStore();
  const t = useTranslations('auth');
  const { user } = useUserStore();

  return (
    <aside
      className={clsx(
        `h-[calc(100vh-56px)] border-r bg-background-1 dark:bg-background-3 flex flex-col transition-all duration-300 
        fixed left-0 top-14 bottom-0 md:sticky z-20 xl:sticky`,
        collapsed ? 'hidden md:flex w-16' : 'w-full md:w-64',
      )}
    >
      <Link href={`${prefix}/`} className="p-4 gap-2 flex items-center w-full justify-start">
        <Image
          width={40}
          height={40}
          src={theme === 'dark' ? IMAGES.LOGO : IMAGES.LOGO_LIGHT}
          alt="logo.png"
        />
        {!collapsed && <h4 className="text-2xl font-bold text-primary">CodeFlow</h4>}
      </Link>

      <nav className="flex-1 space-y-1 px-2">
        {menu.map(item => (
          <RenderNavItem item={item} prefix={prefix} key={item.href} />
        ))}
      </nav>

      <div className="p-2 border-t flex flex-col gap-2">
        <div className="flex items-center  gap-2 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-background-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={user?.avatar ?? apiConfig.avatar(user?.name)}
              alt="avatar.png"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col justify-center gap-0">
            {!collapsed && <span className="text-md/3">{user?.name}</span>}
            {!collapsed && (
              <span className="text-sm/4 text-gray-500">
                {ROLE_USER.find(item => item.value === user?.role)?.label}
              </span>
            )}
          </div>
        </div>
        <Link
          href={paths.LOGOUT}
          className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-background-2"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>{t('logout')}</span>}
        </Link>
      </div>
    </aside>
  );
}
