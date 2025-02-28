// loginAuth.js (API 요청) : Supabase 서버와 통신하는 역할

import { supabase } from "./loginSupaClient";

// 회원가입
export const signUp = async ({ email, password, nickname }) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  await supabase.from(user).insert([{ uid: user.id, email, nickname }]);

  return user;
};

// 로그인
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInTeaEx({ email, password });
  if (error) throw error;
  return data;
};

// 아웃
const signOut = async () => {
  await supabase.auth.signOut();
};
