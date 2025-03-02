import React, { useState } from "react";
import { loginUseAuth } from "../store/loginStore";

export const Signup = () => {<LoginForm type="signup" />
  const { signup } = loginUseAuth(); // Zustand에서 signup 함수 가져오기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = await signup(email, password);
    if (user) {
      alert("회원가입 성공! 로그인해주세요.");
    } else {
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
