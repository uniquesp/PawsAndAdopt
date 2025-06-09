import { useState } from "react";
import PetForm from "./PetForm";
import DonationForm from "./DonationForm";

const DonationPage = () => {
  const [petId, setPetId] = useState<number | null>(null);

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg">
      {!petId ? <PetForm onNext={setPetId} /> : <DonationForm petId={petId} />}
    </div>
  );
};

export default DonationPage;
