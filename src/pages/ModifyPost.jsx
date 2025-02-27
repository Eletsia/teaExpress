import React from "react";

const ModifyPost = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <img src="" alt="이미지" />
        <button>게시물 수정</button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h3>제목</h3>
          <div className="flex flex-row gap-3">
              <button>좋아요</button>
              <button>북마크</button>
          </div>
        </div>
        <ul>
          <li>댓글 1</li>
          <li>댓글 2</li>
          <li>댓글 3</li>
        </ul>
        <input type="text" name="comment" placeholder="댓글을 입력하세요" />
      </div>
    </div>
  );
};

export default ModifyPost;
