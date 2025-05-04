// lib/sidebar-store.ts
import { create } from "zustand";

interface SidebarState {
  collapsed: boolean;
  setSidebar: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  setSidebar: (collapsed: boolean) =>{
    set(() => {
      localStorage.setItem("sidebar", JSON.stringify(collapsed));
      return { collapsed };
    });
  },
  toggleSidebar: () =>
    set((state) => {
      localStorage.setItem("sidebar", JSON.stringify(!state.collapsed));
      return { collapsed: !state.collapsed };
    }),
}));
