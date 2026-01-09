# 🏗️ KIẾN TRÚC HỆ THỐNG ANAWIM

## 📊 Sơ đồ tổng quan

```
┌─────────────────────────────────────────────────────────────────┐
│                        ANAWIM PLATFORM                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐         ┌──────────────────────────┐
│       FRONTEND           │         │        BACKEND           │
│    (React + Vite)        │ ◄─────► │   (FastAPI + SQLite)     │
│                          │  HTTP   │                          │
│  ┌────────────────────┐  │  REST   │  ┌────────────────────┐  │
│  │   AuthPage         │  │  API    │  │   Auth Router      │  │
│  │   - Login          │  │         │  │   - JWT            │  │
│  │   - Register       │  │         │  │   - Password Hash  │  │
│  └────────────────────┘  │         │  └────────────────────┘  │
│                          │         │                          │
│  ┌────────────────────┐  │         │  ┌────────────────────┐  │
│  │   Dashboard        │  │         │  │   Lesson Router    │  │
│  │   - Lesson List    │  │         │  │   - CRUD           │  │
│  │   - Search/Filter  │  │         │  │   - Permissions    │  │
│  └────────────────────┘  │         │  └────────────────────┘  │
│                          │         │                          │
│  ┌────────────────────┐  │         │  ┌────────────────────┐  │
│  │   EditorCanvas     │  │         │  │  Template Router   │  │
│  │   - Drag & Drop    │  │         │  │   - CRUD           │  │
│  │   - Elements       │  │         │  │   - Admin Only     │  │
│  │   - Properties     │  │         │  └────────────────────┘  │
│  └────────────────────┘  │         │                          │
│                          │         │  ┌────────────────────┐  │
│  ┌────────────────────┐  │         │  │    Database        │  │
│  │   Services         │  │         │  │   SQLAlchemy       │  │
│  │   - API Client     │  │         │  │   - User Model     │  │
│  │   - Auth Service   │  │         │  │   - Lesson Model   │  │
│  │   - Lesson Service │  │         │  │   - Template Model │  │
│  │   - Template Svc   │  │         │  │   - MediaAsset     │  │
│  └────────────────────┘  │         │  └────────────────────┘  │
│                          │         │           │              │
│  Port: 5173              │         │  Port: 8000    ▼         │
└──────────────────────────┘         └──────────────────────────┘
                                               │
                                               ▼
                                     ┌──────────────────┐
                                     │  anawim.db       │
                                     │  (SQLite)        │
                                     │                  │
                                     │  Tables:         │
                                     │  - users         │
                                     │  - lessons       │
                                     │  - templates     │
                                     │  - media_assets  │
                                     └──────────────────┘
```

## 🔄 Data Flow

### 1. Authentication Flow
```
User Input (Login)
    │
    ▼
AuthPage Component
    │
    ▼
authService.login()
    │
    ▼
POST /api/auth/login
    │
    ▼
Backend: Verify credentials
    │
    ▼
Generate JWT Token
    │
    ▼
Return Token + User Info
    │
    ▼
Store Token in localStorage
    │
    ▼
Redirect to Dashboard
```

### 2. Lesson Creation Flow
```
User clicks "Create Lesson"
    │
    ▼
Open EditorCanvas
    │
    ▼
User edits (drag/drop elements)
    │
    ▼
Click "Save"
    │
    ▼
lessonService.createLesson()
    │
    ▼
POST /api/lessons/
    │
    ▼
Backend: Validate data
    │
    ▼
Save to Database
    │
    ▼
Return saved Lesson
    │
    ▼
Update UI / Redirect
```

### 3. Get Lessons Flow
```
Load Dashboard
    │
    ▼
lessonService.getLessons()
    │
    ▼
GET /api/lessons/?skip=0&limit=20
    │
    ▼
Backend: Check permissions
    │
    ├─► Admin: Get all lessons
    └─► Teacher: Get own + public lessons
    │
    ▼
Query Database
    │
    ▼
Return Lesson List
    │
    ▼
Display in Dashboard
```

## 🗄️ Database Schema Detail

