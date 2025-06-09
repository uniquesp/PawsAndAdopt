export interface Category {
  id: number;
  category_name: string;
}

export interface Breed {
  id: number;
  breed_name: string;
  category_id: number;
}

export interface Pet {
  id?: number;
  age: number;
  age_unit: string; // "days" | "months" | "years"
  gender: number; // 1 - Male, 2 - Female
  temperament: string;
  vaccination_status?: boolean; // Optional for checkbox field
  medical_history: string;
  recommended_food: string;
  common_health_issues: string;
  status: number; // 0 - Available, 1 - Not Available
  pet_images?: [];
  category_id: number;
  breed_id: number;
}

// Donation Interface
export interface Donation {
  id?: number;
  pet_id: number;
  email: string;
  address: string;
  phone_no: string;
  expected_donate_date: string;
  actual_donate_date?: string; // Optional for auto-set value
  user_id?: number | null; // Optional for logged-in user
}

// API Response Interface
export interface ApiResponse<T> {
  [x: string]: any;
  success: boolean;
  data: T;
  message?: string;
}

// Redux API Response Types
export interface GetCategoriesResponse extends ApiResponse<{ categories: Category[] }> {}

export interface GetBreedsResponse extends ApiResponse<{ breeds: Breed[] }> {}

export interface CreatePetResponse extends ApiResponse<{ pet_id: number }> {}

export interface CreateDonationResponse extends ApiResponse<{ success: boolean; message: string }> {}