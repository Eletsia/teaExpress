/// 로그인, 회원가입을 처리하는 폼 컴포넌트

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { signInMutation, signUpMutation } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    if (type === "signup") {
      signUpMutation.mutate({ email, password, nickname });
    } else {
      signInMutation.mutate({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {type === "signup" && (
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Nickname"
          required
        />
      )}
      <button type="submit">{type === "signup" ? "Sign Up" : "Login"}</button>
    </form>
  );
};

export default LoginForm;
