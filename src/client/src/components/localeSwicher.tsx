"use client";

import { SVGS } from "@/data/images";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ButtonTooltip from "./common/Button/ButtonWithTooltip/ButtonTooltip";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLanguage = () => {
    const newLocale = currentLocale === "vi" ? "en" : "vi";
    router.push(`/${newLocale}${pathname.replace(/^\/(en|vi)/, "")}`);
  };

  return (
    <ButtonTooltip
      tooltip={currentLocale === "vi" ? "English" : "Tiếng Việt"}
      variant="ghost"
      className="p-3"
      onClick={toggleLanguage}
    >
      {currentLocale === "vi" ? (
        <Image
          src={SVGS.EN}
          className="w-4 h-4"
          width={16}
          height={16}
          alt="vn.png"
        />
      ) : (
        <Image
        src={SVGS.VI}
        className="w-4 h-4"
          width={16}
          height={16}
          alt="vn.png"
        />
      )}
    </ButtonTooltip>
  );
}
