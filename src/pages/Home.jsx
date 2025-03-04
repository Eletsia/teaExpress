import Header from "../components/Header";
import Footer from "../components/Footer";
import { KakaoMap } from "../api/kakaoAPI";

const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex-center flex-1 bg-[#E0F2F1]"><KakaoMap /></div>
      <Footer />
    </div>
  );
};

export default Home;
