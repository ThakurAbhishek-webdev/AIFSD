# AI-Based Employee Performance Analytics & Recommendation System

A full-stack MERN project built for university submission.

## 🛠 Tech Stack
- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **AI**: OpenRouter API (with rule-based fallback)

---

## 📁 Project Structure

```
ESE_AIFSD/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── aiRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── EmployeeListPage.jsx
    │   │   ├── AddEmployeePage.jsx
    │   │   ├── EditEmployeePage.jsx
    │   │   └── AIRecommendPage.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## ⚙️ Setup & Run Locally

### Step 1 — Clone / Open the project
```
cd ESE_AIFSD
```

### Step 2 — Configure Backend Environment
```bash
cd backend
copy .env.example .env
```
Edit `.env` and fill in:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/employee_analytics
JWT_SECRET=your_long_secret_key
OPENROUTER_API_KEY=your_openrouter_key
```

> **MongoDB Atlas**: Create free cluster at https://cloud.mongodb.com  
> **OpenRouter**: Get free API key at https://openrouter.ai

### Step 3 — Install & Run Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: **http://localhost:5000**

### Step 4 — Install & Run Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs at: **http://localhost:3000**

---

## 🔑 Sample Login Credentials (after signup)
1. Go to http://localhost:3000/signup
2. Create an account
3. Login and start adding employees

---

## 📦 Sample Employee Data (insert via UI or Postman)

```json
{
  "name": "Alice Johnson",
  "email": "alice@company.com",
  "department": "Engineering",
  "skills": "React, Node.js, MongoDB",
  "performanceScore": 88,
  "experience": 5
}
```

```json
{
  "name": "Bob Smith",
  "email": "bob@company.com",
  "department": "Marketing",
  "skills": "SEO, Content Writing",
  "performanceScore": 62,
  "experience": 2
}
```

```json
{
  "name": "Carol Davis",
  "email": "carol@company.com",
  "department": "Engineering",
  "skills": "Python, Django",
  "performanceScore": 45,
  "experience": 1
}
```

---

## 🧪 Test Cases

| Test | Expected Result |
|------|----------------|
| Insert valid employee | 201 Created |
| Duplicate email | 400 Error |
| Missing performance score | 400 Validation error |
| Search by department | Filtered results |
| Valid login | 200 + JWT token |
| Wrong password | 401 Unauthorized |
| Protected route without token | 401 No token |
| Edit employee | 200 Updated |
| Delete employee | 200 Deleted |

---

## 🚀 Deployment (Render)

### Backend on Render
1. Create new Web Service on https://render.com
2. Connect GitHub repo → select `backend` folder
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables in Render dashboard

### Frontend on Render (Static Site)
1. Create Static Site on Render
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `build`
5. Set `REACT_APP_API_URL` to your Render backend URL

---

## 📡 API Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/signup | No | Register user |
| POST | /api/auth/login | No | Login |
| GET | /api/employees | Yes | Get all |
| POST | /api/employees | Yes | Add employee |
| GET | /api/employees/search?department= | Yes | Search |
| PUT | /api/employees/:id | Yes | Update |
| DELETE | /api/employees/:id | Yes | Delete |
| POST | /api/ai/recommend | Yes | AI analysis |
