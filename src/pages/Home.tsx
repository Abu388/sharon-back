import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Vision from "@/components/Home/Vision";
import Goals from "@/components/Home/Goals";
import Faith from "@/components/Home/Faith";
import Events from "@/components/Home/Events";

const Home = () => {
  return (
    <div className="mb-20 font-[poppins]">
      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Faith */}
      <Faith />

      {/* Vision */}
      <Vision />

      {/* Goals */}
      <Goals />

      {/* Events */}
      <Events />
    </div>
  );
};

export default Home;
