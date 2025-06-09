import { useEffect, useState } from "react";

export const useCarousel = (slidesLength: number, intervalTime = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesLength);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [slidesLength, intervalTime]);

  return { currentIndex, setCurrentIndex };
};
