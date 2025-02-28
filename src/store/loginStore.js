// user: null → 유저 정보를 저장할 상태값. (처음에는 null)
// setUser(user) → 로그인 성공 시 유저 정보를 저장.
// logout() → 로그아웃 시 Supabase에서 signOut() 실행 후 user 상태를 초기화.
import { create } from "zustand";
import { supabase } from "../api/loginSupaClient";

export const loginUseAuth = create(set => ({
  user: null,
  setUser: user => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
