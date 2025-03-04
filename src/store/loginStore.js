import { create as zustandCreate } from "zustand";
import supabase from '../shared/supabase';

export const loginUseAuth = zustandCreate(set => ({
  user: null,
  setUser: user => set({ user }),

  // 회원가입 (닉네임을 auth.users와 users 테이블 모두 저장)
  signup: async (email, password, nickname) => {
    try {
      // Supabase auth.users에 회원가입 요청 + 닉네임을 metadata로 저장
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nickname } }
      });

      if (error) {
        console.error("회원가입 실패:", error.message);
        return null;
      }

      if (!data?.user) {
        console.error("회원가입 실패: user 데이터가 없음");
        return null;
      }

      // users 테이블에도 닉네임 저장 (회원가입 후 바로 실행)
      const { error: dbError } = await supabase.from("users").insert([
        { id: data.user.id, email, nickname }
      ]);

      if (dbError) {
        console.error("닉네임 저장 실패:", dbError.message);
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
      console.log("로그인 요청:", email, password); // 디버깅 로그 추가

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error("로그인 실패:", error.message);
        return null;
      }

      if (!data?.user) {
        console.error("로그인 실패: user 데이터 없음");
        return null;
      }

      console.log("로그인 성공:", data.user); // 로그인 성공 시 로그 출력
      set({ user: data.user }); // Zustand 상태 업데이트
      return data.user;
    } catch (error) {
      console.error("로그인 중 예외 발생:", error);
      return null;
    }
  },

  // 로그아웃 (Zustand user 상태 초기화)
  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
}));

// Supabase 세션 유지 기능 (회원가입, 로그인, 페이지 새로고침 후에도 로그인 유지)
supabase.auth.onAuthStateChange(async (event, session) => {
  if (session?.user) {
    console.log("세션 유지: 로그인 상태 유지됨", session.user);
    loginUseAuth.getState().setUser(session.user);
  } else {
    console.log("세션 종료: 로그아웃됨");
    loginUseAuth.getState().setUser(null);
  }
});