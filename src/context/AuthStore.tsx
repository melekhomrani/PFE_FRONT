import { create } from "zustand";
import User from "../interfaces/User"

export interface AuthStore {
  user: null | User;
  token: null | string;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
})
);