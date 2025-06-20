import { useEffect, useState } from "react";

const images = [
  "/assets/images/Hero/photo_4_2025-05-17_04-29-23.jpg",
  "/assets/images/Hero/photo_6_2025-05-17_04-29-23.jpg",
  "/assets/images/Hero/photo_5_2025-05-17_04-29-23.jpg",
];

const GoalsSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute h-full w-full bg-gradient-to-l from-white to-transparent object-cover"></div>
      <img
        src={images[currentImageIndex]}
        alt={`Goal Slide ${currentImageIndex + 1}`}
        className="h-full w-full"
      />
    </div>
  );
};

export default GoalsSlideshow;
