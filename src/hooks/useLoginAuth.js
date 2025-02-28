// → useQuery → Supabase에서 로그인 상태를 가져옴.
// → useMutation → 로그인/회원가입 요청을 보냄.
// → Zustand setUser를 이용해서 로그인한 유저 정보를 저장함.
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

// 현재 로그인한 유저 정보를 가져오는 쿼리
export const useLoginAuth = () => {
  const { user, setUser, logout } = useLoginStore();
  useQuery({
    queryKey: ["authUser"],
    queryKey: async () => {
      const { data } = await supabase.auth.getuser();
      return data.user;
    },
    onSuccess: user => setUser(user),
    staleTime: 1000 * 60 * 5, // 데이터를 5분 동안 캐싱(불필요한 요청 방지)
  });

  // 로그인 요청을 처리하는 Mutation
  const signMutation = useMutation({
    mutationFn: signIn,
    onSuccess: data => {
      setUser(data.user);
      QueryClient.invalidateQueries(["authUser"]); // 로그인 성공 후 유저 정보 없뎃
    },
  });

  // 회원가입 요청을 처리하는 Mutation
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      setUser(data);
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  return { user, signInMutation, signUpMutation, logout };
};
