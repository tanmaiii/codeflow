"use client";

import { SVGS } from "@/data/images";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ButtonTooltip from "./common/Button/ButtonWithTooltip/ButtonTooltip";
import { setCurrentLocale } from "@/lib/utils";
import { useEffect } from "react";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLanguage = () => {
    const newLocale = currentLocale === "vi" ? "en" : "vi";
    setCurrentLocale(newLocale);
    router.push(`/${newLocale}${pathname.replace(/^\/(en|vi)/, "")}`);
  };

  useEffect(() => {
    setCurrentLocale(currentLocale);
  },[currentLocale])

  return (
    <ButtonTooltip
      tooltip={currentLocale === "vi" ? "English" : "Tiếng Việt"}
      variant="outline"
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
