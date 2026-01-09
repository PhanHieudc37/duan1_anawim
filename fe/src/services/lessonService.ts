import { apiClient } from './api';

// Types
export interface Lesson {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  content: any; // Canvas elements
  level: string | null;
  topic: string | null;
  duration: number | null;
  status: string;
  is_public: boolean;
  author_id: number;
  template_id: number | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface LessonListItem {
  id: number;
  title: string;
  thumbnail: string | null;
  level: string | null;
  topic: string | null;
  status: string;
  author_id: number;
  updated_at: string;
}

export interface CreateLessonData {
  title: string;
  description?: string;
  thumbnail?: string;
  content?: any;
  level?: string;
  topic?: string;
  duration?: number;
  template_id?: number;
}

export interface UpdateLessonData {
  title?: string;
  description?: string;
  thumbnail?: string;
  content?: any;
  level?: string;
  topic?: string;
  duration?: number;
  status?: string;
  is_public?: boolean;
  template_id?: number;
}

export interface LessonFilters {
  skip?: number;
  limit?: number;
  status_filter?: string;
  level?: string;
  topic?: string;
}

// Lesson Service
export const lessonService = {
  async createLesson(data: CreateLessonData): Promise<Lesson> {
    return apiClient.post<Lesson>('/lessons/', data);
  },

  async getLessons(filters: LessonFilters = {}): Promise<LessonListItem[]> {
    const params = new URLSearchParams();
    
    if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters.status_filter) params.append('status_filter', filters.status_filter);
    if (filters.level) params.append('level', filters.level);
    if (filters.topic) params.append('topic', filters.topic);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/lessons/?${queryString}` : '/lessons/';
    
    return apiClient.get<LessonListItem[]>(endpoint);
  },

  async getLesson(id: number): Promise<Lesson> {
    return apiClient.get<Lesson>(`/lessons/${id}`);
  },

  async updateLesson(id: number, data: UpdateLessonData): Promise<Lesson> {
    return apiClient.put<Lesson>(`/lessons/${id}`, data);
  },

  async deleteLesson(id: number): Promise<void> {
    return apiClient.delete<void>(`/lessons/${id}`);
  },

  async getMyLessons(skip = 0, limit = 20): Promise<LessonListItem[]> {
    return apiClient.get<LessonListItem[]>(
      `/lessons/my/lessons?skip=${skip}&limit=${limit}`
    );
  },
};

export default lessonService;
