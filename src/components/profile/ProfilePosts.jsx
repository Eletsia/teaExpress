import { useEffect, useState } from "react";
import { getPostByUserId } from "../../api/postApi";
import { loginUseAuth } from "../../store/loginStore";
import { getBookMark } from "../../api/bookMarkApi";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = loginUseAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await getPostByUserId(user.id);
        console.log(userPosts);
        setPosts(userPosts ?? []);
      } catch (error) {
        console.error("유저 게시물을 불러오지 못함:", error);
      }
    };

    fetchPosts();
  }, []);

  const setMyPosts = async () => {
    try {
      const userPosts = await getPostByUserId(user.id);
      setPosts(userPosts);
    } catch (error) {
      console.error("내 게시물 불러오기 오류", error);
    }
  };

  const setMyBookMark = async () => {
    try {
      const bookMarkPosts = await getBookMark(user.id);
      console.log(bookMarkPosts);
      setPosts(bookMarkPosts);
    } catch (error) {
      console.error("북마크된 게시물 불러오기 오류", error);
    }
  };
  const userTestPosts = () => {
    if (!posts || posts.length === 0) {
      return <div>게시물이 없습니다.</div>;
    }

    return posts.map(postItem => {
      return (
        <div
          key={postItem.post_id}
          className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-[#728f9e] p-4 text-left"
        >
          <img src={postItem.img_list} alt="이미지" />
          <div className="w-full bg-slate-200 p-2">
            title : {postItem.title}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-md border border-[#728f9e] p-6 font-medium">
      {/* 북마크 버튼 */}
      <button className="flex-center self-end" onClick={setMyPosts}>
        내 게시물
      </button>
      <button className="flex-center self-end" onClick={setMyBookMark}>
        북마크
      </button>
      {/* 반응형 게시물 그리드 */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10">
        {userTestPosts()}
      </div>
    </div>
  );
};

export default ProfilePosts;
