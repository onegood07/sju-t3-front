import { create } from "zustand";

interface AuthState {
  token: string | null;
  userId: number | null;

  setToken: (token: string) => void;
  setUserId: (id: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: sessionStorage.getItem("token") || null,
  userId: sessionStorage.getItem("userId")
    ? Number(sessionStorage.getItem("userId"))
    : null,

  setToken: (token) => {
    sessionStorage.setItem("token", token);
    set({ token });
  },

  setUserId: (id) => {
    sessionStorage.setItem("userId", id.toString());
    set({ userId: id });
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    set({ token: null, userId: null });
  },
}));
