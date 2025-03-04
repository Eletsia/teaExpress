import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, insertComment } from "../api/commentApi";
import { loadFile } from "../api/imgApi";
import { getPostById } from "../api/postApi";
import { getUserInfo } from "../api/userApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import supabase from "../shared/supabase";

//로그인 상태
const { data, error } = await supabase.auth.signInWithPassword({
  email: "red@gmail.com",
  password: "red",
});

// 상세페이지-> 게시물 조회,댓글 달기,수정페이지로 이동,상세페이지에 접속한 user uid가져오기
const Post = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  //게시물 정보 가져오기
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", +id],
    queryFn: () => getPostById(+id),
  });

  //댓글 정보 가져오기
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });
  // const loadedImage = post?.[0]?.img_list ? loadFile(post[0].img_list.publicUrl) : null;

  // 게시물 올린 유저 정보 가져오기
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user", post?.[0]?.uid],
    queryFn: () => getUserInfo(post?.[0]?.uid),
  });

  //로그인 유저정보 가져오기
  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("유저 정보를 가져오는 중 오류 발생:", error);
      return null;
    }
    return data.user?.id; // 유저의 UID 반환
  };

  getUserId();

  // 댓글 추가하기
  const mutation = useMutation({
    mutationFn: ({ newData, id }) => insertComment(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  // 이미지 관리
  const {
    data: imageUrl,
    isLoading: isImageLoading,
    isError: isImageError,
  } = useQuery({
    queryKey: ["image", post?.[0]?.img_list],
    queryFn: () => {
      const imgPath = post?.[0]?.img_list;
      if (!imgPath) return null; // 이미지가 없으면 null 반환
      return imgPath.includes("https") ? imgPath : loadFile(imgPath); // 이미 URL이면 그대로 사용
    },
  });

  if (isPostLoading || isCommentsLoading || isImageLoading || isUserLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (isPostError) {
    return <div>게시물 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (isCommentsError) {
    return <div>댓글 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (isImageError) {
    console.error("이미지를 불러오는 중 오류 발생");
  }

  if (isUserError) {
    console.error("유저정보를 불러오는 중 오류 발생");
  }

  //댓글 추가하기
  const commentAddHandler = () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    mutation.mutate({
      // 로그인한 유저 uid
      id: data.user.id,
      newData: {
        post_id: +id,
        content: comment,
      },
    });
    setComment("");
  };

  return (
    <>
      <Header />

      <div className="flex-center bg-[#E0F2F1] p-8 max-md:p-6">
        <div className="flex-center w-full gap-10 max-md:flex-col">
          {/* 유저 정보 */}
          <div className="flex flex-col gap-10 self-start rounded-md border border-[#728f9e] p-6 max-md:w-full max-md:items-center">
            {/* 프로필 이미지 */}
            <div className="flex-center w-[180px]">
              <img
                src={imageUrl || "프로필 이미지"}
                alt="프로필 이미지"
                className="rounded-md"
              />
            </div>

            {/* 유저 개인 정보 */}
            <div className="flex flex-col gap-6 text-center max-md:w-full">
              <p className="rounded-md bg-[#d0ebea] p-3">
                {user?.[0]?.nickname || "닉네임"}
              </p>
              <p className="rounded-md bg-[#d0ebea] p-3">
                {post[0].location || "위치"}
              </p>
            </div>

            {/* 로그인 유저 기준 수정 버튼 */}
            {data.user.id === post?.[0]?.uid ? (
              <button onClick={() => navigate(`/posts-modify/${id}`)}>
                게시물 수정하기
              </button>
            ) : (
              ""
            )}
          </div>

          {/* 유저 게시물 상세 페이지  */}
          <div className="flex flex-1 flex-col gap-6 rounded-md border border-[#728f9e] p-6 font-medium max-md:w-full">
            <div className="flex items-center justify-between gap-2">
              {/* 게시물 제목 */}
              <div className="p-4 text-xl font-bold">
                {post?.[0]?.title || "제목 없음"}
              </div>

              {/* 버튼 */}
              <div className="flex gap-2">
                <button>좋아요</button>
                <button>북마크</button>
              </div>
            </div>

            {/* 게시물 소개 */}
            <div className="rounded-md bg-[#d0ebea] p-4">
              {post[0].content || "게시물 소개"}
            </div>

            {/* 게시물 내용 */}
            <div className="flex flex-col items-start gap-6 rounded-md bg-[#d0ebea] p-4">
              {/* 댓글 내용*/}
              <ul className="flex w-full flex-col gap-4">
                {comments?.map(comment => (
                  <li key={comment.comment_id}>{comment.content}</li>
                ))}
              </ul>

              {/* 댓글 입력창 */}
              <div className="flex w-full gap-2 max-[380px]:flex-col">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="댓글을 입력해주세요."
                  onChange={e => setComment(e.target.value)}
                  className="flex-1 rounded-md p-2"
                />

                <button onClick={() => commentAddHandler()}>추가</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Post;
