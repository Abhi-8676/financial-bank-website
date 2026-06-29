# FinanceBank - Online Banking Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for online banking with features like account management, transactions, card management, loans, and user profiles.

## 🚀 Features

### Backend
- ✅ User Authentication (Register, Login, Logout)
- ✅ JWT Token-based Authorization
- ✅ Password Hashing with bcryptjs
- ✅ User Profile Management
- ✅ Change Password Functionality
- ✅ MongoDB Database Integration
- ✅ RESTful API with Express.js
- ✅ Error Handling & Validation

### Frontend
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Vite.js Build Tool
- ✅ Tailwind CSS Styling
- ✅ React Router for Navigation
- ✅ Axios for API Calls
- ✅ Authentication Pages (Login, Register)
- ✅ Dashboard with Statistics
- ✅ Accounts Management
- ✅ Transactions History
- ✅ Card Management
- ✅ Loans Management
- ✅ User Profile Management
- ✅ Protected Routes
- ✅ Lucide Icons

## 📁 Project Structure

```
financial-bank-website/
├── server/
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Accounts.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Cards.jsx
│   │   │   ├── Loans.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/financial-bank
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=FinanceBank
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔐 Authentication Flow

1. **Register**: Create new account with email, phone, password
2. **Login**: Authenticate with email and password
3. **JWT Token**: Received on successful login
4. **Token Storage**: Stored in localStorage
5. **Protected Routes**: Routes require valid token
6. **Auto Logout**: Invalid/expired token redirects to login

## 📱 Responsive Breakpoints

- **XS** (320px): Mobile phones
- **SM** (640px): Landscape phones
- **MD** (768px): Tablets
- **LG** (1024px): Laptops
- **XL** (1280px): Large screens
- **2XL** (1536px): Extra large screens

## 🎨 Design System

### Colors
- **Primary**: #1e40af (Blue)
- **Secondary**: #0ea5e9 (Sky Blue)
- **Accent**: #f59e0b (Amber)
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)

### Typography
- **Font**: System fonts for better performance
- **Responsive**: All text sizes adapt to screen size
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/update-profile` - Update profile (Protected)
- `PUT /api/auth/change-password` - Change password (Protected)
- `GET /api/auth/logout` - Logout user (Protected)

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create `Procfile`:
```
web: node server.js
```

2. Deploy to Heroku:
```bash
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=your_mongodb_uri
```

### Frontend Deployment (Vercel)
1. Deploy from GitHub:
```bash
npm install -g vercel
vercel --prod
```

## 📊 Database Schema

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required, hashed),
  dateOfBirth: Date (required),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  accountNumber: String (auto-generated, unique),
  role: String (customer/admin),
  isVerified: Boolean (default: false),
  lastLogin: Date,
  accountStatus: String (active/suspended/closed),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔒 Security Features

- ✅ Password Hashing (bcryptjs)
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ CORS Enabled
- ✅ Input Validation
- ✅ Error Handling
- ✅ Secure Token Storage
- ✅ Auto Token Verification

## 🎯 Future Enhancements

- [ ] Two-Factor Authentication (2FA)
- [ ] Email Verification
- [ ] Transaction Management
- [ ] Money Transfer
- [ ] Bill Payments
- [ ] Account Statements PDF
- [ ] Mobile App (React Native)
- [ ] Real-time Notifications (Socket.io)
- [ ] Investment Options
- [ ] Loan Management

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Abhishek Kumar**
- GitHub: [@Abhi-8676](https://github.com/Abhi-8676)
- Email: kumarr.abhishekk812@gmail.com

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please create an issue in the GitHub repository.

---

**Built with ❤️ using MERN Stack**
