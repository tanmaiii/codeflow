"use client";

// import { useLocale } from "next-intl";

let currentLocale: string | null = null;

export function setCurrentLocale(locale: string) {
  currentLocale = locale;
}

export function getCurrentLocale() {
  return currentLocale;
}
