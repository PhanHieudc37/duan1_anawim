from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime


# Lesson Schemas
class LessonBase(BaseModel):
    title: str
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    content: Optional[dict] = None  # Canvas elements
    level: Optional[str] = None
    topic: Optional[str] = None
    duration: Optional[int] = None
    template_id: Optional[int] = None


class LessonCreate(LessonBase):
    pass


class LessonUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    content: Optional[dict] = None
    level: Optional[str] = None
    topic: Optional[str] = None
    duration: Optional[int] = None
    status: Optional[str] = None
    is_public: Optional[bool] = None
    template_id: Optional[int] = None


class LessonResponse(LessonBase):
    id: int
    status: str
    is_public: bool
    author_id: int
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class LessonListResponse(BaseModel):
    id: int
    title: str
    thumbnail: Optional[str]
    level: Optional[str]
    topic: Optional[str]
    status: str
    author_id: int
    updated_at: datetime
    
    class Config:
        from_attributes = True
