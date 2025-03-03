// loginAuth.js (API 요청) : Supabase 서버와 통신하는 역할

import supabase from '../shared/supabase';

// 회원가입
export const signUp = async ({ email, password, nickname }) => {
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  //  users 테이블에 닉네임 저장 (테이블명 수정)
  await supabase.from("users").insert([{ id: user.id, email, nickname }]);

  return user;
};

// 로그인
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

// 로그아웃
export const signOut = async () => {
  await supabase.auth.signOut();
};
