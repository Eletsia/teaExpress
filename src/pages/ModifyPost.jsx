import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [image, setImage] = useState("");
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  // 게시물 정보 가져오기
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(+id),
    staleTime: 1000 * 60 * 5,  //5분동안 캐시 유지
  });
  console.log("post:",post)

   // 데이터가 존재할 때만 상태 업데이트
   const currentTitle = title || post?.[0]?.title || "";
   const currentContent = content || post?.[0]?.content || "";
   const currentImage = post?.[0]?.img_list || null;

  //게시물 수정
  const mutation = useMutation({
    mutationFn: ({ newData, id }) => updatePost(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      alert("게시물이 수정되었습니다.");
      navigate(`/posts/${id}`);
    },
  });

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  // 게시물 등록 핸들러
  const onSubmitHandler = async e => {
    e.preventDefault();

    let updatedImage = currentImage; // 기존 이미지 유지

    if (image) {
      await uploadFile(image);
      updatedImage = await loadFile(image.name);
    }
    

    // id 숫자타입으로 변경
    mutation.mutate({
      id: +id,
      newData: {
        title: currentTitle,
        content: currentContent,
        img_list: updatedImage,
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
          {currentImage && (
            <img
              src={currentImage}
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
              placeholder={post[0].title}
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
          onClick={() => navigate(-1)}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          뒤로가기
        </button>
      </div>
    </form>
  );
};

export default ModifyPost;
