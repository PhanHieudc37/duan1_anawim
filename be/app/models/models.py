from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db.base import Base


class User(Base):
    """Model cho người dùng (Giáo viên / Admin)"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    lessons = relationship("Lesson", back_populates="author")


class Template(Base):
    """Model cho template giáo trình"""
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    thumbnail = Column(String(500), nullable=True)
    structure = Column(JSON, nullable=True)  # Cấu trúc mẫu của template
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    lessons = relationship("Lesson", back_populates="template")


class Lesson(Base):
    """Model cho bài giảng / giáo trình"""
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    thumbnail = Column(String(500), nullable=True)
    
    # Nội dung canvas (các elements)
    content = Column(JSON, nullable=True)  # Lưu trữ các elements như text, image, shape
    
    # Metadata
    level = Column(String(50), nullable=True)  # Beginner, Intermediate, Advanced
    topic = Column(String(255), nullable=True)  # Grammar, Vocabulary, Reading, etc.
    duration = Column(Integer, nullable=True)  # Thời lượng bài học (phút)
    
    # Status
    status = Column(String(50), default="draft")  # draft, published, archived
    is_public = Column(Boolean, default=False)  # Công khai cho giáo viên khác
    
    # References
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    template_id = Column(Integer, ForeignKey("templates.id"), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at = Column(DateTime, nullable=True)
    
    # Relationships
    author = relationship("User", back_populates="lessons")
    template = relationship("Template", back_populates="lessons")


class MediaAsset(Base):
    """Model cho media assets (ảnh, video, audio)"""
    __tablename__ = "media_assets"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)  # image, video, audio
    mime_type = Column(String(100), nullable=False)
    file_size = Column(Integer, nullable=False)  # bytes
    url = Column(String(500), nullable=False)
    
    # Metadata
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    duration = Column(Integer, nullable=True)  # for audio/video
    
    # Owner
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    
    is_deleted = Column(Boolean, default=False)
