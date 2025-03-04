import { useState } from "react"; // useState 추가
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import { useLoginAuth } from "../hooks/useLoginAuth"; // 커스텀 훅 가져오기

const Signup = () => {
  const navigate = useNavigate();
  const { signUpMutation } = useLoginAuth(); // Zustand + TanStack Query 활용

  // useState로 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = async (e) => {
    e.preventDefault(); // 기본 이벤트 방지 

    if (!email || !password || !nickname) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      await signUpMutation.mutateAsync({ email, password, nickname }); // 회원가입 요청 실행
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex-center flex-col gap-4 rounded-2xl border border-[#728f9e] p-4">
      <h2 className="text-2xl font-bold">회원가입</h2>
      <form
        onSubmit={handleSignup}
        className="flex-center w-[280px] flex-col gap-4"
      >
        {/* handleSignup을 폼 제출 이벤트로 연결 */}
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className="flex-2 w-full rounded-md border border-gray-300 p-2"
        />
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
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
