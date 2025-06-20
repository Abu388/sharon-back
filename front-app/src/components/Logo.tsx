import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex cursor-pointer items-center font-serif">
      <img
        src="/assets/logo.png"
        className="w-10 h-10"
        alt="logo"
        // style={{ filter: "brightness(0) invert(1)" }}
      />
      <p className="text-xs w-30">Sharon Children Services-Ethiopia</p>
    </Link>
  );
};

export default Logo;
