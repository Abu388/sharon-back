import { motion } from "framer-motion";
// import "./Hero.css";
import Slideshow from "./Slideshow";

const Hero = () => {
  return (
    <div className="bg-black">
      <motion.div
        className="hero-slideshow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Slideshow />
      </motion.div>
    </div>
  );
};

export default Hero;
