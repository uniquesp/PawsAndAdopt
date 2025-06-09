import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpResponse } from './types/signup-type';
import { SignInResponse } from './types/signin-type';

interface AuthState {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  token: string | null; // Token is only stored after login
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,  // Auth status
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

 // Handles registration: stores user but NOT a token
 setUserAfterSignup: (state, action: PayloadAction<SignUpResponse>) => {
  state.user = action.payload.user;
},

// Handles login: stores user and token
setCredentials: (state, action: PayloadAction<SignInResponse>) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;
},

// Handles logout: clears user and token
logout: (state) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false; 
},
},
});

export const { setUserAfterSignup, setCredentials } = authSlice.actions;
export default authSlice.reducer;
