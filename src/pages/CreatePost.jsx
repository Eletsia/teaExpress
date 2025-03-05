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

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", user.id],
    queryFn: () => insertPost(newData, user.id),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

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
      className="flex-center flex-col gap-4 rounded-md border border-[#728f9e] p-4 max-sm:gap-16"
      onSubmit={onSubmitHandler}
    >
      <h3 className="text-2xl font-bold">게시물 추가 페이지</h3>

      {/* 게시물 추가 영역 */}
      <div className="flex w-full gap-10 max-sm:flex-col">
        <div className="flex-center flex-col gap-4">
          {/* 이미지  */}
          <div className="flex-center h-[200px] w-[200px] rounded-md shadow">
            <img src={preImage} alt="preview" />
          </div>

          {/* 파일 선택 영역 */}
          <div className="text-xs">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        {/* 제목, 내용 추가 영역 */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <p className="font-semibold">제목</p>
            <input
              type="text"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={e => setTitle(e.target.value)}
              className="rounded-md border border-[#728f9e] p-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <p className="font-semibold">내용</p>
            <input
              type="text"
              value={content}
              placeholder="내용을 입력하세요."
              onChange={e => setContent(e.target.value)}
              className="h-32 rounded-md border border-[#728f9e] p-2"
            />
          </label>
          <div className="mb-2 mt-2">
            <p>{`주소 : ${address}`}</p>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        <button type="submit" className="button">
          추가하기
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="button bg-gray-500"
        >
          뒤로 가기
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
