"use client";
import { IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/stores/theme-store";
import Image from "next/image";
import "./style.css";

// export const metadata: Metadata = {
//   title: "Đăng nhập | CodeFlow",
// };

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen relative bg-gray-100 dark:bg-dark-1">
      <div className="absolute top-0 w-full h-full left-1/2 -translate-x-1/2">
        {theme === "dark" && (
          <Image
            src={IMAGES.BG_LOGIN}
            alt="background"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="z-20">{children}</div>
      <div
        className={cn(
          "z-0 absolute bottom-0 right-0 w-full dark:bg-primary/5 bg-gray-200 bottom-login"
        )}
      ></div>
    </div>
  );
}
