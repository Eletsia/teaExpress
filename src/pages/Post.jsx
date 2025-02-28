import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, insertComment } from "../api/commentApi";
import { getPostById } from "../api/postApi";

// 상세페이지-> 게시물 조회,댓글 달기,수정페이지로 이동,상세페이지에 접속한 user uid가져오기
const Post = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const [comment, setComment] = useState("");

  //게시물 정보 가져오기
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });

  //댓글 정보 가져오기
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  // 댓글 추가하기
  const mutation = useMutation({
    mutationFn: ({ newData, id }) => insertComment(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  if (isPostLoading || isCommentsLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (isPostError) {
    return <div>게시물 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (isCommentsError) {
    return <div>댓글 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const commentAddHandler = () => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

    mutation.mutate({
      // 로그인한 유저 uid
      id: post.uid,
      newData: {
        post_id: post.post_id,
        content: comment,
      },
    });
    setComment("");
  };

  return (
    <div className="bg-yellow-300 flex flex-row p-4 items-center justify-center gap-6 w-full h-full shadow-lg rounded-lg">
      {/* 왼쪽 */}
      <div className="bg-red-300 flex flex-col items-center gap-4">
        <img src="" alt="image" className="w-48 h-auto rounded-lg shadow" />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          게시물 수정하기
        </button>
      </div>
      {/* 오른쪽 */}
      <div className="bg-blue-300 flex flex-col w-1/2">
        <div className="bg-violet-300 flex flex-row items-center justify-between p-4">
          <p className="p-2 text-2xl">제목</p>
          <div className="flex gap-2">
            <button>좋아요</button>
            <button>북마크</button>
          </div>
        </div>
        <div className="bg-green-300 flex flex-row justify-between p-4">
          <p className="p-2 text-2xl">위치</p>
          <p className="p-2 text-2xl">거리: </p>
        </div>
        <div className="bg-orange-300 p-4">
          <p className="p-2 text-2xl">내용 설명</p>
        </div>
        <div className="bg-slate-500 flex flex-col p-4 gap-4">
          <p className="p-2 text-2xl">댓글리스트</p>
          <ul>
            {comments?.map(comment => (
              <li key={comment.comment_id}>{comment.content}</li>
            ))}
          </ul>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              name=""
              id=""
              placeholder="댓글을 입력해주세요."
              onChange={e => setComment(e.target.value)}
              className="p-2 flex-2 border border-gray-300 rounded-lg w-full "
            />
            <button
              onClick={commentAddHandler}
              className="bg-blue-500 text-white w-1/6 rounded-lg p-2 hover:bg-blue-600 transition "
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
