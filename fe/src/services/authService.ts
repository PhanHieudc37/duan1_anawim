import { apiClient, setToken, removeToken } from './api';

// Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name?: string;
  is_admin: boolean;
}

export interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Auth Service
export const authService = {
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    setToken(response.access_token);
    
    // Get user info
    const user = await this.getCurrentUser();
    
    return {
      user,
      token: response.access_token,
    };
  },

  async register(data: RegisterData): Promise<User> {
    const user = await apiClient.post<User>('/auth/register', data);
    return user;
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  logout(): void {
    removeToken();
  },

  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/auth/users');
  },
};

export default authService;
