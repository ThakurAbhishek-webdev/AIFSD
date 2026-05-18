// src/pages/AddEmployeePage.jsx — Form to add a new employee

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addEmployee } from '../services/api';

function AddEmployeePage() {
  const navigate = useNavigate();

  // Form state matching Employee schema fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',         // Comma-separated string, converted to array on submit
    performanceScore: '',
    experience: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      formData.performanceScore === '' ||
      formData.experience === ''
    ) {
      setError('Please fill all required fields.');
      return;
    }

    // Validate score range
    const score = Number(formData.performanceScore);
    if (score < 0 || score > 100) {
      setError('Performance score must be between 0 and 100.');
      return;
    }

    try {
      setLoading(true);
      await addEmployee(formData); // Backend handles skills string → array conversion
      navigate('/employees'); // Redirect to employee list on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>➕ Add New Employee</h1>
        <Link to="/employees" className="btn btn-secondary">
          ← Back to List
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '700px' }}>
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Row 1: Name & Email */}
          <div className="form-row">
            <div className="form-group">
              <label>Employee Name *</label>
              <input
                type="text"
                name="name"
                id="emp-name"
                placeholder="e.g. Alice Johnson"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                id="emp-email"
                placeholder="alice@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2: Department & Skills */}
          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <select
                name="department"
                id="emp-department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">-- Select Department --</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Human Resources</option>
                <option>Finance</option>
                <option>Operations</option>
                <option>Design</option>
                <option>Product</option>
              </select>
            </div>
            <div className="form-group">
              <label>Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                id="emp-skills"
                placeholder="e.g. React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Score & Experience */}
          <div className="form-row">
            <div className="form-group">
              <label>Performance Score (0–100) *</label>
              <input
                type="number"
                name="performanceScore"
                id="emp-score"
                placeholder="e.g. 85"
                min="0"
                max="100"
                value={formData.performanceScore}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                name="experience"
                id="emp-experience"
                placeholder="e.g. 3"
                min="0"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            id="add-emp-btn"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeePage;
