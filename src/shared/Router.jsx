import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Post from "../pages/Post";
import ModifyPost from "../pages/ModifyPost";
import CreatePost from "../pages/CreatePost";
import Layout from "./Layout";
import { loginUseAuth } from "../store/loginStore";
import { useEffect } from "react";
import supabase from "./supabase";
import PrivateRoute from "../components/PrivateRoute";

const Router = () => {
  const { setUser } = loginUseAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      },
    );

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
          <Route
            path="/posts/:id"
            element={<PrivateRoute element={<Post />} />}
          />
          <Route
            path="/posts-create/:address/:lat/:lng"
            element={<PrivateRoute element={<CreatePost />} />}
          />
          <Route
            path="/posts-modify/:id"
            element={<PrivateRoute element={<ModifyPost />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          {/* <Route path="/results" element={<TestResult />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
