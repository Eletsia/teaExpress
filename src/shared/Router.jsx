import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts-create" element={<CreatePost />} />
        <Route path="/posts-modify" element={<ModifyPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<TestResult />} />  */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
