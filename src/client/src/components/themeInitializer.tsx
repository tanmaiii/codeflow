'use client';

import { useEffect } from 'react';
import { useThemeStore,  } from '@/stores/theme_store';
import { useUserStore } from '@/stores/user_store';

// Load theme từ localStorage và set vào zustand store
export default function ThemeInitializer() {
  const setTheme = useThemeStore((s) => s.setTheme);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    if (saved) setTheme(saved);
  }, [setTheme]);



  return null;
}
