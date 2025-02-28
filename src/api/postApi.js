import supabase from "../shared/supabase";

//@param id === 가져올 포스트의 id 값
//상세페이지창에서 표시할 단일 포스트의 정보를 가져옵니다
//@return title,content,img_list
//location lat lng created_at 정보가 담긴 object타입의 data배열
//실패시 null을 리턴합니다
export const getPostById = async id => {
  try {
    const postId = id;
    const { data, error } = await supabase
      .from("posts")
      .select("title,content,img_list,location,lat,lng,created_at")
      .eq("post_id", postId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("단일 포스트 가져오기 오류", error);
    return null;
  }
};

//현재 저장된 전체 포스트 정보를 가져옵니다
//@return posts테이블의 저장된 포스트 데이터 전체가 담긴 object 배열
//실패시 null을 리턴합니다
export const getPostAll = async () => {
  try {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("전체체 포스트 가져오기 오류", error);
    return null;
  }
};

//@param formData (포스트에 담길 정보가 담긴 객체)
//@param uid (유저의 uid값)
//포스트를 데이터베이스에 추가합니다
//@return 성공시 저장한 포스트 정보를 리턴합니다
//실패시 null을 리턴합니다
export const insertPost = async (formData, uid) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          uid: uid,
          title: formData.title,
          content: formData.content,
          img_list: formData.img_list,
          location: formData.location,
        },
      ])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("포스트 생성 오류", error);
    return null;
  }
};

//@param formData(업데이트할 포스트 정보)
//@param id (업데이트할 포스트의 아이디)
//이미 존재하는 포스트를 업데이트합니다
//@return 업데이트한 포스트 정보를 리턴합니다
//실패시 null을 리턴합니다
export const updatePost = async (formData, id) => {
  try {
    const postId = id;
    if (!postId) throw new Error("잘못된 포스트 정보 입니다.");

    const { data, error } = await supabase
      .from("posts")
      .update({
        title: formData.title,
        content: formData.content,
        img_list: formData.img_list,
        location: formData.location,
        lat: formData.lat,
        lng: formData.lng,
      })
      .eq("post_id", postId)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("포스트 업데이트 오류", error);
    return null;
  }
};

//@param 삭제할 포스트의 id 값
//포스트를 삭제합니다
//@return 포스트 삭제 성공시 true 그렇지 않으면 false
export const deletePostById = async id => {
  try {
    const { error } = await supabase.from("posts").delete().eq("post_id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("포스트 삭제 오류", error);
    return false;
  }
};
