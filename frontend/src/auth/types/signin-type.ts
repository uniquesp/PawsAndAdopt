export interface SignInRequest {
    email: string;
    password: string;
  }
  
  
  export interface SignInResponse {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone_no : string;
      profile_image:string;
    };
    token: string;
  }
  
  