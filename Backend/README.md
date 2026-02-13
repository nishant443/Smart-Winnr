# Admin Dashboard Backend - MEAN Stack

A robust backend API for an Admin Dashboard with Analytics & Reporting capabilities built with MongoDB, Express.js, and Node.js.

## 🚀 Features

- ✅ **JWT Authentication** - Secure user authentication with JSON Web Tokens
- ✅ **Role-Based Authorization** - Two roles: `user` and `admin`
- ✅ **User Management** - Complete CRUD operations for user management (Admin only)
- ✅ **Analytics & Reporting** - Real-time metrics and data visualization endpoints
- ✅ **Content Management** - Admin controls to manage content
- ✅ **RESTful API** - Clean and organized API structure
- ✅ **MongoDB Integration** - Efficient data storage and retrieval
- ✅ **Security** - Password hashing with bcrypt, protected routes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd admin-dashboard-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:4200
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

5. **Run the application**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
admin-dashboard-backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic (signup, login)
│   ├── user.controller.js    # User management logic
│   ├── analytics.controller.js # Analytics and metrics logic
│   └── content.controller.js  # Content management logic
├── middleware/
│   └── auth.js               # JWT authentication & authorization middleware
├── models/
│   ├── User.js               # User schema with role-based access
│   ├── Analytics.js          # Analytics metrics schema
│   └── Content.js            # Content management schema
├── routes/
│   ├── auth.routes.js        # Authentication routes
│   ├── user.routes.js        # User management routes
│   ├── analytics.routes.js   # Analytics routes
│   └── content.routes.js     # Content management routes
├── utils/
│   └── generateToken.js      # JWT token generation utility
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
└── server.js                # Application entry point
```

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |

### User Management Routes (`/api/users`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Admin | Get all users (paginated) |
| GET | `/api/users/stats` | Admin | Get user statistics |
| GET | `/api/users/:id` | Admin | Get user by ID |
| PUT | `/api/users/:id` | Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Analytics Routes (`/api/analytics`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/analytics/overview` | Admin | Get dashboard overview metrics |
| GET | `/api/analytics/signups-trend` | Admin | Get user signup trends |
| GET | `/api/analytics/activity-trend` | Admin | Get user activity trends |
| GET | `/api/analytics/sales` | Admin | Get sales data |
| POST | `/api/analytics` | Admin | Create analytics entry |

### Content Management Routes (`/api/content`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/content` | Private | Get all content (paginated) |
| GET | `/api/content/:id` | Private | Get content by ID |
| POST | `/api/content` | Admin | Create new content |
| PUT | `/api/content/:id` | Admin | Update content |
| DELETE | `/api/content/:id` | Admin | Delete content |
| GET | `/api/content/stats/overview` | Admin | Get content statistics |

## 📝 API Usage Examples

### 1. User Registration (Signup)

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // Optional: defaults to "user", can be "admin"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User (Protected Route)

```bash
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

### 4. Get Dashboard Analytics (Admin Only)

```bash
GET /api/analytics/overview
Authorization: Bearer <admin-jwt-token>
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "totalUsers": 150,
    "activeUsers": 120,
    "todaySignups": 5,
    "todayLogins": 45,
    "totalSales": 12500,
    "timestamp": "2026-02-13T10:30:00.000Z"
  }
}
```

### 5. Get All Users (Admin Only)

```bash
GET /api/users?page=1&limit=10
Authorization: Bearer <admin-jwt-token>
```

## 🔑 User Roles

The system supports two user roles:

1. **User** (`user`)
   - Default role for new registrations
   - Can view their own profile
   - Can view content

2. **Admin** (`admin`)
   - Full access to all endpoints
   - Can manage users
   - Can view analytics
   - Can manage content

## 🔒 Authentication Flow

1. User signs up or logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token (typically in localStorage or cookies)
5. Client includes token in Authorization header for protected routes
6. Server validates token and extracts user information
7. Server checks user role for admin-only routes

## 📊 Database Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: 'user' or 'admin')
- isActive (Boolean)
- lastLogin (Date)
- timestamps (createdAt, updatedAt)

### Analytics Model
- metricType (String: 'user_signup', 'user_login', 'sales', etc.)
- value (Number)
- metadata (Mixed)
- date (Date)
- timestamps (createdAt, updatedAt)

### Content Model
- title (String, required)
- description (String, required)
- contentType (String: 'article', 'announcement', 'product', 'service')
- status (String: 'draft', 'published', 'archived')
- author (ObjectId, ref: 'User')
- views (Number)
- isActive (Boolean)
- timestamps (createdAt, updatedAt)

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import the endpoints and test
- **cURL** - Command-line testing
- **Thunder Client** (VS Code extension)

### Example: Create Admin User via MongoDB

```javascript
// Connect to MongoDB shell
use admin-dashboard

// Create admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // Use bcrypt to hash password
  role: "admin",
  isActive: true,
  createdAt: new Date()
})
```

Or signup via API with role: "admin"

## 🚀 Deployment

### Deploy to Production

1. Set `NODE_ENV=production` in environment variables
2. Update `MONGO_URI` with production database URL
3. Change `JWT_SECRET` to a strong secret key
4. Set up proper CORS configuration
5. Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start server.js --name admin-dashboard-api
```

## 📈 Next Steps

For frontend integration:
1. Create Angular components for dashboard
2. Implement HTTP interceptor for JWT tokens
3. Create authentication service
4. Set up route guards for protected routes
5. Integrate Chart.js or D3.js for data visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Developed for SmartWinnr Assignment

## 📞 Support

For any queries or issues, please contact the development team.
