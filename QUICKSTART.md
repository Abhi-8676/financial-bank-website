# Financial Bank Website

## 🎯 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Abhi-8676/financial-bank-website.git
cd financial-bank-website
```

### 2. Install Dependencies (Both Frontend & Backend)
```bash
npm install
```

### 3. Setup Environment Variables

**Server (.env)**
```bash
cd server
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/financial-bank
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
EOF
cd ..
```

**Frontend (.env)**
```bash
cd frontend
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=FinanceBank
EOF
cd ..
```

### 4. Start MongoDB
```bash
# Local MongoDB
mongod

# OR using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### 5. Run Development Servers
```bash
# From root directory
npm run dev
```

This will start:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 📚 Documentation

See [README.md](./README.md) for detailed documentation.

## 🏗️ Project Architecture

```
FinanceBank
├── Frontend (React + Vite + Tailwind CSS)
│   ├── Pages (Login, Register, Dashboard, etc.)
│   ├── Components (Navbar, Sidebar, Cards)
│   ├── Services (API Integration)
│   └── Config (Axios Setup)
│
└── Backend (Node.js + Express + MongoDB)
    ├── Models (User)
    ├── Controllers (Auth)
    ├── Routes (API Endpoints)
    ├── Middleware (JWT Auth)
    └── Config (Database)
```

## 🧪 Testing

### Test User Credentials
```
Email: test@example.com
Password: password123
Phone: 9876543210
```

### API Testing
Use Postman or similar tool:

1. **Register**
   - Method: POST
   - URL: http://localhost:5000/api/auth/register
   - Body: {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@example.com",
       "phone": "9876543210",
       "password": "password123",
       "dateOfBirth": "1990-01-01"
     }

2. **Login**
   - Method: POST
   - URL: http://localhost:5000/api/auth/login
   - Body: {
       "email": "john@example.com",
       "password": "password123"
     }

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify connection string format

### Port Already in Use
```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

### CORS Error
- Check backend CORS configuration
- Verify frontend API URL in .env

## 📦 Dependencies

### Backend
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

### Frontend
- react
- react-router-dom
- axios
- tailwindcss
- lucide-react

## 🚀 Production Build

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Support

For issues and questions, create an issue on GitHub.
