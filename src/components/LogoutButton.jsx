import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import { useLoginAuth } from "../hooks/useLoginAuth"; // Custom Hook 가져오기

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { logoutMutation } = useLoginAuth(); // Zustand + TanStack Query 활용

  // 로그아웃 버튼 클릭 시 실행되는 함수
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(); // 로그아웃 요청 실행
      alert("로그아웃 성공! 홈으로 이동합니다.");
      setIsLoggedIn(false);
      navigate("/"); // 로그아웃 후 메인 페이지(`/`)로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패! 다시 시도해주세요.");
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500">
      로그아웃
    </button>
  );
};

export default LogoutButton;
