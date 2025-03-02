import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
 // supabase 클라이언트 불러오기
import { loginUseAuth } from "../store/loginStore"; // Zustand 상태관리 import
import supabase from '../shared/supabase';


const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

// 로그인 API 호출
const signIn = async ({ email, password }) => {
  const { data, error } = await SupabaseClient.auth.signInWithPassword({
    email,
    password,
  });
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

// 로그인 상태 관리 훅
export const useLoginAuth = () => {
  const { user, setUser, logout } = loginUseAuth();

  // 현재 로그인한 유저 정보를 가져오는 쿼리
  useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    onSuccess: user => setUser(user),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 (불필요한 요청 방지)
  });

  // 로그인 요청 처리
  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: data => {
      setUser(data.user);
      queryClient.invalidateQueries(["authUser"]); // 로그인 후 유저 정보 갱신
    },
  });

  // 회원가입 요청 처리
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      setUser(data);
      queryClient.invalidateQueries(["authUser"]); // 회원가입 후 유저 정보 갱신
    },
  });

  return { user, signInMutation, signUpMutation, logout };
};
