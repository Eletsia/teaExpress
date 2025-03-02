const ProfileInfo = ({ user }) => {
  return (
    <div className="flex max-w-sm flex-col gap-6 self-start border border-slate-500 p-4 max-md:min-w-full max-md:flex-row max-md:items-center max-md:justify-between">
      {/* 프로필 이미지 */}
      <div className="flex w-[200px] items-center justify-center">
        <img src={user?.avatar_img ?? "프로필 이미지"} alt="프로필 이미지" />
      </div>

      {/* 프로필 수정 관련 버튼 */}
      <div className="flex flex-col gap-6 text-center max-md:flex-1 max-sm:w-full">
        <div className="w-full rounded-md bg-slate-200 p-3 max-sm:break-keep">
          {user?.nickname ?? "닉네임"}
        </div>
        <div className="w-full rounded-md bg-slate-200 p-3 max-sm:break-keep">
          {user?.introduction ?? "한 줄 소개"}
        </div>
        <button className="w-full rounded-md bg-slate-200 p-3 max-sm:break-keep">
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
