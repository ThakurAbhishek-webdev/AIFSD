// src/pages/EditEmployeePage.jsx — Form to edit an existing employee

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getEmployees, updateEmployee } from '../services/api';

function EditEmployeePage() {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing employee data when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getEmployees();
        // Find this specific employee from the list
        const emp = res.data.find((e) => e._id === id);
        if (emp) {
          setFormData({
            name: emp.name,
            email: emp.email,
            department: emp.department,
            skills: emp.skills.join(', '), // Convert array back to comma-separated string
            performanceScore: emp.performanceScore,
            experience: emp.experience,
          });
        } else {
          setError('Employee not found.');
        }
      } catch (err) {
        setError('Failed to load employee data.');
      } finally {
        setFetching(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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

    const score = Number(formData.performanceScore);
    if (score < 0 || score > 100) {
      setError('Performance score must be between 0 and 100.');
      return;
    }

    try {
      setLoading(true);
      await updateEmployee(id, formData);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading employee data...</div>;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>✏️ Edit Employee</h1>
        <Link to="/employees" className="btn btn-secondary">
          ← Back to List
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '700px' }}>
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Employee Name *</label>
              <input
                type="text"
                name="name"
                id="edit-name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                id="edit-email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <select
                name="department"
                id="edit-department"
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
                id="edit-skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Performance Score (0–100) *</label>
              <input
                type="number"
                name="performanceScore"
                id="edit-score"
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
                id="edit-experience"
                min="0"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            id="update-emp-btn"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Employee'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeePage;
