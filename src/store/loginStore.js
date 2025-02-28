// user: null → 유저 정보를 저장할 상태값. (처음에는 null)
// setUser(user) → 로그인 성공 시 유저 정보를 저장.
// logout() → 로그아웃 시 Supabase에서 signOut() 실행 후 user 상태를 초기화.
import { create } from "zustand";
import { supabase } from "../api/loginSupaClient";

export const loginUseAuth = create(set => ({
  user: null, // 현재 로그인한 사용자 정보 저장
  setUser: user => set({ user }), // 사용자 정보 업데이트 함수
  logout: async () => {
    await supabase.auth.signOut(); // Supabase에서 로그아웃 수행
    set({ user: null }); // Zustand 상태에서도 초기화
  },
}));
