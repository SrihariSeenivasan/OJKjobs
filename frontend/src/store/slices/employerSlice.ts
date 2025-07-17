import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmployerProfile {
  id: string;
  name: string;
  email: string;
  category: string;
  status: 'pending' | 'approved';
  description: string;
  logo?: string;
  hiringNeeds: string[];
  activityLog: string[];
  mobile?: string;
  numEmployees?: string;
  industry?: string;
  location?: { state: string; district: string; city: string };
  gst?: string;
}

interface EmployerState {
  employers: EmployerProfile[];
}

const initialState: EmployerState = {
  employers: [],
};

const employerSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {
    submitEmployerProfile: (state, action: PayloadAction<EmployerProfile>) => {
      // If already exists, update; else add new
      const idx = state.employers.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) {
        state.employers[idx] = action.payload;
      } else {
        state.employers.push(action.payload);
      }
    },
    approveEmployer: (state, action: PayloadAction<string>) => {
      const emp = state.employers.find(e => e.id === action.payload);
      if (emp) {
        emp.status = 'approved';
        emp.activityLog.push(`Approved on ${new Date().toISOString().slice(0, 10)}`);
      }
    },
    setEmployerCategory: (state, action: PayloadAction<{ id: string; category: string }>) => {
      const emp = state.employers.find(e => e.id === action.payload.id);
      if (emp) {
        emp.category = action.payload.category;
      }
    },
  },
});

export const { submitEmployerProfile, approveEmployer, setEmployerCategory } = employerSlice.actions;
export default employerSlice.reducer;
