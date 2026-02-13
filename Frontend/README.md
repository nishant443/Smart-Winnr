# Admin Dashboard Frontend - Angular

Complete Angular frontend for the Admin Dashboard with Analytics & Reporting.

## 🚀 Features

- ✅ **User Authentication** - Login/Signup with JWT
- ✅ **Role-Based Access** - User and Admin roles
- ✅ **Admin Dashboard** - Real-time analytics with Chart.js
- ✅ **User Management** - CRUD operations (Admin only)
- ✅ **Content Management** - Create, edit, view content
- ✅ **Responsive Design** - Works on all devices
- ✅ **Route Guards** - Protected routes based on authentication
- ✅ **HTTP Interceptor** - Automatic JWT token handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Angular CLI: `npm install -g @angular/cli`
- Backend API running on `http://localhost:5000`

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Angular 17
- RxJS
- Chart.js & ng2-charts
- All required dependencies

### Step 2: Configure Environment

The API URL is configured in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

Make sure your backend is running on port 5000.

### Step 3: Run the Application

```bash
# Development server
ng serve

# Or using npm
npm start
```

Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Login page
│   │   ├── signup/         # Signup page
│   │   ├── dashboard/      # Main dashboard with analytics
│   │   ├── users/          # User management (Admin)
│   │   ├── analytics/      # Analytics page (Admin)
│   │   ├── content/        # Content management
│   │   ├── navbar/         # Top navigation bar
│   │   └── sidebar/        # Side navigation menu
│   ├── services/
│   │   ├── auth.service.ts       # Authentication service
│   │   ├── user.service.ts       # User CRUD operations
│   │   ├── analytics.service.ts  # Analytics data
│   │   └── content.service.ts    # Content management
│   ├── guards/
│   │   ├── auth.guard.ts   # Protects authenticated routes
│   │   └── admin.guard.ts  # Protects admin-only routes
│   ├── interceptors/
│   │   └── jwt.interceptor.ts  # Auto-adds JWT to requests
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── content.model.ts
│   │   ├── analytics.model.ts
│   │   └── api-response.model.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── environments/
│   ├── environment.ts        # Development config
│   └── environment.prod.ts   # Production config
├── assets/                   # Images, icons, etc.
└── styles.css               # Global styles
```

## 🔐 Routes & Access Control

### Public Routes
- `/login` - User login
- `/signup` - User registration

### Protected Routes (Authenticated Users)
- `/dashboard` - Main dashboard
- `/content` - View content
- `/content/:id` - View specific content

### Admin-Only Routes
- `/users` - User management
- `/analytics` - Detailed analytics
- `/content/create` - Create content
- `/content/edit/:id` - Edit content

## 🎨 Components Overview

### 1. Login Component
- Email/password authentication
- Form validation
- Redirects to dashboard on success

### 2. Signup Component
- User registration
- Role selection (User/Admin)
- Form validation

### 3. Dashboard Component
**Regular User View:**
- Welcome message
- Recent content
- Personal statistics

**Admin View:**
- Key metrics cards (Total Users, Active Users, Sales, etc.)
- Signup trend chart (7 days)
- Activity trend chart (7 days)
- User statistics
- Content statistics

### 4. Users Component (Admin Only)
- List all users with pagination
- Search and filter users
- Update user details
- Delete users
- View user statistics

### 5. Analytics Component (Admin Only)
- Dashboard overview metrics
- Signup trends (7, 30 days)
- Activity trends (7, 30 days)
- Sales data
- Interactive charts (Chart.js)

### 6. Content Component
- List all content with filters
- View content details
- Create new content (Admin)
- Edit content (Admin)
- Delete content (Admin)
- Filter by status/type

### 7. Navbar Component
- User info display
- Logout button
- Responsive mobile menu

### 8. Sidebar Component
- Navigation menu
- Role-based menu items
- Active route highlighting

## 🔧 Services

### AuthService
```typescript
// Login
authService.login(credentials).subscribe()

// Signup
authService.signup(data).subscribe()

// Logout
authService.logout()

// Check if logged in
authService.isLoggedIn

// Check if admin
authService.isAdmin

// Get current user
authService.currentUser
```

### UserService (Admin Only)
```typescript
// Get all users
userService.getAllUsers(page, limit).subscribe()

