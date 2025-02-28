import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserInfo } from "../api/userApi";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const [userInfo] = await getUserInfo(
        "638c8398-1206-4199-87f9-c4ffb3996fa0",
      );

      setUser(userInfo);
    };

    fetchUser();
  }, []);

  console.log("user => ", user);

  return (
    <>
      <Header />

      {/* 반응형 컨테이너 : 작은 화면에서는 세로, 큰 화면에서는 가로 정렬 */}
      <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-yellow-100 p-8">
        <div className="container mx-auto flex flex-col items-center gap-4 bg-red-400 max-md:gap-10 md:flex-row">
          {/* 프로필 영역 : 반응형 크기 조절 */}
          <div className="flex max-w-sm flex-col gap-6 self-start bg-slate-400 p-4 max-md:min-w-full max-md:flex-row max-md:items-center max-md:justify-between max-sm:flex-col">
            {/* 프로필 이미지 */}
            <div className="flex justify-center bg-red-300 p-4">
              <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-slate-500 max-md:h-[160px] max-md:w-[160px]">
                <img
                  src={user?.avatar_img ?? "프로필 이미지"}
                  alt="프로필 이미지"
                />
              </div>
            </div>

            {/* 프로필 수정 관련 버튼 */}
            <div className="flex flex-col gap-6 bg-green-500 text-center max-md:flex-1 max-sm:w-full">
              <div className="w-full rounded-md bg-pink-300 p-3 max-sm:break-keep">
                {user?.nickname ?? "닉네임"}
              </div>
              <div className="w-full rounded-md bg-pink-300 p-3 max-sm:break-keep">
                {user?.introduction ?? "한 줄 소개"}
              </div>
              <button className="w-full rounded-md bg-pink-300 p-3 max-sm:break-keep">
                프로필 수정
              </button>
            </div>
          </div>

          {/* 게시물 영역 : 남은 공간을 차지하면서 반응형 그리드 적용 */}
          <div className="flex flex-1 flex-col gap-10 bg-slate-300 p-8 max-md:w-full">
            {/* 북마크 버튼 */}
            <button className="flex items-center justify-center self-end rounded-md bg-gray-800 p-2 text-cyan-200">
              북마크
            </button>

            {/* 반응형 게시물 그리드 */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-10">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-[260px] items-center justify-center rounded-3xl bg-yellow-400 text-center"
                >
                  box {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
