import axios from '@/core/api/axios'; // Your configured axios instance
import type { AxiosResponse } from 'axios';

// Type definitions
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    surname: string;
    userType: 'admin' | 'trainer' | 'client';
    active: boolean;
  };
}


export const AuthService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        '/login',
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }
};
