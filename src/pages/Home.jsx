import Header from "../components/Header";
import Footer from "../components/Footer";
import { KakaoMap } from "../api/kakaoAPI";
import { getPostAll } from "../api/postApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [posts, setPosts] = useState([]);
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
  }, [])

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`)
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex flex-1 bg-[#E0F2F1]">
        <div className="flex-1">
        <KakaoMap posts={posts} />
         </div>
        <div className="flex-1 overflow-y-auto p-4">
          {posts && posts.length > 0 ? (
            <div>
              {posts.map(post => (
                <div
                  key={post.post_id}
                  className="bg-white p-4 mb-4 shadow-md rounded-md"
                  onClick={() => handlePostClick(post.post_id)}
                >
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    위치: {post.location}, {post.lat}, {post.lng}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    작성일: {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>게시물이 없습니다.</p>
          )}
        </div>
     </div>
      
      <Footer />
    </div>
  );
};

export default Home;
