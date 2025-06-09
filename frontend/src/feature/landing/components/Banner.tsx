import React from "react";
import RollingGallery from "./RollingGallery";

const slides = [
  { image: "/images/banner6.png", altText: "image1" },
  { image: "/images/banner4.png", altText: "image2" },
  { image: "/images/banner5.png", altText: "image3" },
];

const Banner: React.FC = () => {
  return (
    <div className="relative">
      <RollingGallery slides={slides} autoplay={true} pauseOnHover={true} speed={8} />
    </div>
  );
};

export default Banner;
