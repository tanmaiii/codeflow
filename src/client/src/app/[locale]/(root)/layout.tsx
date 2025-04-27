import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar";
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
      <div className="flex flex-1 mt-14">
        <Sidebar menu={menuUser} />
        <div className="w-full px-4 md:px-6 xl:px-10 py-2">{children}</div>
      </div>
    </div>
  );
}
 