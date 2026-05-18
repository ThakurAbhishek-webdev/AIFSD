// controllers/employeeController.js — CRUD operations for employees

const Employee = require('../models/Employee');

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Private (JWT required)
const addEmployee = async (req, res) => {
  const { name, email, department, skills, performanceScore, experience } = req.body;

  // Validate required fields
  if (!name || !email || !department || performanceScore === undefined || experience === undefined) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    // Check for duplicate email
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    // Parse skills: if it's a string (comma-separated), convert to array
    const skillsArray =
      typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim()).filter(Boolean)
        : skills || [];

    const employee = await Employee.create({
      name,
      email,
      department,
      skills: skillsArray,
      performanceScore: Number(performanceScore),
      experience: Number(experience),
    });

    res.status(201).json(employee);
  } catch (error) {
    // Handle Mongoose duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }); // Newest first
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search employees by department
// @route   GET /api/employees/search?department=Engineering
// @access  Private
const searchEmployees = async (req, res) => {
  const { department } = req.query;

  try {
    let query = {};

    // If department query param is provided, filter by it (case-insensitive)
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }

    const employees = await Employee.find(query).sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Parse skills if provided as string
    if (req.body.skills && typeof req.body.skills === 'string') {
      req.body.skills = req.body.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }

    // Update fields
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated doc, run schema validation
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
};
