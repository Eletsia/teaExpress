import React, { useState } from "react";
import supabase from "../shared/supabase";

const ModifyPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([])


  // 유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.log("error => ", error);
      } else {
        console.log("data => ", data);
        setUsers(data);
      }
    };

    fetchData();
  }, []);

  // 게시물 등록 핸들러
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //  업로드된 이미지 URL 가져오기

    // 게시물 데이터 삽입
    const { data, error } = await supabase.from("posts").insert({
      title: title,
      content: content,
      img_list: imageUrl,
      uid: uid, // 현재 로그인한 사용자 ID 추가
    });
    if (error) {
      console.error("피드 등록 실패:", error);
      return;
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
      <h3>게시물 수정페이지</h3>
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ width: "200px", height: "auto" }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label>
        제목
        <input
          type="text"
          value={title}
          placeholder="제목을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        내용
        <input
          type="text"
          value={content}
          placeholder="내용을 입력하세요."
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <div>
        <button type="submit">등록하기</button>
        <button type="button">뒤로가기</button>
      </div>
    </form>
  );
};

export default ModifyPost;
