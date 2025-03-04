import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookMark, getBookMark, insertBookMark } from "../api/bookMarkApi";
import { getComments, insertComment } from "../api/commentApi";
import { loadFile } from "../api/imgApi";
import { deleteLike, getLike, insertLike } from "../api/likeApi";
import { getPostById } from "../api/postApi";
import { getUserInfo } from "../api/userApi";
import supabase from "../shared/supabase";

//로그인 상태
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'red@gmail.com',
  password: 'red',
  })

// 상세페이지-> 게시물 조회,댓글 달기,수정페이지로 이동,상세페이지에 접속한 user uid가져오기
const Post = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBooked, setIsBooked] = useState(false);


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
  
  getUserId()

  // 댓글 추가하기
  const mutation = useMutation({
    mutationFn: ({ newData, id }) => insertComment(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  //좋아요 추가
  const likeInsertMutation = useMutation({
    mutationFn: ({uid, id}) => insertLike(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["like"]);
    },
  });
  //좋아요 삭제
  const likeDeleteMutation = useMutation({
    mutationFn: ({uid, id}) => deleteLike(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["like"]);
    },
  });

  //북마크 추가
  const bookMarkInsertMutation = useMutation({
    mutationFn: ({uid, id}) => insertBookMark(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["like"]);
    },
  });
  //북마크 삭제
  const bookMarkDeleteMutation = useMutation({
    mutationFn: ({uid, id}) => deleteBookMark(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["like"]);
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

  // 좋아요 정보 가져오기
  const {
    data: like,
    isLoading: isLikeLoading,
    isError: isLikeError,
  } = useQuery({
    queryKey: ["like", data.user?.id,id],
    queryFn: () => getLike(data.user?.id,id),
  });

  // 북마크 정보 가져오기
  const {
    data: bookmarked,
    isLoading: isBookedLoading,
    isError: isBookedError,
  } = useQuery({
    queryKey: ["bookmarked", data.user?.id,id],
    queryFn: () => getBookMark(data.user?.id,id),
  });

  if (isPostLoading || isCommentsLoading || isImageLoading || isUserLoading || isLikeLoading || isBookedLoading) {
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

  if (isLikeError) {
    console.error("좋아요 정보를 불러오는 중 오류 발생");
  }

  if (isBookedError) {
    console.error("좋아요 정보를 불러오는 중 오류 발생");
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

  //좋아요 ON,OFF
  const likeToggleButton = () => {
    setIsLiked(prevState => !prevState);
    isLiked ? likeDeleteMutation.mutate({uid: data.user?.id,id:id}) : likeInsertMutation.mutate({uid: data.user?.id,id:id})
    // console.log("uid:",data.user?.id)
  }

  const bookMarkToggleButton = () =>{
    setIsBooked(prevState => !prevState)
    isBooked ? bookMarkDeleteMutation.mutate({uid: data.user?.id,id:id}): bookMarkInsertMutation.mutate({uid: data.user?.id,id:id})
  }


  return (
    <div className="bg-yellow-300 flex flex-row p-4 items-center justify-center gap-6 w-full h-full shadow-lg rounded-lg">
      {/* 왼쪽 */}
      <div className="bg-red-300 flex flex-col items-center gap-4">
        <img src= {imageUrl || ""}  alt="image" className="w-60 h-auto rounded-lg shadow" />
        <p>닉네임: {user?.[0]?.nickname}</p>
        <div className="bg-green-300 flex flex-row justify-between p-4">
          <p className="p-2 text-md">{post?.[0]?.location || "위치 정보 없음"}</p>
          <p className="p-2 text-md">거리: </p>
        </div>
        <div className="bg-orange-300 p-4">
          <p className="p-2 text-md">{post?.[0]?.content || "내용 없음"}</p>
        </div>
        {/* 로그인한 유저의 게시물이면 게시물 수정하기 버튼 나오게 */}
        {data.user.id === post?.[0]?.uid ? <button onClick={() => navigate(`/posts-modify/${id}`)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          게시물 수정하기
        </button> : ""}
      </div>
      {/* 오른쪽 */}
      <div className="bg-blue-300 flex flex-col w-1/2">
        <div className="bg-violet-300 flex flex-row items-center justify-between p-4">
          <p className="p-2 text-2xl">{post?.[0]?.title || "제목 없음"}</p>
          <div className="flex gap-2">
            <button onClick={likeToggleButton}>{isLiked ? "on":"off"} {like.length}</button>
            <button onClick={bookMarkToggleButton}>{isBooked ? "북마크" : "북마크 off"}</button>
          </div>
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
              onClick={() => commentAddHandler()}
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
