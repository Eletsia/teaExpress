import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <LoginForm type="login" />
    </div>
  );
};

export default Login;