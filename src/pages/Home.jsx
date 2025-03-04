import { KakaoMap } from "../api/kakaoAPI";

const Home = () => {
  return (
    <div className="flex items-center justify-between gap-10 bg-red-100">
      <div className="flex-center flex-1 bg-red-400 p-2">추천 영역</div>
      <div className="h-[400px] w-[600px]">
        <KakaoMap />
      </div>
    </div>
  );
};

export default Home;
