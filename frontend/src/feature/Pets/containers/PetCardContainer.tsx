import { useState } from "react";
import { toast } from "sonner";

import AdoptPetContainer from "@/feature/AdoptPet/container/AdoptPetConatiner";
import useAuth from "@/shared/hooks/useAuth";
import { Pet } from "../types/pet-type";
import PetCard from "../components/PetCard";
import ViewPetContainer from "./ViewPetContainer";

const PetCardContainer = ({ pet }: { pet: Pet }) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { isLoggedIn } = useAuth();

  const handleAdoptClick = () => {
    if (!isLoggedIn()) {
      toast.error("Login Required", {
        description: "Please log in to adopt a pet.",
      });
      return;
    }
    if (pet.status === "Unavailable") {
      toast.error("Pet Adoption Unavailable", {
        description: `Sorry, ${pet.breed_name} is currently not available for adoption.`,
      });
      return;
    }
    setIsAdoptModalOpen(true);
  };

  return (
    <>
      <PetCard 
        pet={pet} 
        isHovered={isHovered} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onViewClick={() => setSelectedPetId(pet.id)}
        onAdoptClick={handleAdoptClick}
      />

      {selectedPetId && <ViewPetContainer petId={selectedPetId} onClose={() => setSelectedPetId(null)} />}
      {isAdoptModalOpen && <AdoptPetContainer petId={pet.id} onClose={() => setIsAdoptModalOpen(false)} />}
    </>
  );
};

export default PetCardContainer;
