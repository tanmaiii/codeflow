import { ILinkItem } from "@/interfaces/common";
import { paths } from "./path";

export const menuTeacher: ILinkItem[] = [
  {
    en: "Home",
    vi: "Trang chủ",
    icon: "home",
    href: paths.HOME,
  },
  {
    vi: "Quản lý môn học",
    en: "Courses",
    icon: "book",
    href: paths.COURSES,
  },
  {
    vi: "Quản lý đề tài",
    en: "Topics",
    icon: "project",
    href: paths.TOPICS,
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
