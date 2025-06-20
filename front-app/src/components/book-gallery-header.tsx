import { useEffect, useState } from "react";
const images = [
  "/assets/images/Hero/photo_1_2025-05-17_04-29-23.jpg",
  "/assets/images/Hero/photo_2_2025-05-17_04-29-23.jpg",
  "/assets/images/Hero/photo_9_2025-05-17_04-29-23.jpg",
];

export default function BookGalleryHeader() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="relative bg-(--blue)/50 py-16 pt-18 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Sharon Children's Services Book Gallery
        </h1>
        <p className="mx-auto max-w-3xl text-xl">
          Explore our collection of books for children and families. All
          proceeds support our ministry programs.
        </p>
      </div>
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className="slideshow-image absolute top-0 left-0 -z-10 h-full w-full object-cover"
      />
    </div>
  );
}
