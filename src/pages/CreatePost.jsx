import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadFile, uploadFile } from "../api/imgApi";
import { getPostById, insertPost, updatePost } from "../api/postApi";
import { useLoginAuth } from "../hooks/useLoginAuth";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [preImage, setPreImage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useLoginAuth();
  const { address } = useParams();
  const { lat } = useParams();
  const { lng } = useParams();
  console.log(user.id);
  const mutation = useMutation({
    mutationFn: ({ newData }) => {
      insertPost(newData, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);

      alert("게시물이 추가 되었습니다.");
      navigate(`/`);
    },
  });

  // 게시물 등록 핸들러
  const onSubmitHandler = async e => {
    e.preventDefault();

    let updatedImage; // 기존 이미지 유지

    if (image) {
      await uploadFile(image);
      updatedImage = await loadFile(image.name);
    }

    mutation.mutate({
      newData: {
        title: title,
        content: content,
        img_list: updatedImage,
        location: address,
        lat: lat,
        lng: lng,
      },
    });
  };

  // 이미지 미리보기
  const handleImageChange = e => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreImage(reader.result); // 이미지 미리 보기
      };
      reader.readAsDataURL(file); // 파일을 data URL로 읽기
    }
  };

  return (
    <form
      className="m-4 mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-lg bg-white p-4 shadow-lg"
      onSubmit={onSubmitHandler}
    >
      <h3 className="text-2xl font-bold">게시물 추가 페이지</h3>
      <div className="flex w-full gap-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src={preImage}
            alt="preview"
            className="h-auto w-48 rounded-lg shadow"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="flex w-full flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-lg font-semibold">제목</span>
            <input
              type="text"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={e => setTitle(e.target.value)}
              className="rounded-lg border border-gray-300 p-2 focus:outline-blue-500"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-lg font-semibold">내용</span>
            <input
              type="text"
              value={content}
              placeholder="내용을 입력하세요."
              onChange={e => setContent(e.target.value)}
              className="h-32 resize-none rounded-lg border border-gray-300 p-2 focus:outline-blue-500"
            />
          </label>
          <p>{address}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
        >
          추가하기
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg bg-gray-400 px-6 py-2 text-white transition hover:bg-gray-500"
        >
          뒤로가기
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
