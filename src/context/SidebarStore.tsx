import { create } from "zustand";

export interface SidebarStore {
  collapseSidebar: any;
  collapsed: any;
  setCollapseSidebar: (collapseSidebar: any) => void;
  setCollapsed: (collapsed: any) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  collapseSidebar: false,
  collapsed: false,
  setCollapseSidebar: (collapseSidebar) => set({ collapseSidebar }),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
