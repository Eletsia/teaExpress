import { KakaoMap } from "../api/kakaoAPI";
import { getPostAll } from "../api/postApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPostAll();
      console.log(data);
      if (data) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = id => {
    navigate(`/posts/${id}`);
  };
  const handleCreateButton = () => {
    if (!address) {
      alert("포스트를 게시할 곳을 선택해주세요!");
      return;
    }
    navigate(`posts-create/${address}`);
  };
  const handleAddressChange = newAddress => {
    setAddress(newAddress);
  };

  return (
    <div className="flex-center flex-row gap-8 p-4 max-lg:flex-col-reverse max-sm:p-0">
      {/* 추천순 게시물 */}
      <div className="flex flex-col gap-4 rounded-lg border border-[#728f9e] p-6">
        {/* 게시물 추가 버튼 */}
        <div className="flex self-end">
          <button onClick={handleCreateButton}>게시물 추가하기</button>
        </div>

        {/* 게시물 */}
        <div>
          {posts && posts.length > 0 ? (
            <div className="flex w-full flex-col gap-4">
              {posts.map(post => (
                <div
                  key={post.post_id}
                  className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm shadow-md"
                  onClick={() => handlePostClick(post.post_id)}
                >
                  <h3 className="font-bold">{post.title}</h3>
                  {/* <p>{post.content}</p> */}
                  <p>
                    위치 : {post.location}, {post.lat}, {post.lng}
                  </p>
                  {/* <p>작성일 : {new Date(post.created_at).toLocaleDateString()}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <p>게시물이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 카카오 지도 */}
      <div className="flex flex-col gap-4 self-start max-lg:self-center">
        <KakaoMap posts={posts} onAddressChange={handleAddressChange} />
      </div>
    </div>
  );
};

export default Home;
