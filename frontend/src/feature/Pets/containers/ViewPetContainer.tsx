import { useEffect, useState } from "react";
import ViewPet from "../components/ViewPet";
import { Pet } from "../types/pet-type";

interface ViewPetContainerProps {
  petId: number;
  onClose: () => void;
}

const ViewPetContainer = ({ petId, onClose }: ViewPetContainerProps) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPet(null);
    setLoading(true);
    setError("");

    fetch(`http://localhost:3000/api/v1/pets/${petId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPet(data.pet);
        } else {
          setError("Failed to load pet details.");
        }
      })
      .catch(() => setError("Error fetching pet details."))
      .finally(() => setLoading(false));
  }, [petId]);

  return <ViewPet pet={pet} loading={loading} error={error} onClose={onClose} />;
};

export default ViewPetContainer;
