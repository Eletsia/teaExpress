const ProfileInfo = ({ user }) => {
  return (
    <div className="flex flex-col gap-6 self-start rounded-md border border-slate-400 p-6 max-sm:w-full max-sm:items-center">
      {/* 프로필 이미지 */}
      <div className="flex w-[180px] items-center justify-center rounded-md border border-slate-400">
        <img src={user?.avatar_img ?? "프로필 이미지"} alt="프로필 이미지" />
      </div>

      {/* 프로필 수정 관련 버튼 */}
      <div className="flex flex-col gap-6 text-center max-sm:w-full">
        <div className="rounded-md bg-slate-200 p-3">
          {user?.nickname ?? "닉네임"}
        </div>
        <div className="rounded-md bg-slate-200 p-3">
          {user?.introduction ?? "한 줄 소개"}
        </div>
        <button className="rounded-md bg-slate-200 p-3">프로필 수정</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
