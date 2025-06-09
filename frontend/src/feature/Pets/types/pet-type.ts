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
  pet_images: string[]; // Array of image URLs
  breed_name: string;
  category_name: string;
}

export interface PetsResponse {
  success: boolean;
  pets: Pet[];
  message?: string; // In case of an error message
}
