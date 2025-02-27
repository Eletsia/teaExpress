import supabase from "../shared/supabase";

//@param id === 댓글을 가져올 포스트의 id 값
//해당 페이지의 댓글들을 가져옵니다
//@return comments 테이블의 content created_at uid
//user테이블의 nickname,avatar_img
//실패시 null을 리턴합니다
export const getComments = async id => {
  try {
    const postId = id;
    if (!postId) throw new Error("잘못된 포스트 정보입니다.");
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
      uid,
      content,
      comment_id,
      users!inner(nickname,avatar_img)
      `,
      )
      .eq("post_id", postId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("댓글 가져오기 오류", error);
    return null;
  }
};

//@param formData (댓글의 정보) post_id content가 포함됨됨
//@param uid 댓글을 작성한 유저의 uid값
//데이터베이스에 댓글 정보를 추가합니다
export const insertComment = async (formData, uid) => {
  try {
    if (!uid) throw new error("uid 정보가 없습니다!");
    if (!formData.post_id) throw new error("포스트 정보가 없습니다!");
    if (!formData.content) throw new error("댓글 정보가 없습니다!");
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          uid: uid,
          post_id: formData.post_id,
          content: formData.content,
        },
      ])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("댓글 생성 오류", error);
    return null;
  }
};

//@param content 수정할 댓글의 내용
//@param id (업데이트할 댓글의 id 값)
//이미 존재하는 댓글을 업데이트합니다
//@return 업데이트한 댓글 정보를 리턴합니다
//실패시 null을 리턴합니다
export const updateComment = async (content, id) => {
  try {
    const commentId = id;
    if (!commentId) throw new Error("잘못된 댓글 정보 입니다.");

    const { data, error } = await supabase
      .from("comments")
      .update({
        content: content,
      })
      .eq("comment_id", commentId)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("댓글 업데이트 오류", error);
    return null;
  }
};

//@param 삭제할 댓글의 id 값
//댓글을 삭제합니다
//@return 댓글 삭제 성공시 true 그렇지않으면 false
export const deleteCommentById = async id => {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("댓글 삭제 오류", error);
    return false;
  }
};
