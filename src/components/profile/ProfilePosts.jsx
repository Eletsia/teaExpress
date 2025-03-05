import { useEffect, useState } from "react";
import { getPostByUserId } from "../../api/postApi";
import { loginUseAuth } from "../../store/loginStore";
import { getBookMark } from "../../api/bookMarkApi";
import { Link } from "react-router-dom";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]); // 유저 게시물 상태 관리
  const { user } = loginUseAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await getPostByUserId(user.id);
        console.log(userPosts);
        setPosts(userPosts ?? []);
      } catch (error) {
        console.error("유저 게시물을 불러오지 못함 : ", error);
      }
    };

    fetchPosts();
  }, []);
  const setMyPosts = async () => {
    try {
      const userPosts = await getPostByUserId(user.id);
      console.log(user);
      setPosts(userPosts);
    } catch (error) {
      console.error("내 게시물 불러오기 오류 : ", error);
    }
  };

  const setMyBookMark = async () => {
    try {
      const bookMarkPosts = await getBookMark(user.id);
      console.log(bookMarkPosts);
      setPosts(bookMarkPosts);
    } catch (error) {
      console.error("북마크된 게시물 불러오기 오류 : ", error);
    }
  };

  const userTestPosts = () => {
    if (!posts || posts.length === 0) {
      return <div>게시물이 없습니다.</div>;
    }

    return posts.map(postItem => {
      return (
        <Link
          to={`/posts/${postItem.post_id}`}
          key={postItem.post_id}
          className="flex cursor-pointer flex-col gap-6 rounded-2xl border border-[#728f9e] p-4"
        >
          <div className="w-full rounded-md bg-[#e5e5e5] p-2 font-semibold">
            {postItem.title}
          </div>
          <div className="flex-center">
            <img src={postItem.img_list} alt="이미지" className="h-[200px]" />
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between gap-6 rounded-md border border-[#728f9e] p-6">
        {/* 버튼 */}
        <div className="flex gap-2 self-end">
          <button onClick={setMyPosts}>내 게시물</button>
          <button onClick={setMyBookMark}>북마크</button>
        </div>

        {/* 게시물 */}
        <div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10 max-sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {userTestPosts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
