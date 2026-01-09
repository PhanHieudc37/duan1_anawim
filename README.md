# 🎓 ANAWIM - HỆ THỐNG SOẠN GIÁO TRÌNH TIẾNG ANH

Hệ thống giống Canva dành riêng cho giáo viên tiếng Anh tại trung tâm, giúp soạn giáo trình nhanh hơn, dễ dàng hơn và chuyên nghiệp hơn.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt và chạy](#cài-đặt-và-chạy)
- [Tính năng](#tính-năng)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

---

## 🎯 Tổng quan

### Vấn đề hiện tại
- Giáo viên soạn giáo trình bằng Word/PowerPoint riêng lẻ
- Không có chuẩn chung, khó tái sử dụng
- Giáo trình lưu trữ rời rạc, khó quản lý
- Trung tâm phụ thuộc vào từng giáo viên

### Giải pháp
Xây dựng nền tảng soạn giáo trình online với:
- Giao diện kéo-thả trực quan (như Canva)
- Lưu trữ tập trung trên cloud
- Hệ thống template chuẩn hóa
- Phân quyền và quản lý chặt chẽ

---

## 🛠 Công nghệ sử dụng

### Frontend
- **React 18** + TypeScript
- **Vite** - Build tool siêu nhanh
- **TailwindCSS** - Styling
- **Shadcn/ui** - Component library
- **Radix UI** - Accessible components
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework hiện đại
- **SQLAlchemy** - ORM
- **SQLite** - Database (development)
- **PostgreSQL** - Database (production - sẽ nâng cấp)
- **JWT** - Authentication
- **Pydantic** - Data validation

### DevOps
- Git - Version control
- Docker - Containerization (tương lai)

---

## 📁 Cấu trúc dự án

```
duan1_giaotrinh/
├── fe/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx         # Main app component
│   │   │   └── components/
│   │   │       ├── AuthPage.tsx       # Đăng nhập/Đăng ký
│   │   │       ├── Dashboard.tsx      # Trang chủ sau login
│   │   │       └── EditorCanvas.tsx   # Canvas soạn giáo trình
│   │   ├── services/           # API integration
│   │   │   ├── api.ts          # Base API client
│   │   │   ├── authService.ts  # Auth API
│   │   │   ├── lessonService.ts    # Lesson API
│   │   │   └── templateService.ts  # Template API
│   │   └── styles/             # CSS files
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
│
├── be/                          # Backend (FastAPI + SQLite)
│   ├── app/
│   │   ├── api/                # API Routes
│   │   │   ├── auth.py         # Authentication endpoints
│   │   │   ├── lessons.py      # Lesson CRUD
│   │   │   ├── templates.py    # Template CRUD
│   │   │   └── deps.py         # Dependencies (auth, permissions)
│   │   ├── core/               # Core functionality
│   │   │   ├── config.py       # App settings
│   │   │   └── security.py     # JWT, password hashing
│   │   ├── db/                 # Database
│   │   │   └── base.py         # DB connection & session
│   │   ├── models/             # Database models
│   │   │   └── models.py       # User, Lesson, Template, MediaAsset
│   │   ├── schemas/            # Pydantic schemas
│   │   │   ├── user.py
│   │   │   ├── lesson.py
│   │   │   ├── template.py
│   │   │   └── media.py
│   │   └── main.py             # FastAPI app
│   ├── init_db.py              # Database initialization
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── hd.md                        # Tài liệu yêu cầu gốc
└── README.md                    # File này
```

---

## 🚀 Cài đặt và chạy

### Prerequisites
- **Node.js** 18+ và npm/yarn
- **Python** 3.8+
- **Git**

### 1. Clone repository
```bash
git clone <repository-url>
cd duan1_giaotrinh
```

### 2. Cài đặt Backend

```bash
cd be

# Tạo môi trường ảo
python -m venv venv

# Kích hoạt môi trường ảo
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt

# Tạo file .env
copy .env.example .env

# Khởi tạo database
python init_db.py
```

**Tài khoản mặc định sau khi init:**
- Admin: `admin@anawim.com` / `admin123`
- Teacher: `teacher@anawim.com` / `teacher123`

### 3. Chạy Backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend sẽ chạy tại: http://localhost:8000
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 4. Cài đặt Frontend

Mở terminal mới:

```bash
cd fe

# Cài đặt dependencies
npm install

# Tạo file .env
copy .env.example .env

# File .env nội dung:
# VITE_API_URL=http://localhost:8000/api
```

### 5. Chạy Frontend

```bash
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

---

## ✨ Tính năng

### MVP (Minimum Viable Product)

#### 1. Authentication & Authorization
- ✅ Đăng ký tài khoản (Teacher/Admin)
- ✅ Đăng nhập với JWT
- ✅ Phân quyền: Admin / Teacher
- ✅ Quản lý session

#### 2. Dashboard
- ✅ Hiển thị danh sách giáo trình
- ✅ Tìm kiếm và lọc bài học
- ✅ Xem thông tin user
- ✅ Badge phân quyền (Admin/User)

#### 3. Editor Canvas (Soạn giáo trình)
- ✅ Kéo-thả elements:
  - Text (với format: bold, italic, underline)
  - Images
  - Shapes (rectangle, circle)
- ✅ Chỉnh sửa properties:
  - Position (x, y)
  - Size (width, height)
  - Colors
  - Text alignment
- ✅ Select, move, delete elements
- ✅ Save/Load content

#### 4. Lesson Management
- ✅ Tạo bài học mới
- ✅ Chỉnh sửa bài học
- ✅ Xóa bài học
- ✅ Lưu content (canvas elements)
- ✅ Status: draft/published/archived
- ✅ Metadata: level, topic, duration

#### 5. Template System
- ✅ Tạo template (Admin only)
- ✅ Danh sách templates
- ✅ Áp dụng template khi tạo lesson
- ✅ Template structure (JSON)

#### 6. Role-based Access Control
- ✅ Admin: Full access
- ✅ Teacher: Chỉ xem/sửa bài của mình
- ✅ Public lessons: Tất cả giáo viên xem được

### Tính năng tương lai
- 📝 Quiz builder (trắc nghiệm)
- 🎵 Audio/Video upload
- 📊 Analytics và reporting
- 🤖 AI content suggestion
- 📄 Export to PDF/PowerPoint
- 👥 Collaboration (nhiều người cùng soạn)
- 📱 Mobile app

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### POST `/auth/register`
Đăng ký user mới
```json
{
  "email": "teacher@example.com",
  "password": "password123",
  "full_name": "Nguyễn Văn A",
  "is_admin": false
}
```

#### POST `/auth/login`
Đăng nhập
```json
{
  "email": "teacher@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### GET `/auth/me`
Lấy thông tin user hiện tại (requires authentication)

Headers:
```
Authorization: Bearer <access_token>
```

### Lesson Endpoints

#### POST `/lessons/`
Tạo lesson mới
```json
{
  "title": "Present Tense Grammar",
  "description": "Basic present tense rules",
  "level": "beginner",
  "topic": "grammar",
  "content": {
    "elements": [...]
  }
}
```

#### GET `/lessons/`
Lấy danh sách lessons

Query params:
- `skip`: offset (default: 0)
- `limit`: số lượng (default: 20)
- `status_filter`: draft/published/archived
- `level`: beginner/intermediate/advanced
- `topic`: grammar/vocabulary/reading...

#### GET `/lessons/{id}`
Lấy chi tiết lesson

#### PUT `/lessons/{id}`
Cập nhật lesson

#### DELETE `/lessons/{id}`
Xóa lesson

#### GET `/lessons/my/lessons`
Lấy lessons của tôi

### Template Endpoints

#### GET `/templates/`
Lấy danh sách templates

#### GET `/templates/{id}`
Chi tiết template

#### POST `/templates/` (Admin only)
Tạo template mới

#### PUT `/templates/{id}` (Admin only)
Cập nhật template

#### DELETE `/templates/{id}` (Admin only)
Xóa template

---

## 📊 Database Schema

### User
```
- id: Integer (PK)
- email: String (unique)
- hashed_password: String
- full_name: String (nullable)
- is_admin: Boolean
- is_active: Boolean
- created_at: DateTime
- updated_at: DateTime
```

### Lesson
```
- id: Integer (PK)
- title: String
- description: Text
- thumbnail: String (URL)
- content: JSON (canvas elements)
- level: String (beginner/intermediate/advanced)
- topic: String (grammar/vocabulary/...)
- duration: Integer (minutes)
- status: String (draft/published/archived)
- is_public: Boolean
- author_id: Integer (FK -> User)
- template_id: Integer (FK -> Template)
- created_at: DateTime
- updated_at: DateTime
- published_at: DateTime
```

### Template
```
- id: Integer (PK)
- name: String
- description: Text
- thumbnail: String (URL)
- structure: JSON
- is_active: Boolean
- created_by: Integer (FK -> User)
- created_at: DateTime
- updated_at: DateTime
```

### MediaAsset (Future)
```
- id: Integer (PK)
- filename: String
- original_filename: String
- file_type: String (image/video/audio)
- mime_type: String
- file_size: Integer
- url: String
- width, height: Integer
- duration: Integer (for audio/video)
- uploaded_by: Integer (FK -> User)
- created_at: DateTime
```

---

## 🚢 Deployment

### Backend Deployment

#### Option 1: Railway / Render
1. Connect GitHub repo
2. Add environment variables
3. Deploy backend service

#### Option 2: VPS (DigitalOcean, Linode, etc.)
```bash
# Install dependencies
pip install -r requirements.txt

# Run with gunicorn
pip install gunicorn
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

#### Nâng cấp PostgreSQL (Production)
```bash
# Install psycopg2
pip install psycopg2-binary

# Update .env
DATABASE_URL=postgresql://user:password@host:5432/anawim
```

### Frontend Deployment

#### Option 1: Vercel / Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-api.com/api`

#### Option 2: Build manually
```bash
npm run build
# Upload dist/ folder to web server
```

---

## 🔐 Security

- ✅ Password hashing với bcrypt
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ CORS protection
- ✅ SQL injection protection (SQLAlchemy)
- ✅ Input validation (Pydantic)

---

## 🧪 Testing

### Test Backend API với curl

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@anawim.com","password":"admin123"}'

# Lấy thông tin user (thay <TOKEN>)
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"

# Tạo lesson
curl -X POST http://localhost:8000/api/lessons/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Lesson","description":"Test"}'
```

### Test với Swagger UI
Truy cập: http://localhost:8000/docs

---

## 📝 Ghi chú Development

### Frontend
- Đang dùng mock data trong components
- Cần integrate với services đã tạo
- Canvas cần lưu vào database qua API

### Backend
- SQLite cho development
- Chuyển PostgreSQL khi production
- Cần implement upload file cho images
- Cần thêm pagination cho list endpoints

### Next Steps
1. Integrate frontend với backend API
2. Implement file upload
3. Thêm real-time collaboration (WebSocket)
4. Implement quiz builder
5. Add analytics dashboard

---

## 🤝 Contributing

Để contribute vào dự án:
1. Fork repository
2. Tạo branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

---

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Check [hd.md](hd.md) - tài liệu yêu cầu
2. Check [be/README.md](be/README.md) - backend docs
3. Tạo issue trên GitHub

---

## 📄 License

Private project - Anawim English Center

---

**Made with ❤️ for English Teachers at Anawim**
