import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex w-full justify-between bg-gray-300 p-6">
      <h1 className="text-2xl font-bold">Tea Express</h1>
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/login")}
          className="rounded-md bg-gray-400 p-2 hover:bg-gray-200"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="rounded-md bg-gray-400 p-2 hover:bg-gray-200"
        >
          회원가입
        </button>
      </div>
    </header>
  );
};

export default Header;
