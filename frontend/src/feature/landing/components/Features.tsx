import React from "react";
import FeatureItem from "./FeatureItem";
import { Heart, Home, Scissors, Utensils } from "lucide-react";

const features = [
  {
    title: "Free Veterinary Care",
    description: "Get expert medical care for your pets at no cost.",
    icon: (
      <Heart className="w-6 h-6 text-[#8A5691]" />
    ),
  },
  {
    title: "Pet Adoption Support",
    description: "Find your perfect furry friend and give them a loving home.",
    icon: (
      <Home className="w-6 h-6 text-[#8A5691]" />
    ),
  },
  {
    title: "Personalized Pet Diet Plans",
    description: "Custom meal plans to keep your pet healthy and happy.",
    icon: (
      <Utensils className="w-6 h-6 text-[#8A5691]" />
    ),
  },
  {
    title: "Pet Grooming & Spa",
    description: "Pamper your pets with professional grooming services.",
    icon: (
      <Scissors className="w-6 h-6 text-[#8A5691]" />
    ),
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-[#E4D3E7] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#8A5691]">Our Special Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;