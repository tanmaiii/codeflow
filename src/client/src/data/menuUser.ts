import { ILinkItem } from "@/interfaces/common";
import { paths } from "./path";

export const menuUser: ILinkItem[] = [
  {
    en: "Home",
    vi: "Trang chủ",
    icon: "home",
    href: paths.HOME,
  },
  {
    vi: "Môn học",
    en: "Courses",
    icon: "book",
    href: paths.COURSES,
  },
  {
    vi: "Dự án",
    en: "Projects",
    icon: "project",
    href: paths.PROJECTS,
  },
  {
    vi: "Bài viết",
    en: "Posts",
    icon: "article",
    href: paths.POSTS,
  },
  {
    en: "Settings",
    vi: "Cài đặt",
    icon: "settings",
    href: paths.SETTINGS,
  },
];
