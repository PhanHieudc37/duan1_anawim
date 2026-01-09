export { apiClient, getToken, setToken, removeToken } from './api';
export { authService } from './authService';
export { lessonService } from './lessonService';
export { templateService } from './templateService';

export type { LoginData, RegisterData, User, AuthResponse } from './authService';
export type { 
  Lesson, 
  LessonListItem, 
  CreateLessonData, 
  UpdateLessonData,
  LessonFilters 
} from './lessonService';
export type { 
  Template, 
  CreateTemplateData, 
  UpdateTemplateData 
} from './templateService';
