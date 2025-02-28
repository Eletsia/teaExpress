import supabase from "../shared/supabase";

//@param uid 유저의 uid값
//해당 유저와 포스트에 대한 좋아요 데이터를 가져옵니다
//@return 좋아요 데이터
//실패시 null
export const getLike = async (uid, id) => {
  try {
    const userId = uid;
    const postId = id;
    if (!userId) throw new Error("잘못된 유저 정보입니다.");
    if (!postId) throw new Error("잘못된 포스트 정보입니다.");

    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("uid", uid);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("좋아요 가져오기 오류", error);
    return null;
  }
};

//@param uid 유저의 uid 값
//@param id post_id
//유저의 uid와 post_id를 기반으로 좋아요 데이터를 생성하여
//데이터베이스에 삽입합니다
//@return 삽입된 좋아요 데이터
//실패시 null
export const insertLike = async (uid, id) => {
  try {
    const userId = uid;
    const postId = id;
    if (!userId) throw new Error("잘못된 유저 정보입니다.");
    if (!postId) throw new Error("잘못된 포스트 정보입니다.");

    const { data, error } = await supabase
      .from("likes")
      .insert([
        {
          uid: userId,
          post_id: postId,
        },
      ])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("좋아요 생성 오류", error);
    return null;
  }
};

//@param uid 유저의 uid
//@param id post_id
//유저의 uid값과 post_id를 기반으로 좋아요를 삭제합니다
//@return 성공시 true 실패시 false
export const deleteLike = async (uid, id) => {
  try {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("uid", uid)
      .eq("post_id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("좋아요 삭제 오류", error);
    return false;
  }
};

//@param id like_id 좋아요의 id값
//like_id 좋아요의 id값를 기반으로 좋아요 데이터를 삭제합니다
//@return 성공시 true 실패시 false
export const deleteLikeByLikeId = async id => {
  try {
    const { error } = await supabase.from("likes").delete().eq("like_id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("좋아요 삭제 오류", error);
    return false;
  }
};
