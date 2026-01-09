from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..db.base import get_db
from ..models.models import Lesson, User
from ..schemas.lesson import LessonCreate, LessonUpdate, LessonResponse, LessonListResponse
from ..api.deps import get_current_user, require_admin

router = APIRouter()


@router.post("/", response_model=LessonResponse, status_code=status.HTTP_201_CREATED)
def create_lesson(
    lesson_data: LessonCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Tạo bài học mới"""
    
    new_lesson = Lesson(
        **lesson_data.model_dump(),
        author_id=current_user.id
    )
    
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    
    return new_lesson


@router.get("/", response_model=List[LessonListResponse])
def list_lessons(
    skip: int = 0,
    limit: int = 20,
    status_filter: Optional[str] = None,
    level: Optional[str] = None,
    topic: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Lấy danh sách bài học"""
    
    query = db.query(Lesson)
    
    # Admin xem tất cả, user chỉ xem của mình và public
    if not current_user.is_admin:
        query = query.filter(
            (Lesson.author_id == current_user.id) | (Lesson.is_public == True)
        )
    
    # Filters
    if status_filter:
        query = query.filter(Lesson.status == status_filter)
    if level:
        query = query.filter(Lesson.level == level)
    if topic:
        query = query.filter(Lesson.topic == topic)
    
    lessons = query.order_by(Lesson.updated_at.desc()).offset(skip).limit(limit).all()
    return lessons


@router.get("/{lesson_id}", response_model=LessonResponse)
def get_lesson(
    lesson_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Lấy chi tiết bài học"""
    
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy bài học"
        )
    
    # Kiểm tra quyền truy cập
    if not current_user.is_admin and lesson.author_id != current_user.id and not lesson.is_public:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Không có quyền truy cập bài học này"
        )
    
    return lesson


@router.put("/{lesson_id}", response_model=LessonResponse)
def update_lesson(
    lesson_id: int,
    lesson_data: LessonUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Cập nhật bài học"""
    
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy bài học"
        )
    
    # Kiểm tra quyền chỉnh sửa
    if not current_user.is_admin and lesson.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Không có quyền chỉnh sửa bài học này"
        )
    
    # Update fields
    update_data = lesson_data.model_dump(exclude_unset=True)
    
    # Nếu publish, set published_at
    if update_data.get("status") == "published" and lesson.status != "published":
        update_data["published_at"] = datetime.utcnow()
    
    for field, value in update_data.items():
        setattr(lesson, field, value)
    
    db.commit()
    db.refresh(lesson)
    
    return lesson


@router.delete("/{lesson_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lesson(
    lesson_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Xóa bài học"""
    
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy bài học"
        )
    
    # Kiểm tra quyền xóa
    if not current_user.is_admin and lesson.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Không có quyền xóa bài học này"
        )
    
    db.delete(lesson)
    db.commit()
    
    return None


@router.get("/my/lessons", response_model=List[LessonListResponse])
def get_my_lessons(
    skip: int = 0,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Lấy danh sách bài học của tôi"""
    
    lessons = db.query(Lesson).filter(
        Lesson.author_id == current_user.id
    ).order_by(Lesson.updated_at.desc()).offset(skip).limit(limit).all()
    
    return lessons
