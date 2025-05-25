'use client';
import { paths } from '@/data/path';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { useSidebarStore } from '@/stores/sidebar_store';
import { useUserStore } from '@/stores/user_store';
import { IconDashboard, IconUser } from '@tabler/icons-react';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ButtonTooltip from '../../common/Button/ButtonWithTooltip/ButtonTooltip';
import LocaleSwitcher from '../../localeSwicher';
import ThemeToggle from '../../themeToggle';
import { Button } from '../../ui/button';
import HeaderSearch from './HeaderSearch';
import NotificationCenter from '../Navbar/NotificationCenter';

export default function Header() {
  const { collapsed, toggleSidebar } = useSidebarStore();
  const t = useTranslations('settings');
  const tAuth = useTranslations('auth');
  const { user } = useUserStore();
  const { localPath } = useH_LocalPath();
  const pathname = usePathname();

  const isAdminPage = pathname?.includes('/admin');

  return (
    <header className="fixed top-0 z-30 bg-background-1 dark:bg-background-3 border-b px-4 py-2 flex items-center justify-between w-full h-14 md:16">
      <div>
        <ButtonTooltip
          tooltip={collapsed ? t('showSidebar') : t('hiddenSidebar')}
          variant="outline"
          onClick={toggleSidebar}
          className="p-3"
        >
          {collapsed ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </ButtonTooltip>
      </div>
      <div className="px-2 hidden md:block">
        <HeaderSearch />
      </div>
      <div className="gap-2 flex">
        <NotificationCenter />
        {user && user.role === 'admin' && (
          <ButtonTooltip tooltip={isAdminPage ? 'User' : 'Admin'} variant="ghost" size="icon" className="p-3">
            <Link href={isAdminPage ? localPath(paths.HOME) : localPath(paths.ADMIN)}>
              {isAdminPage ? <IconUser /> : <IconDashboard />}
            </Link>
          </ButtonTooltip>
        )}
        <LocaleSwitcher />
        <ThemeToggle />
        {!user && (
          <Button>
            <Link className="text-white" href={paths.LOGIN}>
              {tAuth('signIn')}
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
