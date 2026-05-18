// routes/employeeRoutes.js — Employee CRUD routes (all protected by JWT)

const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// All routes below require a valid JWT token

// GET /api/employees/search?department=Engineering — Must be before /:id route
router.get('/search', protect, searchEmployees);

// GET /api/employees — Get all employees
router.get('/', protect, getEmployees);

// POST /api/employees — Add a new employee
router.post('/', protect, addEmployee);

// PUT /api/employees/:id — Update employee by ID
router.put('/:id', protect, updateEmployee);

// DELETE /api/employees/:id — Delete employee by ID
router.delete('/:id', protect, deleteEmployee);

module.exports = router;
