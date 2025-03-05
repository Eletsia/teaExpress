import { Navigate } from "react-router-dom";
import { loginUseAuth } from "../store/loginStore";
import { useEffect, useRef } from "react";

const PrivateRoute = ({ element }) => {
  const { user } = loginUseAuth();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!user && !hasAlerted.current) {
      hasAlerted.current = true; // alert을 띄운 상태로 설정
      alert("로그인이 필요한 페이지 입니다.");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default PrivateRoute;
