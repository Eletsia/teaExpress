import supabase from "../shared/supabase";

// @param id === 유저의 uid값
// supabase로부터 public.user테이블의 "email" "nickname" "introduction" "avatar_img" 값을 가져옵니다.
// @return 해당 정보가 담긴 Type : object의 data배열
export const getUserInfo = async id => {
  try {
    const userId = id;

    if (!userId) throw new Error("잘못된 유저 정보입니다.");

    const { data, error } = await supabase
      .from("users")
      .select("uid,email,nickname,introduction,avatar_img") // uid 추가
      .eq("uid", userId)
      .single(); // 한 개의 객체만 반환하도록 변경

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("유저 정보 가져오기 오류", error);

    return null;
  }
};

// @param formData 업데이트할 유저의 정보가 담긴 객체
// @param id 업데이트할 유저의 uid값
// 회원 정보를 수정합니다.
// @return 업데이트한 유저 정보를 리턴합니다.
// 실패 시, null을 리턴합니다.
export const updataUserInfo = async (formData, id) => {
  try {
    const userId = id;

    if (!userId) throw new Error("잘못된 유저 정보입니다.");

    const { data, error } = await supabase
      .from("users")
      .update({
        nickname: formData.nickname,
        introduction: formData.introduction,
        avatar_img: formData.avatar_img,
      })
      .eq("uid", userId)
      .select();

    if (error) throw error;

    console.log("업데이트 요청 데이터:", formData); // 확인 완료
    console.log("업데이트 요청 uid:", userId); // 확인 완료
    console.log("Supabase 응답:", data, error); // 확인 불가 - null 반환

    return data;
  } catch (error) {
    console.error("유저 정보 업데이트 오류", error);

    return null;
  }
};
