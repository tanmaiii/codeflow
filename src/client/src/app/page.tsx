"use client";
import { useTranslation } from "react-i18next";
import '@/lib/i18n'; // import i18n config

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{t("h1")}</h1>
      <h2>{t("change-locale")}</h2>
    </main>
  );
}