// Get user by ID
userService.getUserById(id).subscribe()

// Update user
userService.updateUser(id, data).subscribe()

// Delete user
userService.deleteUser(id).subscribe()

// Get user statistics
userService.getUserStats().subscribe()
```

### AnalyticsService (Admin Only)
```typescript
// Dashboard overview
analyticsService.getDashboardOverview().subscribe()

// Signup trend
analyticsService.getSignupsTrend(days).subscribe()

// Activity trend
analyticsService.getActivityTrend(days).subscribe()

// Sales data
analyticsService.getSalesData(days).subscribe()
```

### ContentService
```typescript
// Get all content
contentService.getAllContent(page, limit, status, type).subscribe()

// Get by ID
contentService.getContentById(id).subscribe()

// Create (Admin only)
contentService.createContent(data).subscribe()

// Update (Admin only)
contentService.updateContent(id, data).subscribe()

// Delete (Admin only)
contentService.deleteContent(id).subscribe()

// Statistics (Admin only)
contentService.getContentStats().subscribe()
```

## 🛡️ Guards

### AuthGuard
Protects routes requiring authentication:
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

### AdminGuard
Protects admin-only routes:
```typescript
{
  path: 'users',
  component: UsersComponent,
  canActivate: [AuthGuard, AdminGuard]
}
```

## 📊 Charts & Visualization

Using **Chart.js** with **ng2-charts**:

```typescript
// Chart configuration
chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [{
    label: 'Signups',
    data: [12, 19, 3, 5, 2],
    borderColor: '#667eea',
    backgroundColor: 'rgba(102, 126, 234, 0.1)'
  }]
};

chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
```

## 🔄 HTTP Interceptor

JWT tokens are automatically added to all requests:

```typescript
// Interceptor adds Authorization header
Authorization: Bearer <token>

// Handles 401 Unauthorized responses
// Automatically redirects to login
```

## 🎯 Usage Examples

### Login Flow
```typescript
// 1. User enters credentials
// 2. AuthService.login() called
// 3. Token saved to localStorage
// 4. User redirected to dashboard
// 5. All future requests include token
```

### Creating Content (Admin)
```typescript
// 1. Navigate to /content/create
// 2. Fill form with title, description, type
// 3. Submit form
// 4. ContentService.createContent() called
// 5. Success message displayed
// 6. Redirected to content list
```

### Viewing Analytics (Admin)
```typescript
// 1. Navigate to /analytics
// 2. AnalyticsService loads data
// 3. Charts render with Chart.js
// 4. Real-time updates every 30 seconds (optional)
```

## 🚀 Building for Production

```bash
# Build production bundle
ng build --configuration production

# Output in dist/ folder
# Deploy to your hosting service
```

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full sidebar + main content
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu

## ⚡ Performance Tips

1. **Lazy Loading**: Load routes on demand
2. **OnPush Strategy**: Optimize change detection
3. **TrackBy Functions**: Optimize *ngFor loops
4. **Production Build**: AOT compilation, minification

## 🧪 Testing

```bash
# Unit tests
ng test

# E2E tests
ng e2e
```

## 🐛 Troubleshooting

### CORS Errors
Make sure backend CORS is configured for `http://localhost:4200`

### 401 Unauthorized
- Check if backend is running
- Verify token is saved in localStorage
- Check token expiration

### Charts Not Displaying
```bash
npm install chart.js ng2-charts --save
```

## 📚 Learn More

- [Angular Documentation](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [Chart.js Documentation](https://www.chartjs.org/)

## 🤝 Integration with Backend

This frontend is designed to work with the MEAN stack backend:

**Backend Features Integrated:**
- ✅ JWT Authentication
- ✅ User Management APIs
- ✅ Analytics APIs
- ✅ Content Management APIs
- ✅ Role-based authorization

## 🎨 Customization

### Change Theme Colors
Edit `src/styles.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Modify API URL
Edit `src/environments/environment.ts`:
```typescript
apiUrl: 'https://your-api-url.com/api'
```

## 📄 License

ISC License

## 👨‍💻 Author

Developed for SmartWinnr Assignment

---

**Happy Coding! 🎉**
