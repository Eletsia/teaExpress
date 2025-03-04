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
      try {
        const userId = "638c8398-1206-4199-87f9-c4ffb3996fa0";

        const userInfo = await getUserInfo(userId);

        setUser(userInfo ?? {});
      } catch (error) {
        console.error("유저 데이터를 불러오지 못함:", error);
      }
    };

    fetchUser();
  }, []);

  // 유저 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await getPostAll();

        setPosts(userPosts ?? []);
      } catch (error) {
        console.error("유저 게시물을 불러오지 못함:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />

      <div className="flex-center bg-[#E0F2F1] p-8 max-sm:p-6">
        <div className="flex w-full gap-10 max-sm:flex-col">
          <ProfileInfo user={user} />
          <ProfilePosts posts={posts} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
