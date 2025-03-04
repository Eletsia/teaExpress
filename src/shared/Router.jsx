import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from '../pages/Signup';
import ModifyPost from "../pages/ModifyPost";
import Post from "../pages/Post";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts-create" element={<CreatePost />} />
        <Route path="/posts-modify/:id" element={<ModifyPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<TestResult />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
