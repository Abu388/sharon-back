import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { Toaster } from "sonner";
// import { Home } from "lucide-react";

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
      {/* {location.pathname !== "/" && (
        <Link
          to="/"
          className="fixed top-22 left-4 z-30 rounded-full border border-gray-300 bg-white px-4 py-2 shadow transition hover:bg-gray-100"
          aria-label="Back to Home"
        >
          <Home />
        </Link>
      )} */}
      <Outlet />
      <div className="w-full">
        <Footer />
      </div>
      <Toaster className="font-[poppins]" />
    </div>
  );
};

export default Layout;
