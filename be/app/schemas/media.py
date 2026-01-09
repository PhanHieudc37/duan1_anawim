from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Media Asset Schemas
class MediaAssetBase(BaseModel):
    filename: str
    original_filename: str
    file_type: str
    mime_type: str
    file_size: int
    url: str
    width: Optional[int] = None
    height: Optional[int] = None
    duration: Optional[int] = None


class MediaAssetCreate(MediaAssetBase):
    pass


class MediaAssetResponse(MediaAssetBase):
    id: int
    uploaded_by: int
    created_at: datetime
    
    class Config:
        from_attributes = True
