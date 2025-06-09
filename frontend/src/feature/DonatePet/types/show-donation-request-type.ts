export interface Pet {
    id: number;
    age: number;
    age_unit: string;
    gender: string;
    temperament: string;
    vaccination_status: boolean;
    medical_history: string;
    recommended_food: string;
    common_health_issues: string;
    status: string;
    pet_images: string[];
    breed_name: string;
    category_name: string;
  }
  
  export interface DonationRequest {
    id: number;
    phone_no: string;
    address: string;
    status: string;
    expected_donate_date: string;
    actual_donate_date: string | null;
    pet: Pet;
  }
  
  export interface DonationResponse {
    success: boolean;
    data?: DonationRequest[];
  }
  