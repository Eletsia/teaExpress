import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const ModifyPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post"],
    queryFn: getPostById,
  });

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
  const onSubmitHandler = async e => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col p-4 m-4 items-center gap-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg"
      onSubmit={onSubmitHandler}
    >
      <h3 className="text-2xl font-bold">게시물 수정페이지</h3>
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
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          등록하기
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
