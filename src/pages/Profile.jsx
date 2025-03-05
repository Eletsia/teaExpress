import { getUserInfo } from "../api/userApi";
import { getPostAll, getPostByUserId } from "../api/postApi";
import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfilePosts from "../components/profile/ProfilePosts";
import { loginUseAuth } from "../store/loginStore";

const Profile = () => {
  const [user, setUser] = useState({}); // 유저 정보 상태 관리

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = loginUseAuth.getState().user.id;
        console.log(userId);
        const userInfo = await getUserInfo(userId);

        setUser(userInfo ?? {});
      } catch (error) {
        console.error("유저 데이터를 불러오지 못함:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-10 max-sm:flex-col">
        <ProfileInfo user={user} />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default Profile;
