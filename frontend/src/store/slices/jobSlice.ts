import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: {
    city: string;
    state: string;
    coordinates?: { lat: number; lng: number };
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'full-time' | 'part-time' | 'contract' | 'temporary' | '1-day';
  industry: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  expiryDate: string;
  isActive: boolean;
  isBoosted: boolean;
  applicationsCount: number;
  employerId: string;
  kycVerified?: boolean;
  status?: 'pending' | 'approved';
}

interface JobState {
  jobs: Job[];
  myJobs: Job[];
  appliedJobs: string[];
  savedJobs: string[];
  loading: boolean;
  error: string | null;
  filters: {
    type: string;
    location: string;
    salary: number;
    industry: string;
  };
}

const initialState: JobState = {
  jobs: [],
  myJobs: [],
  appliedJobs: [],
  savedJobs: [],
  loading: false,
  error: null,
  filters: {
    type: '',
    location: '',
    salary: 0,
    industry: '',
  },
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    setMyJobs: (state, action: PayloadAction<Job[]>) => {
      state.myJobs = action.payload;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.unshift(action.payload);
      state.myJobs.unshift(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
      const myJobIndex = state.myJobs.findIndex(job => job.id === action.payload.id);
      if (myJobIndex !== -1) {
        state.myJobs[myJobIndex] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      state.myJobs = state.myJobs.filter(job => job.id !== action.payload);
    },
    applyToJob: (state, action: PayloadAction<string>) => {
      if (!state.appliedJobs.includes(action.payload)) {
        state.appliedJobs.push(action.payload);
      }
    },
    saveJob: (state, action: PayloadAction<string>) => {
      if (!state.savedJobs.includes(action.payload)) {
        state.savedJobs.push(action.payload);
      }
    },
    unsaveJob: (state, action: PayloadAction<string>) => {
      state.savedJobs = state.savedJobs.filter(id => id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<JobState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setJobs,
  setMyJobs,
  addJob,
  updateJob,
  deleteJob,
  applyToJob,
  saveJob,
  unsaveJob,
  setFilters,
  setError,
  clearError,
} = jobSlice.actions;

export default jobSlice.reducer;