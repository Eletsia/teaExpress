import { create as zustandCreate } from "zustand"; 
import supabase from '../shared/supabase';

export const loginUseAuth = zustandCreate(set => ({
  user: null,
  setUser: user => set({ user }),

  // 회원가입 (닉네임을 auth.users와 users 테이블 모두 저장)
  signup: async (email, password, nickname) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname } // metadata로 닉네임 저장
        }
      });

      if (error) {
        console.error("회원가입 실패:", error.message);
        return null;
      }

      if (!data || !data.user) {
        console.error("회원가입 실패: user 데이터가 없음");
        return null;
      }

      set({ user: data.user }); // Zustand 상태 업데이트
      return data.user;
    } catch (error) {
      console.error("회원가입 중 예외 발생:", error);
      return null;
    }
  },

  // 로그인 (정상적으로 Zustand에 user 상태 업데이트)
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error("로그인 실패:", error.message);
        return null;
      }

      set({ user: data.user }); // Zustand 상태 업데이트
      return data.user;
    } catch (error) {
      console.error("로그인 중 예외 발생:", error);
      return null;
    }
  },

  // 로그아웃 (Zustand user 상태 초기화)
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Supabase 세션 유지 기능 (회원가입, 로그인, 페이지 새로고침 후에도 로그인 유지)
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    loginUseAuth.getState().setUser(session.user);
  } else {
    loginUseAuth.getState().setUser(null);
  }
});
