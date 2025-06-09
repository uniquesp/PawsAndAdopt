export interface SignUpRequest {
    first_name: string;
    last_name: string;
    phone_no: string; 
    email: string;
    password: string;
    password_confirmation: string;
    profile_image?: string;
  }
  
  
  export interface SignUpResponse {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  }
  