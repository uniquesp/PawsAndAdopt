export interface AdoptPetProps {
    petId: number;
    onClose: () => void;
  }
  
  export interface AdoptPetFormData {
    email: string;
    phone_no: string;
    address: string;
    expected_adoption_date: string;
  }
  