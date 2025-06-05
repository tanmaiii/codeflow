import { ILinkItem } from '@/interfaces/common';
import { paths } from './path';

export const menuAdmin: ILinkItem[] = [
  {
    en: 'Home',
    vi: 'Trang chủ',
    icon: 'home',
    href: paths.HOME,
  },
  {
    en: 'Dashboard',
    vi: 'Bảng điều khiển',
    icon: 'layout',
    href: paths.DASHBOARD,
  },
  {
    en: 'Users',
    vi: 'Người dùng',
    icon: 'users',
    href: paths.USERS,
    },
  {
    en: 'Courses',
    vi: 'Khóa học',
    icon: 'book',
    href: paths.COURSES,
  },
  {
    en: 'Topics',
    vi: 'Đề tài',
    icon: 'project',
    href: paths.TOPICS,
  },
  {
    en: 'Posts',
    vi: 'Bài viết',
    icon: "article",
    href: paths.POSTS,
  },
  {
    en: 'Repos',
    vi: 'Repository',
    icon: 'repo',
    href: paths.REPOS,
  },
  {
    en: 'Settings',
    vi: 'Cài đặt',
    icon: 'settings',
    href: paths.SETTINGS,
  },
];
