import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransitionWrapper from "../../Animation/PageTransitionWrapper";
import ScrollToTop from "../../Animation/ScrollToTop.jsx";
import BackToTopButton from "../../Animation/BackToTopButton.jsx";
import { LenisProvider } from "../../main.jsx";

const RootLayout = () => {
  return (
    <>
      <LenisProvider />
      <ScrollToTop />
      <Navbar />
      <div className="min-h-[calc(100dvh-353px)] w-full">
        <PageTransitionWrapper>
          <Outlet />
        </PageTransitionWrapper>
      </div>
      <Footer />
      <BackToTopButton/>
    </>
  );
};

export default RootLayout;
