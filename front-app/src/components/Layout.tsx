import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { Toaster } from "sonner";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="relative min-h-screen font-[poppins]">
      <div className="fixed z-20 w-full">
        <Navbar onOther={location.pathname !== "/"} />
      </div>
      <Outlet />
      <div className="w-full">
        <Footer />
      </div>
      <Toaster className="font-[poppins]" />
    </div>
  );
};

export default Layout;
