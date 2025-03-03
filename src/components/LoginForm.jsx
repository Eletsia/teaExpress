import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginAuth } from "../hooks/useLoginAuth";

const LoginForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { signInMutation, signUpMutation } = useLoginAuth();

  // 회원가입/로그인 폼 제출 핸들러
  const handleSubmit = e => {
    e.preventDefault();
    if (type === "signup") {
      signUpMutation.mutate({ email, password, nickname });
    } else {
      signInMutation.mutate({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="p-2 border rounded"
        autoComplete="email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="p-2 border rounded"
        autoComplete={type === "signup" ? "new-password" : "current-password"}
      />
      
      {/* 회원가입 폼일 때만 닉네임 입력 표시 */}
      {type === "signup" && (
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Nickname"
          required
          className="p-2 border rounded"
          autoComplete="username"
        />
      )}

      {/* 제출 버튼 */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {type === "signup" ? "Sign Up" : "Login"}
      </button>

      {/* 로그인 페이지에 있을 때만 회원가입 링크 표시 */}
      {type !== "signup" ? (
        <Link to="/signup" className="text-blue-500 text-center">
          회원가입
        </Link>
      ) : (
        <Link to="/login" className="text-blue-500 text-center">
          로그인
        </Link>
      )}
    </form>
  );
};

export default LoginForm;
