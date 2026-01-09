"""
Script để khởi tạo database và tạo user admin mặc định
"""
from sqlalchemy.orm import Session
from app.db.base import SessionLocal, engine, Base
from app.models.models import User, Template
from app.core.security import get_password_hash
import json


def init_db():
    """Khởi tạo database"""
    
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created")
    
    db = SessionLocal()
    
    try:
        # Kiểm tra xem đã có admin chưa
        admin = db.query(User).filter(User.email == "admin@anawim.com").first()
        
        if not admin:
            print("\nCreating default admin user...")
            admin = User(
                email="admin@anawim.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Admin Anawim",
                is_admin=True,
                is_active=True
            )
            db.add(admin)
            db.commit()
            print("✓ Admin user created")
            print("  Email: admin@anawim.com")
            print("  Password: admin123")
        else:
            print("\n✓ Admin user already exists")
        
        # Tạo một teacher demo
        teacher = db.query(User).filter(User.email == "teacher@anawim.com").first()
        if not teacher:
            print("\nCreating demo teacher user...")
            teacher = User(
                email="teacher@anawim.com",
                hashed_password=get_password_hash("teacher123"),
                full_name="Teacher Demo",
                is_admin=False,
                is_active=True
            )
            db.add(teacher)
            db.commit()
            print("✓ Teacher user created")
            print("  Email: teacher@anawim.com")
            print("  Password: teacher123")
        else:
            print("✓ Teacher user already exists")
        
        # Tạo template mẫu
        template_count = db.query(Template).count()
        if template_count == 0:
            print("\nCreating sample templates...")
            
            templates = [
                Template(
                    name="Grammar Lesson Template",
                    description="Template chuẩn cho bài học ngữ pháp",
                    thumbnail="https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?w=400",
                    structure={
                        "sections": ["Introduction", "Grammar Rules", "Examples", "Exercises"],
                        "layout": "standard"
                    },
                    is_active=True,
                    created_by=admin.id
                ),
                Template(
                    name="Vocabulary Template",
                    description="Template cho bài học từ vựng với hình ảnh",
                    thumbnail="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
                    structure={
                        "sections": ["Topic Introduction", "New Words", "Practice", "Quiz"],
                        "layout": "visual"
                    },
                    is_active=True,
                    created_by=admin.id
                ),
                Template(
                    name="Reading Comprehension",
                    description="Template cho bài đọc hiểu",
                    thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
                    structure={
                        "sections": ["Pre-reading", "Reading Text", "Comprehension Questions", "Discussion"],
                        "layout": "reading"
                    },
                    is_active=True,
                    created_by=admin.id
                )
            ]
            
            for template in templates:
                db.add(template)
            
            db.commit()
            print(f"✓ Created {len(templates)} sample templates")
        else:
            print("✓ Templates already exist")
        
        print("\n" + "="*50)
        print("Database initialization completed successfully!")
        print("="*50)
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
