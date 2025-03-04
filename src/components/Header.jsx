import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../shared/supabase";
import { getUserInfo } from "../api/userApi";
import LogoutButton from "./LogoutButton";


const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const checkAuth = async () => {
      const {data} = await supabase.auth.getUser();
      if (data?.user) {
        const userInfo = await getUserInfo(data.user.id);
        if (userInfo) {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    }
    checkAuth();

   
  }, [isLoggedIn]);

  return (
    <header className="flex items-center justify-between bg-[#80cbc4] p-6">
      <h1  className="text-xl font-bold" onClick={() => navigate("/")}>Tea Express</h1>
      <div className="flex gap-2">
        {isLoggedIn ? ( 
          <>
        <button onClick={() => navigate("/profile")}>마이페이지</button>
        <LogoutButton />
        </>
      ) : (
      <>
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/signup")}>회원가입</button>
        </>
      )}
      </div>
    </header>
  );
};

export default Header;
