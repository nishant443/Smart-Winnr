# Admin Dashboard with Analytics & Reporting
## Complete MEAN Stack Application

![MEAN Stack](https://img.shields.io/badge/MEAN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![Angular](https://img.shields.io/badge/Angular-17-red)
![Node](https://img.shields.io/badge/Node-14+-green)

A full-stack admin dashboard application with real-time analytics, user management, and content management system built with the MEAN stack.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [API Documentation](#-api-documentation)
- [Frontend Components](#-frontend-components)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🚀 Features

### Core Features
- ✅ **User Authentication** - JWT-based login and signup
- ✅ **Role-Based Access Control** - User and Admin roles
- ✅ **Admin Dashboard** - Real-time analytics with Chart.js
- ✅ **User Management** - Complete CRUD operations (Admin only)
- ✅ **Content Management** - Create, edit, and manage content
- ✅ **Analytics & Reporting** - Visual data representation
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **RESTful API** - Clean and organized backend

### Security Features
- 🔐 Password hashing with bcrypt
- 🔐 JWT token-based authentication
- 🔐 Protected routes with guards
- 🔐 HTTP-only token storage
- 🔐 CORS configuration
- 🔐 Input validation and sanitization

### Admin Features
- 📊 Dashboard overview with key metrics
- 📈 User signup trends (7 days, 30 days)
- 📈 User activity trends
- 📈 Sales data visualization
- 👥 User management (view, edit, delete)
- 📝 Content management (CRUD operations)
- 📊 Real-time statistics

### User Features
- 👤 Personal dashboard
- 📝 View and read content
- 🔍 Filter and search functionality
- 📱 Responsive mobile interface

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v14+
- **Framework**: Express.js v4.18
- **Database**: MongoDB v4.4+
- **ODM**: Mongoose v8.0
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv
- **CORS**: cors middleware
- **Logging**: morgan

### Frontend
- **Framework**: Angular v17
- **Language**: TypeScript v5.2
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Reactive Forms
- **State Management**: RxJS
- **Charts**: Chart.js & ng2-charts
- **Styling**: CSS3 (Custom)

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **API Testing**: Postman
- **Code Editor**: VS Code (recommended)

---

## 📁 Project Structure

```
admin-dashboard/
│
├── backend/                          # Backend (Node.js/Express)
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js        # Authentication logic
│   │   ├── user.controller.js        # User management
│   │   ├── analytics.controller.js   # Analytics endpoints
│   │   └── content.controller.js     # Content management
│   ├── middleware/
│   │   └── auth.js                   # JWT verification & role check
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   ├── Analytics.js              # Analytics schema
│   │   └── Content.js                # Content schema
│   ├── routes/
│   │   ├── auth.routes.js            # Auth routes
│   │   ├── user.routes.js            # User routes
│   │   ├── analytics.routes.js       # Analytics routes
│   │   └── content.routes.js         # Content routes
│   ├── utils/
│   │   └── generateToken.js          # JWT token generator
│   ├── .env.example                  # Environment template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                     # Entry point
│
└── frontend/                         # Frontend (Angular)
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── login/            # Login page
    │   │   │   ├── signup/           # Signup page
    │   │   │   ├── dashboard/        # Main dashboard
    │   │   │   ├── users/            # User management
    │   │   │   ├── analytics/        # Analytics page
    │   │   │   ├── content/          # Content management
    │   │   │   ├── navbar/           # Navigation bar
    │   │   │   └── sidebar/          # Sidebar menu
    │   │   ├── services/
    │   │   │   ├── auth.service.ts       # Auth service
    │   │   │   ├── user.service.ts       # User service
    │   │   │   ├── analytics.service.ts  # Analytics service
    │   │   │   └── content.service.ts    # Content service
    │   │   ├── guards/
    │   │   │   ├── auth.guard.ts     # Route protection
    │   │   │   └── admin.guard.ts    # Admin-only protection
    │   │   ├── interceptors/
    │   │   │   └── jwt.interceptor.ts # Auto-add JWT to requests
    │   │   ├── models/               # TypeScript interfaces
    │   │   ├── app-routing.module.ts # Route configuration
    │   │   └── app.module.ts         # Main module
    │   ├── environments/
    │   │   ├── environment.ts        # Dev environment
    │   │   └── environment.prod.ts   # Prod environment
    │   ├── styles.css                # Global styles
    │   └── index.html                # Entry HTML
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Angular CLI** (v17) - Install with: `npm install -g @angular/cli`
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version    # Should show v14.x.x or higher
npm --version     # Should show v6.x.x or higher
mongod --version  # Should show v4.4.x or higher
ng version        # Should show Angular CLI 17.x.x
```

---

## 🚀 Quick Start

### 1. Clone or Extract the Project

```bash
# If using Git
git clone <repository-url>
cd admin-dashboard

# If using ZIP files
unzip admin-dashboard-backend.zip
unzip admin-dashboard-frontend.zip
```

### 2. Start MongoDB

```bash
# On macOS/Linux
sudo systemctl start mongod

# On Windows
net start MongoDB

# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### 3. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Backend running at: **http://localhost:5000**

### 4. Setup Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend running at: **http://localhost:4200**

### 5. Create Admin Account

1. Open browser: http://localhost:4200
2. Click "Sign up here"
3. Fill in details:
   - Name: Admin User
   - Email: admin@example.com
   - Password: admin123
   - Role: **Administrator**
4. Click Sign Up

---

## 🔧 Backend Setup

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

Create `.env` file from `.env.example`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/admin-dashboard

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:4200
```

**Important Security Notes:**
- Change `JWT_SECRET` to a strong random string in production
- Use MongoDB Atlas for production database
- Enable HTTPS in production
- Use environment-specific secrets

### Running the Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# The server will start on http://localhost:5000
```

### Backend File Structure Details

**config/db.js**
- MongoDB connection configuration
- Connection pooling and error handling

**controllers/**
- Business logic for each module
- Request validation and response formatting

**middleware/auth.js**
- JWT token verification
- Role-based authorization
- User authentication

**models/**
- Mongoose schemas
- Data validation
- Virtual properties and methods

**routes/**
- API endpoint definitions
- Middleware assignment
- Route organization

---

## 💻 Frontend Setup

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

### Running the Frontend

```bash
# Development server
ng serve

# Development server on custom port
ng serve --port 4201

# Production build
ng build --configuration production

# The app will run on http://localhost:4200
```

### Frontend Architecture

**Components**
- Smart Components: Handle business logic
- Presentation Components: Display data only
- Lazy Loading: Routes loaded on demand

**Services**
- HTTP communication with backend
- State management using RxJS
- Error handling and logging

**Guards**
- AuthGuard: Protects authenticated routes
- AdminGuard: Protects admin-only routes

**Interceptors**
- Automatically adds JWT token to requests
- Handles 401 responses
- Global error handling

---

## 👨‍💻 Author

**Project:** Admin Dashboard with Analytics & Reporting  
**Assignment:** SmartWinnr  
**Tech Stack:** MEAN (MongoDB, Express.js, Angular, Node.js)  
**Date:** February 2026

---

## 🎉 Acknowledgments

- SmartWinnr for the assignment opportunity
- MongoDB for excellent database documentation
- Angular team for comprehensive framework
- Chart.js for beautiful visualizations

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review API documentation
3. Check troubleshooting section
4. Review individual component documentation

---

**Happy Coding! 🚀**

Built with ❤️ using the MEAN Stack
