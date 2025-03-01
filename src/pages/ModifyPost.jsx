import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadFile, uploadFile } from "../api/imgApi";
import { getPostById, updatePost } from "../api/postApi";
import supabase from "../shared/supabase";

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'red@gmail.com',
  password: 'red',
  })

const ModifyPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const { id } = useParams();

  // 게시물 정보 가져오기
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(+id),
  });
  console.log("post:",post)

  useEffect(() => {
    if (post?.length > 0) {
      setTitle(post[0].title);
      setContent(post[0].content);
    }
  }, [post]);

  //게시물 수정
  const mutation = useMutation({
    mutationFn: ({ newData, id }) => updatePost(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  // 게시물 등록 핸들러
  const onSubmitHandler = e => {
    e.preventDefault();

    if (!post) {
      alert("게시물 정보를 불러오지 못했습니다.");
      return;
    }
    //파일 업로드
    uploadFile(image)
    //파일URL 불러오기
    const loadedImage = loadFile(image)


    mutation.mutate({
      id: +id,
      newData: {
        title,
        content,
        img_list: loadedImage,
        location: post[0].location,
        lat: post[0].lat,
        lng: post[0].lng,
      },
    });
  };

  

  return (
    <form
      className="flex flex-col p-4 m-4 items-center gap-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg"
      onSubmit={onSubmitHandler}
    >
      <h3 className="text-2xl font-bold">게시물 수정페이지</h3>
      <div>현재 파라미터는 {id} 입니다.</div>
      <div className="flex gap-6 w-full">
        <div className="flex flex-col items-center gap-4">
          {image && (
            <img
              src={image}
              alt="preview"
              className="w-48 h-auto rounded-lg shadow"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            <span className="text-lg font-semibold">제목</span>
            <input
              type="text"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={e => setTitle(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-blue-500"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-lg font-semibold">내용</span>
            <input
              type="text"
              value={content}
              placeholder="내용을 입력하세요."
              onChange={e => setContent(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-blue-500 h-32 resize-none"
            />
          </label>
          <p>{post?.[0]?.location || "위치 정보 없음"}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          수정하기
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          뒤로가기
        </button>
      </div>
    </form>
  );
};

export default ModifyPost;
