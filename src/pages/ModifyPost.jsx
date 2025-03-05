import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadFile, uploadFile } from "../api/imgApi";
import { getPostById, updatePost } from "../api/postApi";
import { useLoginAuth } from "../hooks/useLoginAuth";

const ModifyPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [preImage, setPreImage] = useState("");
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useLoginAuth();

  // 게시물 정보 가져오기
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(+id),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  // 데이터가 존재할 때만 상태 업데이트
  const currentTitle = title || post?.[0]?.title || "";
  const currentContent = content || post?.[0]?.content || "";
  const currentImage = post?.[0]?.img_list || null;

  // 게시물 수정
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

    // id 숫자 타입으로 변경
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
      <h3 className="text-2xl font-bold">게시물 수정페이지</h3>

      {/* 게시물 수정 영역 */}
      <div className="flex w-full gap-10 max-sm:flex-col">
        <div className="flex-center flex-col gap-4">
          {/* 이미지 */}
          <div className="flex-center rounded-md">
            <img
              src={preImage || currentImage}
              alt="preview"
              className="h-[200px] w-[200px] object-contain"
            />
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
              placeholder={post[0].title}
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
            <p>{post?.[0]?.location || "위치 정보 없음"}</p>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        <button type="submit" className="button">
          수정하기
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="button bg-gray-500"
        >
          뒤로가기
        </button>
      </div>
    </form>
  );
};

export default ModifyPost;
