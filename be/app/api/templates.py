from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..db.base import get_db
from ..models.models import Template, User
from ..schemas.template import TemplateCreate, TemplateUpdate, TemplateResponse
from ..api.deps import get_current_user, require_admin

router = APIRouter()


@router.post("/", response_model=TemplateResponse, status_code=status.HTTP_201_CREATED)
def create_template(
    template_data: TemplateCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Tạo template mới (chỉ admin)"""
    
    new_template = Template(
        **template_data.model_dump(),
        created_by=current_user.id
    )
    
    db.add(new_template)
    db.commit()
    db.refresh(new_template)
    
    return new_template


@router.get("/", response_model=List[TemplateResponse])
def list_templates(
    skip: int = 0,
    limit: int = 50,
    active_only: bool = True,
    db: Session = Depends(get_db)
):
    """Lấy danh sách templates"""
    
    query = db.query(Template)
    
    if active_only:
        query = query.filter(Template.is_active == True)
    
    templates = query.offset(skip).limit(limit).all()
    return templates


@router.get("/{template_id}", response_model=TemplateResponse)
def get_template(
    template_id: int,
    db: Session = Depends(get_db)
):
    """Lấy chi tiết template"""
    
    template = db.query(Template).filter(Template.id == template_id).first()
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy template"
        )
    
    return template


@router.put("/{template_id}", response_model=TemplateResponse)
def update_template(
    template_id: int,
    template_data: TemplateUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Cập nhật template (chỉ admin)"""
    
    template = db.query(Template).filter(Template.id == template_id).first()
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy template"
        )
    
    update_data = template_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(template, field, value)
    
    db.commit()
    db.refresh(template)
    
    return template


@router.delete("/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_template(
    template_id: int,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Xóa template (chỉ admin)"""
    
    template = db.query(Template).filter(Template.id == template_id).first()
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy template"
        )
    
    db.delete(template)
    db.commit()
    
    return None
