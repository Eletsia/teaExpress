import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 여기에 라우트마다 바뀌는 컴포넌트가 들어감 */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
