import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-center justify-between bg-[#80cbc4] p-6">
      <h1 className="text-xl font-bold">Tea Express</h1>
      <div className="flex gap-2">
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/sign-up")}>회원가입</button>
      </div>
    </header>
  );
};

export default Header;
