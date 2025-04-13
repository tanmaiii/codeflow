import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Metadata } from "next";
import { menuAdmin } from "@/data/menuAdmin";

export const metadata: Metadata = {
  title: "Trang quản trị | CodeFlow",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 mt-14">
        <Sidebar menu={menuAdmin} />
        <div className="w-full p-2">{children}</div>
      </div>
    </div>
  );
}
