import { ILinkItem } from '@/interfaces/common';
import { paths } from './path';

export const menuAdmin: ILinkItem[] = [
  {
    en: 'Home',
    vi: 'Trang chủ',
    icon: 'layout',
    href: paths.HOME,
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
    icon: 'article',
    href: paths.POSTS,
  },
  {
    en: 'Repository',
    vi: 'Kho lưu trữ',
    icon: 'repos',
    href: paths.REPOS,
  },
  {
    en: 'Tags',
    vi: 'Thẻ',
    icon: 'tag',
    href: paths.TAGS,
  },
  {
    en: 'Comments',
    vi: 'Bình luận',
    icon: 'comment',
    href: paths.COMMENTS,
  },
  {
    en: 'Settings',
    vi: 'Cài đặt',
    icon: 'settings',
    href: paths.SETTINGS,
  },
];
