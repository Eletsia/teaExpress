import { useState } from "react"; // useState 추가
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import { useLoginAuth } from "../hooks/useLoginAuth"; // Custom Hook 가져오기

const Login = () => {
  const navigate = useNavigate();
  const { signInMutation } = useLoginAuth(); // Zustand + TanStack Query 활용

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async e => {
    e.preventDefault(); // 기본 이벤트 방지

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요!");
      return;
    }

    try {
      await signInMutation.mutateAsync({ email, password }); // 로그인 요청 실행
      alert("로그인 성공! 메인 페이지로 이동합니다.");
      navigate("/"); // 로그인 성공 후 메인 페이지(`/`)로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex-center flex-col gap-4 rounded-2xl border border-[#728f9e] p-4">
      <h2 className="text-2xl font-bold">로그인</h2>
      <form
        onSubmit={handleLogin}
        className="flex-center w-[280px] flex-col gap-4"
      >
        {/*  handleLogin을 폼 제출 이벤트로 연결 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-2 w-full rounded-md border border-gray-300 p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="flex-2 w-full rounded-md border border-gray-300 p-2"
        />
        <button type="submit" className="button w-full">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
