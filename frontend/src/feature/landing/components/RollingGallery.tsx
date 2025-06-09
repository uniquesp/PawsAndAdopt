import React from "react";
import { motion } from "framer-motion";

interface Slide {
  image: string;
  altText: string;
}

interface RollingGalleryProps {
  slides: Slide[];
  autoplay?: boolean;
  pauseOnHover?: boolean;
  speed?: number; // Speed in seconds
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  slides,
  autoplay = false,
  pauseOnHover = false,
  speed = 3, 
}) => {
  // Duplicate slides for smooth looping
  const extendedSlides = [...slides, ...slides];

  return (
    <div className="relative overflow-hidden w-full h-[300px] flex items-center bg-gradient-to-br from-[#E4D3E7] to-[#D1B0D2]">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: "-10%" }}
        transition={{
          repeat: Infinity,
          duration: speed,
          autoplay: autoplay,
          ease: "linear",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-[400px] flex-shrink-0 mx-2">
            <img
              src={slide.image}
              alt={slide.altText}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RollingGallery;
