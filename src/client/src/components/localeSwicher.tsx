"use client";

import EnSVG from "@/assets/svgs/en.svg";
import ViSVG from "@/assets/svgs/vi.svg";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ButtonWithTooltip } from "./ui/button";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLanguage = () => {
    const newLocale = currentLocale === "vi" ? "en" : "vi";
    router.push(`/${newLocale}${pathname.replace(/^\/(en|vi)/, "")}`);
  };

  return (
    <ButtonWithTooltip
      tooltip={currentLocale === "vi" ? "English" : "Tiếng Việt"}
      variant="ghost"
      className="p-3"
      onClick={toggleLanguage}
    >
      {currentLocale === "vi" ? (
        <Image
          src={EnSVG}
          className="w-4 h-4"
          width={16}
          height={16}
          alt="vn.png"
        />
      ) : (
        <Image
          src={ViSVG}
          className="w-4 h-4"
          width={16}
          height={16}
          alt="vn.png"
        />
      )}
    </ButtonWithTooltip>
  );
}
