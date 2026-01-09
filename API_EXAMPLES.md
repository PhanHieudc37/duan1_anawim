# 🧪 API TESTING EXAMPLES

Tài liệu này cung cấp các ví dụ để test API bằng curl, Postman, hoặc trực tiếp trong browser.

## 🔧 Setup

**Base URL:** `http://localhost:8000/api`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_token_here>
```

---

## 1️⃣ Authentication

### 1.1 Register User (Đăng ký)

**Request:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newteacher@anawim.com",
    "password": "password123",
    "full_name": "Nguyễn Văn B",
    "is_admin": false
  }'
```

**Response (201 Created):**
```json
{
  "id": 3,
  "email": "newteacher@anawim.com",
  "full_name": "Nguyễn Văn B",
  "is_admin": false,
  "is_active": true,
  "created_at": "2026-01-08T10:30:00"
}
```

### 1.2 Login (Đăng nhập)

**Request:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@anawim.com",
    "password": "admin123"
  }'
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhbmF3aW0uY29tIiwidXNlcl9pZCI6MSwiaXNfYWRtaW4iOnRydWUsImV4cCI6MTcwNDcxMDQwMH0.xxxxx",
  "token_type": "bearer"
}
```

**💡 Lưu token này để dùng cho các request sau!**

### 1.3 Get Current User (Lấy thông tin user hiện tại)

**Request:**
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "admin@anawim.com",
  "full_name": "Admin Anawim",
  "is_admin": true,
  "is_active": true,
  "created_at": "2026-01-08T10:00:00"
}
```

### 1.4 List All Users (Admin only)

**Request:**
```bash
curl -X GET "http://localhost:8000/api/auth/users?skip=0&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "email": "admin@anawim.com",
    "full_name": "Admin Anawim",
    "is_admin": true,
    "is_active": true,
    "created_at": "2026-01-08T10:00:00"
  },
  {
    "id": 2,
    "email": "teacher@anawim.com",
    "full_name": "Teacher Demo",
    "is_admin": false,
    "is_active": true,
    "created_at": "2026-01-08T10:00:00"
  }
]
```

---

## 2️⃣ Lessons

### 2.1 Create Lesson (Tạo bài học)

**Request:**
```bash
curl -X POST http://localhost:8000/api/lessons/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Present Simple Tense",
    "description": "Learn how to use present simple tense correctly",
    "level": "beginner",
    "topic": "grammar",
    "duration": 45,
    "content": {
      "elements": [
        {
          "id": "1",
          "type": "text",
          "content": "Present Simple Tense",
          "x": 100,
          "y": 50,
          "fontSize": 32
        },
        {
          "id": "2",
          "type": "text",
          "content": "We use present simple for habits and facts",
          "x": 100,
          "y": 150,
          "fontSize": 18
        }
      ]
    }
  }'
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Present Simple Tense",
  "description": "Learn how to use present simple tense correctly",
  "thumbnail": null,
  "level": "beginner",
  "topic": "grammar",
  "duration": 45,
  "status": "draft",
  "is_public": false,
  "author_id": 1,
  "template_id": null,
  "content": {
    "elements": [...]
  },
  "created_at": "2026-01-08T11:00:00",
  "updated_at": "2026-01-08T11:00:00",
  "published_at": null
}
```

### 2.2 Get All Lessons (Lấy danh sách bài học)

**Request:**
```bash
curl -X GET "http://localhost:8000/api/lessons/?skip=0&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**With filters:**
```bash
curl -X GET "http://localhost:8000/api/lessons/?level=beginner&topic=grammar&status_filter=published" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Present Simple Tense",
    "thumbnail": null,
    "level": "beginner",
    "topic": "grammar",
    "status": "draft",
    "author_id": 1,
    "updated_at": "2026-01-08T11:00:00"
  }
]
```

### 2.3 Get Lesson Detail (Chi tiết bài học)

**Request:**
```bash
curl -X GET http://localhost:8000/api/lessons/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Present Simple Tense",
  "description": "Learn how to use present simple tense correctly",
  "thumbnail": null,
  "content": {
    "elements": [...]
  },
  "level": "beginner",
  "topic": "grammar",
  "duration": 45,
  "status": "draft",
  "is_public": false,
  "author_id": 1,
  "template_id": null,
  "created_at": "2026-01-08T11:00:00",
  "updated_at": "2026-01-08T11:00:00",
  "published_at": null
}
```

### 2.4 Update Lesson (Cập nhật bài học)

**Request:**
```bash
curl -X PUT http://localhost:8000/api/lessons/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Present Simple Tense - Updated",
    "status": "published",
    "is_public": true
  }'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Present Simple Tense - Updated",
  "status": "published",
  "is_public": true,
  "published_at": "2026-01-08T12:00:00",
  ...
}
```

### 2.5 Delete Lesson (Xóa bài học)

**Request:**
```bash
curl -X DELETE http://localhost:8000/api/lessons/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (204 No Content)**

