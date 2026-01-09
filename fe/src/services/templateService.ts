import { apiClient } from './api';

// Types
export interface Template {
  id: number;
  name: string;
  description: string | null;
  thumbnail: string | null;
  structure: any;
  is_active: boolean;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateData {
  name: string;
  description?: string;
  thumbnail?: string;
  structure?: any;
}

export interface UpdateTemplateData {
  name?: string;
  description?: string;
  thumbnail?: string;
  structure?: any;
  is_active?: boolean;
}

// Template Service
export const templateService = {
  async createTemplate(data: CreateTemplateData): Promise<Template> {
    return apiClient.post<Template>('/templates/', data);
  },

  async getTemplates(skip = 0, limit = 50, activeOnly = true): Promise<Template[]> {
    return apiClient.get<Template[]>(
      `/templates/?skip=${skip}&limit=${limit}&active_only=${activeOnly}`
    );
  },

  async getTemplate(id: number): Promise<Template> {
    return apiClient.get<Template>(`/templates/${id}`);
  },

  async updateTemplate(id: number, data: UpdateTemplateData): Promise<Template> {
    return apiClient.put<Template>(`/templates/${id}`, data);
  },

  async deleteTemplate(id: number): Promise<void> {
    return apiClient.delete<void>(`/templates/${id}`);
  },
};

export default templateService;
