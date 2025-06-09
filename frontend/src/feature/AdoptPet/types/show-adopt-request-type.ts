export interface Pet {
    id: number;
    age: number;
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
  
  export interface AdoptionRequest {
    id: number;
    email: string;
    phone_no: string;
    address: string;
    status: string;
    expected_adoption_date: string;
    actual_adoption_date: string | null;
    pet: Pet;
  }
  
  export interface AdoptionResponse {
    success: boolean;
    data: AdoptionRequest[];
  }
  