### 2.6 Get My Lessons (Bài học của tôi)

**Request:**
```bash
curl -X GET "http://localhost:8000/api/lessons/my/lessons?skip=0&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 3️⃣ Templates

### 3.1 Get All Templates (Danh sách templates)

**Request:**
```bash
curl -X GET "http://localhost:8000/api/templates/?skip=0&limit=50&active_only=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Grammar Lesson Template",
    "description": "Template chuẩn cho bài học ngữ pháp",
    "thumbnail": "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?w=400",
    "structure": {
      "sections": ["Introduction", "Grammar Rules", "Examples", "Exercises"],
      "layout": "standard"
    },
    "is_active": true,
    "created_by": 1,
    "created_at": "2026-01-08T10:00:00",
    "updated_at": "2026-01-08T10:00:00"
  }
]
```

### 3.2 Get Template Detail

**Request:**
```bash
curl -X GET http://localhost:8000/api/templates/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3.3 Create Template (Admin only)

**Request:**
```bash
curl -X POST http://localhost:8000/api/templates/ \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Listening Practice Template",
    "description": "Template for listening exercises",
    "structure": {
      "sections": ["Pre-listening", "Audio Player", "Questions", "Transcript"],
      "layout": "audio-focused"
    }
  }'
```

**Response (201 Created):**
```json
{
  "id": 4,
  "name": "Listening Practice Template",
  "description": "Template for listening exercises",
  "thumbnail": null,
  "structure": {
    "sections": ["Pre-listening", "Audio Player", "Questions", "Transcript"],
    "layout": "audio-focused"
  },
  "is_active": true,
  "created_by": 1,
  "created_at": "2026-01-08T13:00:00",
  "updated_at": "2026-01-08T13:00:00"
}
```

### 3.4 Update Template (Admin only)

**Request:**
```bash
curl -X PUT http://localhost:8000/api/templates/4 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Listening Practice Template - Advanced",
    "is_active": true
  }'
```

### 3.5 Delete Template (Admin only)

**Request:**
```bash
curl -X DELETE http://localhost:8000/api/templates/4 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## 🔍 Error Responses

### 400 Bad Request
```json
{
  "detail": "Email đã được đăng ký"
}
```

### 401 Unauthorized
```json
{
  "detail": "Email hoặc mật khẩu không chính xác"
}
```

### 403 Forbidden
```json
{
  "detail": "Không có quyền truy cập"
}
```

### 404 Not Found
```json
{
  "detail": "Không tìm thấy bài học"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## 📝 Testing Workflow

### Full Flow Example

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@anawim.com","password":"admin123"}' \
  | jq -r '.access_token')

echo "Token: $TOKEN"

# 2. Get current user
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# 3. Create a lesson
curl -X POST http://localhost:8000/api/lessons/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Lesson",
    "description": "This is a test",
    "level": "beginner",
    "topic": "vocabulary"
  }'

# 4. Get all lessons
curl -X GET http://localhost:8000/api/lessons/ \
  -H "Authorization: Bearer $TOKEN"

# 5. Get templates
curl -X GET http://localhost:8000/api/templates/ \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🎯 Postman Collection

Import URL:
```
http://localhost:8000/docs
```

Hoặc tạo manual collection với:

**Variables:**
- `base_url`: `http://localhost:8000/api`
- `token`: `<your_token>`

**Requests:**
1. Auth → Login → Save token
2. Auth → Get Me
3. Lessons → Create
4. Lessons → List
5. Lessons → Get by ID
6. Lessons → Update
7. Lessons → Delete
8. Templates → List
9. Templates → Get by ID

---

## 🌐 Test in Browser Console

```javascript
// Login
const response = await fetch('http://localhost:8000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@anawim.com',
    password: 'admin123'
  })
});
const { access_token } = await response.json();
console.log('Token:', access_token);

// Get lessons
const lessons = await fetch('http://localhost:8000/api/lessons/', {
  headers: { 'Authorization': `Bearer ${access_token}` }
});
console.log(await lessons.json());
```

---

**Happy Testing! 🧪**
