# Angular Frontend - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Angular CLI
```bash
npm install -g @angular/cli
```

### Step 2: Install Dependencies
```bash
cd admin-dashboard-frontend
npm install
```

### Step 3: Make Sure Backend is Running
The backend should be running on `http://localhost:5000`

```bash
# In backend folder
npm run dev
```

### Step 4: Start Angular Dev Server
```bash
ng serve
# Or
npm start
```

Navigate to: `http://localhost:4200`

---

## 📝 First Steps

### 1. Create an Admin Account
- Click "Sign up here"
- Fill in details
- Select **Administrator** as Account Type
- Click Sign Up

### 2. Login
- Use your credentials
- You'll be redirected to the dashboard

### 3. Explore Admin Features
- **Dashboard** - View analytics and metrics
- **Users** - Manage all users
- **Analytics** - Detailed charts and trends
- **Content** - Create and manage content

---

## 🎯 Key Features to Test

### Dashboard (All Users)
✅ Overview metrics
✅ Recent activity
✅ Welcome message

### Users Management (Admin Only)
✅ View all users with pagination
✅ Search and filter users
✅ Edit user details
✅ Delete users
✅ View user statistics

### Analytics (Admin Only)
✅ Dashboard overview metrics
✅ Signup trends (7 days, 30 days)
✅ Activity trends charts
✅ Sales data visualization

### Content Management
✅ View all content (All users)
✅ Create content (Admin only)
✅ Edit content (Admin only)
✅ Delete content (Admin only)
✅ Filter by status/type

---

## 🔐 Default Test Credentials

After signing up, use these roles:

**Admin User:**
- Email: admin@example.com
- Password: admin123
- Role: Administrator

**Regular User:**
- Email: user@example.com
- Password: user123
- Role: Regular User

---

## 📊 Testing Analytics

### View Real-Time Data
1. Login as Admin
2. Navigate to Analytics page
3. See charts update with real data

### Create Test Data
Run these in Postman or backend:
```javascript
// Create multiple users
// Create content
// View trends update automatically
```

---

## 🛠️ Project Structure Quick Reference

```
src/app/
├── components/          # All UI components
│   ├── login/          # Login page
│   ├── signup/         # Registration
│   ├── dashboard/      # Main dashboard
│   ├── users/          # User management
│   ├── analytics/      # Analytics page
│   └── content/        # Content CRUD
├── services/           # API services
├── guards/             # Route protection
├── models/             # TypeScript interfaces
└── interceptors/       # HTTP interceptors
```

---

## 🔄 Development Workflow

### Make Changes
1. Edit component files
2. Changes auto-reload in browser
3. Check console for errors

### Add New Feature
```bash
# Generate component
ng generate component components/my-feature

# Generate service
ng generate service services/my-service
```

### Build for Production
```bash
ng build --configuration production
```

---

## 🐛 Troubleshooting

### Port 4200 Already in Use
```bash
ng serve --port 4201
```

### Backend Not Connecting
Check `src/environments/environment.ts`:
```typescript
apiUrl: 'http://localhost:5000/api'
```

### CORS Error
Make sure backend has CORS enabled for `http://localhost:4200`

### Module Not Found
```bash
npm install
```

### Charts Not Showing
```bash
npm install chart.js ng2-charts --save
```

---

## 📚 Common Tasks

### Add a New Route
Edit `app-routing.module.ts`:
```typescript
{
  path: 'my-route',
  component: MyComponent,
  canActivate: [AuthGuard]
}
```

### Call an API
Inject service in component:
```typescript
constructor(private myService: MyService) {}

ngOnInit() {
  this.myService.getData().subscribe(data => {
    console.log(data);
  });
}
```

### Add Form Validation
```typescript
this.form = this.fb.group({
  field: ['', [Validators.required, Validators.email]]
});
```

---

## 🎨 Customization

### Change Primary Color
Edit `src/styles.css`:
```css
/* Change gradient colors */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
```

### Modify Navbar
Edit `components/navbar/navbar.component.ts`

### Add Sidebar Item
Edit `components/sidebar/sidebar.component.ts`

---

## ✅ Testing Checklist

- [ ] Can signup new user
- [ ] Can login successfully
- [ ] Token stored in localStorage
- [ ] Protected routes redirect to login
- [ ] Admin can access all pages
- [ ] Regular user cannot access admin pages
- [ ] Dashboard loads analytics
- [ ] Charts render correctly
- [ ] User CRUD operations work
- [ ] Content CRUD operations work
- [ ] Logout clears session
- [ ] Responsive on mobile

---

## 📖 Next Steps

1. ✅ Frontend running
2. 🔌 Connected to backend
3. 🎨 Customize the theme
4. ➕ Add new features
5. 🧪 Write tests
6. 🚀 Deploy to production

---

## 🆘 Getting Help

**Angular CLI Help:**
```bash
ng help
```

**Check Angular Version:**
```bash
ng version
```

**Generate Code:**
```bash
ng generate --help
```

---

**Happy Coding! 🎉**

For detailed documentation, see README.md
