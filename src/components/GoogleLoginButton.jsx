import React from "react";
import { useLoginAuth } from "../hooks/useLoginAuth";

const GoogleLoginButton = () => {
  const { googleSignInMutation } = useLoginAuth(); // Custom Hook에서 Google 로그인 함수 가져오기

  const handleGoogleLogin = () => {
    googleSignInMutation.mutate(); // Google 로그인 요청 실행
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full rounded-md bg-gray-700"
    >
      Google 로그인
    </button>
  );
};

export default GoogleLoginButton;
