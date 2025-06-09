import { signInApi } from '@/auth/api/signInApi';
import { signUpApi } from '@/auth/api/signUpApi';
import authSlice from '@/auth/authSlice';
import { adoptionApi } from '@/feature/AdoptPet/api/adoptPetApi';
import { showAdoptRequestApi } from '@/feature/AdoptPet/api/showAdoptRequest';
import { categoryApi } from '@/feature/DonatePet/api/categoryApi';
import { donationApi } from '@/feature/DonatePet/api/donateApi';
import { showDonateRequestApi } from '@/feature/DonatePet/api/showDonateRequestApi';
import { showAllPetsApi } from '@/feature/Pets/api/showAllPetsApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice, // Add authSlice reducer here
    [signUpApi.reducerPath]: signUpApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [showAllPetsApi.reducerPath]: showAllPetsApi.reducer,
    [adoptionApi.reducerPath]: adoptionApi.reducer,
    [showAdoptRequestApi.reducerPath]: showAdoptRequestApi.reducer,
    [donationApi.reducerPath]: donationApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [showDonateRequestApi.reducerPath]: showDonateRequestApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signUpApi.middleware, signInApi.middleware, showAllPetsApi.middleware, adoptionApi.middleware, showAdoptRequestApi.middleware, donationApi.middleware, categoryApi.middleware, showDonateRequestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
