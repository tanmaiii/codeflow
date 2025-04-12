'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/stores/theme-store';

// Load theme từ localStorage và set vào zustand store
export default function ThemeInitializer() {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) setTheme(saved);
  }, [setTheme]);

  return null;
}
