// src/pages/EmployeeListPage.jsx — Main page showing all employees with search & delete

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, searchEmployees, deleteEmployee } from '../services/api';

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchDept, setSearchDept] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all employees on component mount
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch employees. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  // Search by department
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await searchEmployees(searchDept);
      setEmployees(res.data);
    } catch (err) {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  // Reset search and show all
  const handleReset = () => {
    setSearchDept('');
    fetchAllEmployees();
  };

  // Delete an employee
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await deleteEmployee(id);
      setMessage(`${name} deleted successfully.`);
      // Remove from local state without re-fetching
      setEmployees(employees.filter((emp) => emp._id !== id));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete employee.');
    }
  };

  // Helper: Get score badge class based on score value
  const getScoreClass = (score) => {
    if (score >= 80) return 'score-badge score-high';
    if (score >= 60) return 'score-badge score-mid';
    return 'score-badge score-low';
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <h1>👥 Employee List</h1>
        <Link to="/employees/add" id="add-emp-link" className="btn btn-primary">
          + Add Employee
        </Link>
      </div>

      {/* Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* Search & Filter Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <form className="search-bar" onSubmit={handleSearch}>
          <select
            id="search-dept"
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          >
            <option value="">-- Filter by Department --</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Human Resources</option>
            <option>Finance</option>
            <option>Operations</option>
            <option>Design</option>
            <option>Product</option>
          </select>

          <button type="submit" id="search-btn" className="btn btn-primary">
            🔍 Search
          </button>
          <button type="button" id="reset-btn" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>

      {/* Employee Table */}
      <div className="card">
        {loading ? (
          <div className="loading">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found.</p>
            <Link to="/employees/add" className="btn btn-primary">
              Add First Employee
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <p style={{ marginBottom: '12px', color: '#64748b', fontSize: '0.9rem' }}>
              Showing {employees.length} employee{employees.length !== 1 ? 's' : ''}
            </p>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Skills</th>
                  <th>Score</th>
                  <th>Exp (yrs)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{emp.name}</strong>
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      {emp.skills && emp.skills.length > 0 ? (
                        emp.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>None</span>
                      )}
                    </td>
                    <td>
                      <span className={getScoreClass(emp.performanceScore)}>
                        {emp.performanceScore}
                      </span>
                    </td>
                    <td>{emp.experience}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/employees/edit/${emp._id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(emp._id, emp.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Link to AI Recommendations */}
      {employees.length > 0 && (
        <div style={{ marginTop: '16px', textAlign: 'right' }}>
          <Link to="/ai-recommend" className="btn btn-success">
            🤖 Get AI Recommendations
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmployeeListPage;
