import React, { useState } from "react"; //  useState import
import { useNavigate } from "react-router-dom"; //  useNavigate import
import { loginUseAuth } from "../store/loginStore";
import LoginForm from "../components/LoginForm";

const Signup = () => { // ✅ default export를 위한 함수명 유지
  const navigate = useNavigate(); 
  const { signup } = loginUseAuth(); 

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !nickname) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      const user = await signup(email, password, nickname);
      if (user) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("회원가입 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <LoginForm type="signup" /> {/*  중복된 <form> 제거 */}
    </div>
  );
};

export default Signup; //  default export로 변경
