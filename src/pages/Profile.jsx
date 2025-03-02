import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserInfo } from "../api/userApi";
import { getPostAll } from "../api/postApi";
import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfilePosts from "../components/profile/ProfilePosts";

const Profile = () => {
  const [user, setUser] = useState({}); // 유저 정보 상태 관리
  const [posts, setPosts] = useState([]); // 유저 게시물 상태 관리

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const [userInfo] = await getUserInfo(
        "638c8398-1206-4199-87f9-c4ffb3996fa0",
      );

      setUser(userInfo);
    };

    fetchUser();
  }, []);

  // 유저 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const userPosts = await getPostAll();

      setPosts(userPosts || []);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />

      <div className="flex min-h-screen w-screen flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 max-md:gap-10 md:flex-row">
          <ProfileInfo user={user} />
          <ProfilePosts posts={posts} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
