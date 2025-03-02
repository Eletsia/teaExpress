import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserInfo } from "../api/userApi";
import { useEffect, useState } from "react";
import { getPostAll } from "../api/postApi";

const Profile = () => {
  const [user, setUser] = useState({}); // 유저 정보 상태 관리
  const [post, setPost] = useState(); // 유저 게시물 상태 관리

  // 유저 정보 : getPostById
  useEffect(() => {
    const fetchUser = async () => {
      const [userInfo] = await getUserInfo(
        "638c8398-1206-4199-87f9-c4ffb3996fa0",
      );

      setUser(userInfo);
    };

    fetchUser();
  }, [post]);

  // 유저 전체 게시물 : getPostAll
  useEffect(() => {
    const fetchPost = async () => {
      const userPosts = await getPostAll();

      if (userPosts) setPost(userPosts);
    };

    fetchPost();
  }, []);

  const userTestPosts = () => {
    if (!post || post.length === 0) {
      return <div>게시물이 없습니다.</div>;
    }

    return post.map(postItem => {
      return (
        <div
          key={postItem.post_id}
          className="flex flex-col items-center justify-between gap-10 rounded-3xl border border-slate-500 p-6 text-left"
        >
          <img src={postItem.img_list} alt="이미지" />
          <div className="w-full bg-slate-400 p-2">
            title : {postItem.title}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Header />

      {/* 반응형 컨테이너 : 작은 화면에서는 세로, 큰 화면에서는 가로 정렬 */}
      <div className="flex min-h-screen w-screen flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 max-md:gap-10 md:flex-row">
          {/* 프로필 영역 : 반응형 크기 조절 */}
          <div className="flex max-w-sm flex-col gap-6 self-start border border-slate-500 p-4 max-md:min-w-full max-md:flex-row max-md:items-center max-md:justify-between max-sm:flex-col">
            {/* 프로필 이미지 */}
            <div className="flex w-[200px] items-center justify-center">
              <img
                src={user?.avatar_img ?? "프로필 이미지"}
                alt="프로필 이미지"
              />
            </div>

            {/* 프로필 수정 관련 버튼 */}
            <div className="flex flex-col gap-6 text-center max-md:flex-1 max-sm:w-full">
              <div className="w-full rounded-md bg-slate-200 p-3 max-sm:break-keep">
                {user?.nickname ?? "닉네임"}
              </div>
              <div className="w-full rounded-md bg-slate-200 p-3 max-sm:break-keep">
                {user?.introduction ?? "한 줄 소개"}
              </div>
              <button className="w-full rounded-md bg-slate-200 p-3 max-sm:break-keep">
                프로필 수정
              </button>
            </div>
          </div>

          {/* 게시물 영역 : 남은 공간을 차지하면서 반응형 그리드 적용 */}
          <div className="flex flex-1 flex-col gap-10 px-8 max-md:w-full">
            {/* 북마크 버튼 */}
            <button className="flex items-center justify-center self-end rounded-md bg-slate-200 p-2">
              북마크
            </button>

            {/* 반응형 게시물 그리드 */}
            <div className="grid grid-cols-1 gap-10">{userTestPosts()}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
