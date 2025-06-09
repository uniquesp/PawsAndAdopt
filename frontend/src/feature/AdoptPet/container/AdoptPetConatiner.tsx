import { useState } from "react";
import { useAdoptPetMutation } from "../api/adoptPetApi";
import { AdoptPetFormData, AdoptPetProps } from "../types/adoptpet-type";
import AdoptPetForm from "../components/AdoptPetForm";


const AdoptPetContainer = ({ petId, onClose }: AdoptPetProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  const [formData, setFormData] = useState<AdoptPetFormData>({
    email: "",
    phone_no: "",
    address: "",
    expected_adoption_date: "",
  });

  const [adoptPet, { isLoading }] = useAdoptPetMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, u_id: Number(userId), p_id: petId };

    try {
      const response = await adoptPet(payload).unwrap();
      console.log(response);
      // toast.success(response.message || "Adoption request submitted!");
      onClose();
    } catch (error) {
      // toast.error(error?.data?.message || "Failed to submit adoption request.");
    }
  };

  return <AdoptPetForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} onClose={onClose} />;
};

export default AdoptPetContainer;
