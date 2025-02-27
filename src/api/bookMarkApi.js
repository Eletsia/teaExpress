import supabase from "../shared/supabase";

//@param uid 유저의 uid값
//유저가 추가한 북마크의 데이터를 가져옵니다
//@return bookMark테이블의 내용중 유저의 uid값과 일치하는 값 모두
//post_id uid bookMark_id
//실패시 null
export const getBookMark = async uid => {
  try {
    const userId = uid;
    if (!userId) throw new Error("잘못된 유저 정보입니다.");

    const { data, error } = await supabase
      .from("bookmark")
      .select("*")
      .eq("uid", uid);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("북마크 가져오기 오류", error);
    return null;
  }
};
//@param uid 유저의 uid값
//@param id post_id값
//데이터베이스에 북마크 데이터를 추가합니다
//@return 추가된 북마크데이터
//실패시 null
export const insertBookMark = async (uid, id) => {
  try {
    const userId = uid;
    const postId = id;
    if (!userId) throw new Error("잘못된 유저 정보입니다.");
    if (!postId) throw new Error("잘못된 포스트 정보입니다.");

    const { data, error } = await supabase
      .from("bookmark")
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
    console.error("북마크 생성 오류", error);
    return null;
  }
};

//@param uid 유저의 uid값
//@param id post_id
//북마크를 삭제합니다
//@return 성공시 true 실패시 false
export const deleteBookMark = async (uid, id) => {
  try {
    const { error } = await supabase
      .from("bookmark")
      .delete()
      .eq("uid", uid)
      .eq("post_id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("북마크 삭제 오류", error);
    return false;
  }
};

//@param id 북마크의 id값
//북마크를 북마크의 id값을 기반으로 삭제합니다
//@return 성공시 true 실패시 false
export const deleteBookMarkByBookMarkId = async id => {
  try {
    const { error } = await supabase
      .from("bookmark")
      .delete()
      .eq("bookmark_id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("북마크 삭제 오류", error);
    return false;
  }
};
