import { useEffect, useState } from "react";
import { updataUserInfo } from "../../api/userApi";
import { loginUseAuth } from "../../store/loginStore";

const ProfileInfo = ({ user }) => {
  const [userData, setUserData] = useState({
    nickname: user?.nickname ?? "",
    introduction: user?.introduction ?? "",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 유저 정보 업데이트 함수
  useEffect(() => {
    if (user) {
      setUserData({
        nickname: user.nickname ?? "",
        introduction: user.introduction ?? "",
      });
    }
  }, [user]);

  // 프로필 수정 버튼 클릭 함수
  const toggleEditButton = async () => {
    if (isEditingProfile) {
      await handleSaveProfile();
    }

    setIsEditingProfile(prev => !prev);
  };

  // 업데이트 후 유저 정보 저장 함수
  const handleSaveProfile = async () => {
    try {
      const userId = loginUseAuth.getState().user.id;

      const updatedUser = await updataUserInfo(userData, userId);

      setUserData({
        nickname: updatedUser[0].nickname ?? "",
        introduction: updatedUser[0].introduction ?? "",
      });
    } catch (error) {
      console.error("유저 정보 업데이트 오류:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 self-start rounded-md border border-[#728f9e] p-6 max-sm:w-full max-sm:items-center">
      <div className="flex-center w-[180px] rounded-md border border-[#728f9e]">
        <img src={user?.avatar_img ?? "프로필 이미지"} alt="프로필 이미지" />
      </div>

      <div className="flex flex-col gap-6 text-center max-sm:w-full">
        <div className="rounded-md bg-[#d0ebea] p-3">
          {isEditingProfile ? (
            <input
              type="text"
              name="nickname"
              value={userData.nickname}
              onChange={e =>
                setUserData(prev => ({ ...prev, nickname: e.target.value }))
              }
              placeholder="새로운 닉네임을 입력해주세요."
              className="w-full p-1"
            />
          ) : (
            <div>{userData.nickname}</div>
          )}
        </div>
        <div className="rounded-md bg-[#d0ebea] p-3">
          {isEditingProfile ? (
            <input
              type="text"
              name="introduction"
              value={userData.introduction}
              onChange={e =>
                setUserData(prev => ({
                  ...prev,
                  introduction: e.target.value,
                }))
              }
              placeholder="새로운 소개를 입력해주세요."
              className="w-full p-1"
            />
          ) : (
            <div>{userData.introduction}</div>
          )}
        </div>
        <button onClick={toggleEditButton}>
          {isEditingProfile ? "프로필 수정 완료" : "프로필 수정"}
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
