import axios from '@/core/api/axios'; // Your configured axios instance
import type { AxiosResponse } from 'axios';

// Type definitions
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  authorization: {
    token: string;
    type: string;
  }
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    user_type_id: number;
    confirmed_email: boolean;
    active: boolean;
  };
}

export const AuthService = {
  /**
   * Authenticate user with email/password
   */
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

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    // Add any logout logic here
    localStorage.removeItem('token');
  }
};