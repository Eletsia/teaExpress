const ProfilePosts = ({ posts }) => {
  const userTestPosts = () => {
    if (!posts || posts.length === 0) {
      return <div>게시물이 없습니다.</div>;
    }

    return posts.map(postItem => {
      return (
        <div
          key={postItem.post_id}
          className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-slate-400 p-4 text-left"
        >
          <img src={postItem.img_list} alt="이미지" />
          <div className="w-full bg-slate-200 p-2">
            title : {postItem.title}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-md border border-slate-400 p-6">
      {/* 북마크 버튼 */}
      <button className="flex items-center justify-center self-end rounded-md bg-slate-200 p-2">
        북마크
      </button>

      {/* 반응형 게시물 그리드 */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10">
        {userTestPosts()}
      </div>
    </div>
  );
};

export default ProfilePosts;
