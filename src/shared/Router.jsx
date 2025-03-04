import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import { loginUseAuth } from "../store/loginStore";
import supabase from './supabase';
import { useEffect } from 'react';
import ModifyPost from "../pages/ModifyPost";
import Post from "../pages/Post";
import Layout from "./Layout";


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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/posts/:id" element={<Post />} />
          {/* <Route path="/posts-create" element={<CreatePost />} />  */}
          <Route path="/posts-modify/:id" element={<ModifyPost />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/results" element={<TestResult />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
