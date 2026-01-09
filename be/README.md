# Anawim English Teaching Platform - Backend

Backend API cho hệ thống soạn giáo trình tiếng Anh Anawim, xây dựng bằng FastAPI và SQLite.

## 🚀 Tính năng

- **Authentication & Authorization**: Đăng ký, đăng nhập với JWT
- **User Management**: Quản lý giáo viên và admin
- **Lesson Management**: Tạo, chỉnh sửa, xóa bài giảng
- **Template System**: Hệ thống template cho giáo trình
- **Role-based Access Control**: Phân quyền admin/teacher

## 📦 Cài đặt

### Yêu cầu
- Python 3.8+
- pip

### Các bước cài đặt

1. **Tạo môi trường ảo (khuyến nghị)**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

2. **Cài đặt dependencies**
```bash
pip install -r requirements.txt
```

3. **Tạo file .env**
```bash
copy .env.example .env
```

Chỉnh sửa file `.env` theo nhu cầu:
```env
DATABASE_URL=sqlite:///./anawim.db
SECRET_KEY=your-secret-key-here-change-in-production
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

4. **Khởi tạo database**
```bash
python init_db.py
```

Lệnh này sẽ:
- Tạo database và các bảng
- Tạo tài khoản admin mặc định: `admin@anawim.com` / `admin123`
- Tạo tài khoản teacher demo: `teacher@anawim.com` / `teacher123`
- Tạo các template mẫu

## 🏃‍♂️ Chạy ứng dụng

### Development mode
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server sẽ chạy tại: http://localhost:8000

### API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📁 Cấu trúc thư mục

```
be/
├── app/
│   ├── api/              # API endpoints
│   │   ├── auth.py       # Authentication routes
│   │   ├── lessons.py    # Lesson management
│   │   ├── templates.py  # Template management
│   │   └── deps.py       # Dependencies (auth, permissions)
│   ├── core/             # Core functionality
│   │   ├── config.py     # App configuration
│   │   └── security.py   # Security utilities (JWT, password)
│   ├── db/               # Database
│   │   └── base.py       # Database connection
│   ├── models/           # SQLAlchemy models
│   │   └── models.py     # User, Lesson, Template, MediaAsset
│   ├── schemas/          # Pydantic schemas
│   │   ├── user.py       # User schemas
│   │   ├── lesson.py     # Lesson schemas
│   │   ├── template.py   # Template schemas
│   │   └── media.py      # Media schemas
│   └── main.py           # FastAPI app initialization
├── init_db.py            # Database initialization script
├── requirements.txt      # Python dependencies
├── .env.example          # Environment variables example
└── .gitignore
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `GET /api/auth/users` - Danh sách users (admin only)

### Lessons
- `POST /api/lessons/` - Tạo bài học mới
- `GET /api/lessons/` - Danh sách bài học
- `GET /api/lessons/{id}` - Chi tiết bài học
- `PUT /api/lessons/{id}` - Cập nhật bài học
- `DELETE /api/lessons/{id}` - Xóa bài học
- `GET /api/lessons/my/lessons` - Bài học của tôi

### Templates
- `POST /api/templates/` - Tạo template (admin only)
- `GET /api/templates/` - Danh sách templates
- `GET /api/templates/{id}` - Chi tiết template
- `PUT /api/templates/{id}` - Cập nhật template (admin only)
- `DELETE /api/templates/{id}` - Xóa template (admin only)

## 🗄️ Database Models

### User
- email, password, full_name
- is_admin, is_active
- Relationships: lessons

### Lesson
- title, description, thumbnail
- content (JSON - canvas elements)
- level, topic, duration
- status (draft/published/archived)
- author_id, template_id

### Template
- name, description, thumbnail
- structure (JSON)
- is_active, created_by

### MediaAsset
- filename, file_type, mime_type
- url, file_size
- width, height, duration
- uploaded_by

## 🔒 Security

- Password hashing với bcrypt
- JWT authentication
- Role-based access control (Admin/Teacher)
- CORS protection

## 📝 Ghi chú

- Database hiện tại dùng SQLite cho development
- Để chuyển sang PostgreSQL production, chỉ cần thay đổi `DATABASE_URL` trong `.env`:
  ```env
  DATABASE_URL=postgresql://user:password@localhost/anawim
  ```

## 🐛 Testing

Có thể test API bằng:
- Swagger UI tại `/docs`
- Postman/Insomnia
- curl commands

Ví dụ:
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@anawim.com", "password": "admin123"}'
```

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Python version (3.8+)
2. Đã cài đặt tất cả dependencies
3. File .env đã được tạo và cấu hình đúng
4. Database đã được khởi tạo (chạy init_db.py)
