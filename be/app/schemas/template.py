from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime


# Template Schemas
class TemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    structure: Optional[dict] = None


class TemplateCreate(TemplateBase):
    pass


class TemplateUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    structure: Optional[dict] = None
    is_active: Optional[bool] = None


class TemplateResponse(TemplateBase):
    id: int
    is_active: bool
    created_by: Optional[int]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
