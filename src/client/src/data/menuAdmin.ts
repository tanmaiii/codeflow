import { ILinkItem } from "@/interfaces/common";
import { paths } from "./path";



export const menuAdmin: ILinkItem[] = [
  {
    en: "Home",
    vi: "Trang chủ",
    icon: "home",
    href: paths.HOME,
  },
  {
    en: "Dashboard",
    vi: "Bảng điều khiển",
    icon: "layout",
    href: paths.DASHBOARD,
  },
  {
    en: "Users",
    vi: "Người dùng",
    icon: "users",
    href: paths.USERS,
  },
  {
    en: "Settings",
    vi: "Cài đặt",
    icon: "settings",
    href: paths.SETTINGS,
  },
];
