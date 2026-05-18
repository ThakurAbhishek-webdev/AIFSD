# API Documentation — Employee Analytics System

Base URL (local): `http://localhost:5000/api`

All protected routes require:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 AUTH ROUTES

### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "_id": "64abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGci..."
}
```

**Error (400) — User exists:**
```json
{ "message": "User with this email already exists" }
```

---

### POST /api/auth/login
Login and get a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "_id": "64abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGci..."
}
```

**Error (401):**
```json
{ "message": "Invalid email or password" }
```

---

## 👥 EMPLOYEE ROUTES (All require JWT)

### POST /api/employees
Add a new employee.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
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

**Success (201):**
```json
{
  "_id": "64xyz...",
  "name": "Alice Johnson",
  "email": "alice@company.com",
  "department": "Engineering",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 88,
  "experience": 5,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error (400) — Duplicate email:**
```json
{ "message": "Employee with this email already exists" }
```

**Error (400) — Missing fields:**
```json
{ "message": "Please fill all required fields" }
```

---

### GET /api/employees
Get all employees (newest first).

**Headers:** `Authorization: Bearer <token>`

**Success (200):**
```json
[
  {
    "_id": "64xyz...",
    "name": "Alice Johnson",
    "department": "Engineering",
    "performanceScore": 88,
    "experience": 5,
    "skills": ["React", "Node.js"]
  }
]
```

---

### GET /api/employees/search?department=Engineering
Filter employees by department.

**Headers:** `Authorization: Bearer <token>`

**Query Params:** `department` (string, case-insensitive)

**Success (200):** Array of matching employees sorted by score descending.

---

### PUT /api/employees/:id
Update an existing employee.

**Headers:** `Authorization: Bearer <token>`

**URL Param:** `:id` — MongoDB ObjectId

**Request Body:** Any fields to update (same as POST)

**Success (200):** Updated employee object.

**Error (404):**
```json
{ "message": "Employee not found" }
```

---

### DELETE /api/employees/:id
Delete an employee.

**Headers:** `Authorization: Bearer <token>`

**Success (200):**
```json
{ "message": "Employee deleted successfully" }
```

---

## 🤖 AI ROUTES

### POST /api/ai/recommend
Get AI recommendation for selected employees.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "employees": [
    {
      "name": "Alice Johnson",
      "department": "Engineering",
      "performanceScore": 88,
      "experience": 5,
      "skills": ["React", "Node.js"]
    }
  ]
}
```

**Success (200):**
```json
{
  "recommendation": "1. Promotion Recommendation: Alice Johnson...",
  "employeesAnalyzed": 1
}
```

**Fallback (200) — If OpenRouter API unavailable:**
```json
{
  "recommendation": "=== Employee Performance Analysis ===...",
  "employeesAnalyzed": 1,
  "note": "AI API unavailable — showing rule-based recommendation"
}
```

---

## ❌ Common Error Responses

| Code | Meaning |
|------|---------|
| 400 | Bad request / validation failed |
| 401 | Unauthorized (no/invalid token) |
| 404 | Resource not found |
| 500 | Internal server error |

**401 No Token:**
```json
{ "message": "Not authorized, no token provided" }
```

**401 Invalid Token:**
```json
{ "message": "Not authorized, token failed" }
```
