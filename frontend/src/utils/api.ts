import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Change to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Register (Send OTP)
export const register = (phone_number: string, name: string) =>
  api.post('candidate/register/', { phone_number, name });

// Verify OTP
export const verifyOtp = (phone_number: string, name: string, otp: string) =>
  api.post('candidate/verify/', { phone_number, name, otp });

// Refresh Token
export const refreshToken = (refresh: string) =>
  api.post('candidate/token/refresh/', { refresh });

// Get Candidates
export const getCandidates = () =>
  api.get('candidate/candidates/');

// Candidate details type
export interface CandidateDetails {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  location: string;
  experience_title?: string;
  experience_company?: string;
  experience_duration?: string;
  experience_salary?: number;
  experience_skills?: string[];
  education_degree?: string;
  education_institution?: string;
  education_batch?: string;
  education_medium?: string;
  skills?: string[];
  certifications?: string[];
  languages?: string[];
  resume?: File | null;
  preference_job_title?: string;
  preference_location?: string;
  preference_job_type?: string[];
}

// Create Candidate
export const createCandidate = (data: CandidateDetails) =>
  api.post('candidates/', data);

// Get Candidate Detail
export const getCandidateDetail = (pk: number) =>
  api.get(`candidates/${pk}/`);

// Update Candidate
export const updateCandidate = (pk: number, data: CandidateDetails) =>
  api.put(`candidates/${pk}/`, data);

// Delete Candidate
export const deleteCandidate = (pk: number) =>
  api.delete(`candidates/${pk}/`);
