import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../shared/supabase";
import { getUserInfo } from "../api/userApi";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const userInfo = await getUserInfo(data.user.id);
        setIsLoggedIn(!!userInfo);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <header className="flex items-center justify-between bg-[#80cbc4] p-6">
      <h1
        className="cursor-pointer text-xl font-bold"
        onClick={() => navigate("/")}
      >
        Tea Express
      </h1>
      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/profile")}>마이페이지</button>
            <LogoutButton setIsLoggedIn={setIsLoggedIn} />
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/sign-up")}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
