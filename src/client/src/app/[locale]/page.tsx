"use client";

import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("common");
  const tHome = useTranslations("homePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {t("search")}
      <p>{tHome("description", { application: "Code Flow" })}</p>
    </main>
  );
}
