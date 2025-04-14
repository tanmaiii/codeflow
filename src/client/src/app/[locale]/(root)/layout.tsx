import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Metadata } from "next";
import { menuUser } from "@/data/menuUser";

export const metadata: Metadata = {
  title: "CodeFlow",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 mt-14 bg-white dark:bg-zinc-950">
        <Sidebar menu={menuUser} />
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
}
 