import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex-center flex-1 bg-[#E0F2F1]">콘텐츠 영역</div>
      <Footer />
    </div>
  );
};

export default Home;
