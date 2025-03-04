import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
// import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from '../pages/Signup';
import { loginUseAuth } from "../store/loginStore";
import supabase from './supabase';
import { useEffect } from 'react';



const Router = () => {
  const { setUser } = loginUseAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
  
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [setUser]); // 의존성 배열 확인
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts-create" element={<CreatePost />} />
        <Route path="/posts-modify" element={<ModifyPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<TestResult />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
