
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string; // e.g. 'admin', 'employer', 'jobseeker', or custom
  location?: string;
  isVerified: boolean;
  profileComplete: boolean;
  kycVerified?: boolean;
}

// Profile type matches JobseekerProfileStepper
export interface Experience {
  title: string;
  company: string;
  duration: string;
  salary: string;
  skills: string[];
}
export interface Education {
  degree: string;
  institution: string;
  batch: string;
  medium: string;
}
export interface Profile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  location: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages: string[];
  resume: File | null;
  preferences: {
    jobTitle: string;
    jobType: string[];
    preferredLocation: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  profile: Profile | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.profile = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setProfile, setError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;