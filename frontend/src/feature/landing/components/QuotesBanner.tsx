import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCarousel } from "../hooks/useCarousel";
import { Link } from "react-router-dom";
import { SHOW_ALL_PETS } from "@/routes/routes-constant";

interface Slide {
  image: string;
  title: string;
  description: string;
  altText: string;
}

const slides: Slide[] = [
    {
        image: "/images/banner3.png",
        title: "Find Your Perfect Companion",
        description: "Every pet deserves a loving home",
        altText: "image1"
    },
    {
        image: "/images/banner2.png",
        title: "Adopt, Don't Shop",
        description: "Give a rescued pet a second chance at happiness",
        altText: "image2"
    },
    {
        image: "/images/banner1.png",
        "title": "Find Your Furry Friend",
        "description": "Bring home love and companionship by adopting a pet today",
        altText: "image3"
    },
];

const Banner: React.FC = () => {
  const { currentIndex, setCurrentIndex } = useCarousel(slides.length);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#E4D3E7] to-[#D1B0D2]">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent 
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`, 
            transition: "transform 0.5s ease-in-out" 
          }}>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative flex-shrink-0 w-full">
              <AspectRatio ratio={16 / 9} className="w-full">
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.altText} 
                    className="w-full h-full object-cover object-center" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10 max-w-4xl">
                  <div className="flex items-center mb-4 text-[#D1B0D2]">
                    <Heart className="mr-2" size={28} />
                    <span className="text-sm md:text-base font-medium uppercase tracking-wider">
                      Loving Pets Adoption
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={SHOW_ALL_PETS}>
                    <Button size="lg" className="bg-[#A864AF] hover:bg-[#8A5691] text-white border-none px-6">
                      Adopt Now
                    </Button>
                  </Link>
                  </div>
                </div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <CarouselPrevious 
            className="bg-white/30 hover:bg-white/50 text-white border-none" 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          />
          <CarouselNext 
            className="bg-white/30 hover:bg-white/50 text-white border-none" 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;