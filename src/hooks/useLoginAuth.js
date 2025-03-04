import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { loginUseAuth } from "../store/loginStore"; // Zustand 상태관리 import
import supabase from '../shared/supabase';

const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

// 로그인 API 호출
const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // SupabaseClient → supabase 수정
  if (error) throw error;
  return data;
};

// 회원가입 API 호출
const signUp = async ({ email, password, nickname }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nickname } },
  });
  if (error) throw error;
  return data;
};

// 로그아웃 API 호출
const signOut = async () => {
  await supabase.auth.signOut();
};

// 로그인 상태 관리 훅 (Zustand와 충돌 없이 사용)
export const useLoginAuth = () => {
  const { user, setUser, logout } = loginUseAuth(); // Zustand 상태 가져오기

  // 현재 로그인한 유저 정보를 가져오는 쿼리 (로그인 유지)
  useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    onSuccess: user => setUser(user),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 (불필요한 요청 방지)
  });

  // 로그인 요청 처리 (useMutation)
  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: data => {
      setUser(data.user); // Zustand 상태 업데이트
      queryClient.invalidateQueries(["authUser"]); // 로그인 후 유저 정보 갱신
    },
  });

  // 회원가입 요청 처리 (useMutation)
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setUser(data.user); // Zustand 상태 업데이트
    },
    onError: (error) => {
      console.error("회원가입 오류 발생:", error);
      alert("회원가입 중 문제가 발생했습니다.");
    },
  });

  // 로그아웃 요청 처리
  const logoutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      logout(); // Zustand에서 user 상태 초기화
      queryClient.invalidateQueries(["authUser"]); // 로그아웃 후 캐시 삭제
    },
    onError: (error) => {
      console.error("로그아웃 오류 발생:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    },
  });

  return { user, signInMutation, signUpMutation, logoutMutation };
};
