import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/assets/images/Hero/photo_1_2025-05-17_04-29-23.jpg",
  "/assets/images/Hero/photo_2_2025-05-17_04-29-23.jpg",
  "/assets/images/Hero/photo_9_2025-05-17_04-29-23.jpg",
];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="slideshow-container relative min-h-screen">
      <div className="slideshow-content absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform px-4 text-center text-white sm:px-8">
        <h1 className="mb-8 text-2xl leading-tight font-extrabold drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
          Make a Difference—Support Sharon Children Services Today!
        </h1>
        <div className="slideshow-buttons flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/donation")}
            className="flex items-center gap-2 rounded-full bg-[#0065ca] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#006fdf] sm:px-6 sm:py-3 sm:text-base"
          >
            {/* Lucide: HeartHandshake */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 21s-8-6.58-8-11.5A5.5 5.5 0 0 1 12 4.5a5.5 5.5 0 0 1 8 5.01C20 14.42 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Donate Now
          </button>
        </div>
      </div>
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="slideshow-image absolute top-0 left-0 z-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default Slideshow;