```
┌─────────────────────────────────────────────────────────┐
│                         users                           │
├─────────────────────────────────────────────────────────┤
│ id                  INTEGER PRIMARY KEY                 │
│ email               VARCHAR(255) UNIQUE NOT NULL        │
│ hashed_password     VARCHAR(255) NOT NULL               │
│ full_name           VARCHAR(255)                        │
│ is_admin            BOOLEAN DEFAULT FALSE               │
│ is_active           BOOLEAN DEFAULT TRUE                │
│ created_at          DATETIME                            │
│ updated_at          DATETIME                            │
└─────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────┐
│                        lessons                          │
├─────────────────────────────────────────────────────────┤
│ id                  INTEGER PRIMARY KEY                 │
│ title               VARCHAR(255) NOT NULL               │
│ description         TEXT                                │
│ thumbnail           VARCHAR(500)                        │
│ content             JSON (canvas elements)              │
│ level               VARCHAR(50)                         │
│ topic               VARCHAR(255)                        │
│ duration            INTEGER (minutes)                   │
│ status              VARCHAR(50) DEFAULT 'draft'         │
│ is_public           BOOLEAN DEFAULT FALSE               │
│ author_id           INTEGER FK -> users.id              │
│ template_id         INTEGER FK -> templates.id          │
│ created_at          DATETIME                            │
│ updated_at          DATETIME                            │
│ published_at        DATETIME                            │
└─────────────────────────────────────────────────────────┘
                              ▲
                              │ N:1
                              │
┌─────────────────────────────────────────────────────────┐
│                      templates                          │
├─────────────────────────────────────────────────────────┤
│ id                  INTEGER PRIMARY KEY                 │
│ name                VARCHAR(255) NOT NULL               │
│ description         TEXT                                │
│ thumbnail           VARCHAR(500)                        │
│ structure           JSON                                │
│ is_active           BOOLEAN DEFAULT TRUE                │
│ created_by          INTEGER FK -> users.id              │
│ created_at          DATETIME                            │
│ updated_at          DATETIME                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                     media_assets                        │
├─────────────────────────────────────────────────────────┤
│ id                  INTEGER PRIMARY KEY                 │
│ filename            VARCHAR(255) NOT NULL               │
│ original_filename   VARCHAR(255) NOT NULL               │
│ file_type           VARCHAR(50) (image/video/audio)     │
│ mime_type           VARCHAR(100)                        │
│ file_size           INTEGER (bytes)                     │
│ url                 VARCHAR(500) NOT NULL               │
│ width               INTEGER                             │
│ height              INTEGER                             │
│ duration            INTEGER (for audio/video)           │
│ uploaded_by         INTEGER FK -> users.id              │
│ created_at          DATETIME                            │
│ is_deleted          BOOLEAN DEFAULT FALSE               │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
└─────────────────────────────────────────────────────────┘

1. Frontend
   ├─► Token Storage (localStorage)
   ├─► Auto-attach Bearer Token
   └─► Redirect if not authenticated

2. Backend
   ├─► CORS Middleware
   │   └─► Allow only specific origins
   │
   ├─► JWT Authentication
   │   ├─► Token validation
   │   ├─► Expiration check
   │   └─► User verification
   │
   ├─► Password Security
   │   ├─► bcrypt hashing
   │   └─► Never store plain text
   │
   └─► Authorization
       ├─► Role-based (Admin/Teacher)
       └─► Resource ownership check

3. Database
   └─► SQL Injection Prevention (SQLAlchemy ORM)
```

## 📦 Component Hierarchy

```
App
│
├─► AuthPage
│   ├─► LoginForm
│   └─► RegisterForm
│
├─► Dashboard
│   ├─► Header
│   │   ├─► Logo
│   │   ├─► UserInfo
│   │   └─► LogoutButton
│   │
│   ├─► SearchBar
│   │
│   ├─► LessonGrid
│   │   └─► LessonCard (multiple)
│   │       ├─► Thumbnail
│   │       ├─► Title
│   │       ├─► Metadata
│   │       └─► Actions
│   │
│   └─► CreateButton
│
└─► EditorCanvas
    ├─► Toolbar
    │   ├─► TextTool
    │   ├─► ImageTool
    │   └─► ShapeTool
    │
    ├─► Canvas
    │   └─► Elements (multiple)
    │       ├─► TextElement
    │       ├─► ImageElement
    │       └─► ShapeElement
    │
    ├─► PropertiesPanel
    │   ├─► PositionControls
    │   ├─► SizeControls
    │   ├─► StyleControls
    │   └─► ColorPicker
    │
    └─► ActionButtons
        ├─► SaveButton
        ├─► ExportButton
        └─► BackButton
```

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     PRODUCTION                           │
└──────────────────────────────────────────────────────────┘

┌─────────────────┐         ┌─────────────────┐
│    Vercel       │         │    Railway      │
│   (Frontend)    │ ◄─────► │   (Backend)     │
│                 │  HTTPS  │                 │
│   React Build   │         │   FastAPI       │
│   Static Files  │         │   Gunicorn      │
└─────────────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │   PostgreSQL    │
                            │   (Managed DB)  │
                            └─────────────────┘

CDN
 │
 ├─► Images
 ├─► Videos
 └─► Audio files
```

## 🔄 Future Architecture Enhancements

```
1. Microservices
   ├─► Auth Service
   ├─► Lesson Service
   ├─► Media Service
   └─► Analytics Service

2. Caching Layer
   ├─► Redis (Session, API Cache)
   └─► CDN (Static Assets)

3. Message Queue
   ├─► RabbitMQ / Kafka
   └─► Background Jobs (Export PDF, Email)

4. WebSocket
   ├─► Real-time collaboration
   └─► Live updates

5. Storage
   ├─► S3 / Azure Blob Storage
   └─► Media assets

6. Monitoring
   ├─► Sentry (Error tracking)
   ├─► DataDog (Performance)
   └─► Google Analytics
```

## 📊 Performance Considerations

```
Frontend
├─► Code splitting
├─► Lazy loading components
├─► Image optimization
└─► Service Worker (PWA)

Backend
├─► Database indexing
├─► Query optimization
├─► Response caching
└─► Connection pooling

Database
├─► Indexes on foreign keys
├─► Indexes on search fields
└─► Regular vacuum/analyze
```

---

**Architecture designed for scalability and maintainability** 🏗️
