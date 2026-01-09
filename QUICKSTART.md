# ⚡ HƯỚNG DẪN CHẠY NHANH

## 🎯 Chạy Backend (FastAPI + SQLite)

### Bước 1: Vào thư mục backend
```bash
cd be
```

### Bước 2: Tạo môi trường ảo Python
```bash
python -m venv venv
```

### Bước 3: Kích hoạt môi trường ảo
**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### Bước 4: Cài đặt packages
```bash
pip install -r requirements.txt
```

### Bước 5: Tạo file .env
```bash
copy .env.example .env
```

Hoặc tạo file `.env` với nội dung:
```env
DATABASE_URL=sqlite:///./anawim.db
SECRET_KEY=anawim-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
APP_NAME=Anawim English Teaching Platform
DEBUG=True
```

### Bước 6: Khởi tạo database
```bash
python init_db.py
```

Sẽ tạo:
- ✅ Database `anawim.db`
- ✅ Admin: `admin@anawim.com` / `admin123`
- ✅ Teacher: `teacher@anawim.com` / `teacher123`
- ✅ 3 templates mẫu

### Bước 7: Chạy server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ **Backend đã chạy tại:**
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 🎨 Chạy Frontend (React + Vite)

### Bước 1: Mở terminal mới, vào thư mục frontend
```bash
cd fe
```

### Bước 2: Cài đặt packages
```bash
npm install
```

### Bước 3: Tạo file .env
```bash
copy .env.example .env
```

Hoặc tạo file `.env` với nội dung:
```env
VITE_API_URL=http://localhost:8000/api
```

### Bước 4: Chạy dev server
```bash
npm run dev
```

✅ **Frontend đã chạy tại:** http://localhost:5173

---

## 🧪 Test thử

### 1. Mở browser
Truy cập: http://localhost:5173

### 2. Đăng nhập
- Email: `admin@anawim.com`
- Password: `admin123`

hoặc

- Email: `teacher@anawim.com`
- Password: `teacher123`

### 3. Khám phá
- Dashboard: Xem danh sách bài học
- Editor: Click vào bài học hoặc tạo mới để mở canvas

---

## 📚 Cấu trúc Project sau khi setup

```
duan1_giaotrinh/
├── be/
│   ├── venv/              # Python virtual environment
│   ├── app/               # Source code
│   ├── anawim.db          # SQLite database (tạo sau init_db.py)
│   ├── .env               # Environment variables (tạo từ .env.example)
│   └── ...
├── fe/
│   ├── node_modules/      # NPM packages
│   ├── src/               # Source code
│   ├── .env               # Environment variables (tạo từ .env.example)
│   └── ...
└── README.md
```

---

## ⚠️ Troubleshooting

### Backend không chạy?
1. Kiểm tra Python version: `python --version` (cần 3.8+)
2. Đã activate virtual environment chưa?
3. Đã cài đặt requirements.txt chưa?
4. Đã tạo file .env chưa?
5. Đã chạy init_db.py chưa?

### Frontend không chạy?
1. Kiểm tra Node version: `node --version` (cần 18+)
2. Đã cài npm packages chưa? `npm install`
3. Đã tạo file .env chưa?
4. Backend đã chạy chưa? (cần chạy BE trước)

### CORS Error?
- Kiểm tra `ALLOWED_ORIGINS` trong backend `.env`
- Đảm bảo frontend URL đã được thêm vào

### Database Error?
```bash
# Xóa database cũ và tạo lại
cd be
rm anawim.db
python init_db.py
```

---

## 🎉 Xong!

Bây giờ bạn có thể:
1. ✅ Đăng nhập vào hệ thống
2. ✅ Xem danh sách bài học
3. ✅ Tạo bài học mới
4. ✅ Sử dụng canvas để soạn giáo trình
5. ✅ Test các API endpoint tại `/docs`

**Chúc code vui vẻ! 🚀**
