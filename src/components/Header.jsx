import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed right-0 top-0 z-10 flex w-full justify-between bg-gray-300 p-10">
      <h1 className="text-2xl font-bold">Tea Express</h1>
      <div className="flex gap-1">
        <button
          onClick={() => navigate("/login")}
          className="h-10 w-20 rounded-md bg-gray-400 hover:bg-gray-200"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="h-10 w-20 rounded-md bg-gray-400 hover:bg-gray-200"
        >
          회원가입
        </button>
      </div>
    </header>
  );
};

export default Header;
