const Profile = () => {
  return (
    <>
      {/* 반응형 컨테이너 : 작은 화면에서는 세로, 큰 화면에서는 가로 정렬 */}
      <div className="w-screen min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-8">
        <div className="bg-red-400 container mx-auto flex flex-col items-center md:flex-row gap-4 max-md:gap-10">
          {/* 프로필 영역 : 반응형 크기 조절 */}
          <div className="bg-slate-400 flex flex-col gap-6 p-4 max-w-sm self-start max-md:flex-row max-md:min-w-full max-md:items-center max-md:justify-between max-sm:flex-col">
            {/* 프로필 이미지 */}
            <div className="bg-red-300 p-4 flex justify-center">
              <div className="bg-slate-500 w-[200px] h-[200px] max-md:w-[160px] max-md:h-[160px] flex items-center justify-center rounded-full">
                프로필 이미지
              </div>
            </div>

            {/* 프로필 수정 관련 버튼 */}
            <div className="bg-green-500 flex flex-col gap-6 text-center max-md:flex-1 max-sm:w-full">
              <button className="bg-pink-300 w-full p-3 rounded-md max-sm:break-keep">
                닉네임
              </button>
              <button className="bg-pink-300 w-full p-3 rounded-md max-sm:break-keep">
                한 줄 소개
              </button>
              <button className="bg-pink-300 w-full p-3 rounded-md max-sm:break-keep">
                프로필 수정
              </button>
            </div>
          </div>

          {/* 게시물 영역 : 남은 공간을 차지하면서 반응형 그리드 적용 */}
          <div className="bg-slate-300 flex flex-col flex-1 gap-10 p-8 max-md:w-full">
            {/* 북마크 버튼 */}
            <button className="bg-gray-800 text-cyan-200 flex items-center justify-center p-2 rounded-md self-end">
              북마크
            </button>

            {/* 반응형 게시물 그리드 */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-10">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-yellow-400 flex items-center justify-center rounded-3xl text-center h-[260px]"
                >
                  box {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
