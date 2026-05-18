// src/pages/AIRecommendPage.jsx — AI-powered recommendation page

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, getAIRecommendation } from '../services/api';

function AIRecommendPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // IDs of selected employees
  const [recommendation, setRecommendation] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Load all employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(res.data);
      } catch (err) {
        setError('Failed to load employees.');
      } finally {
        setFetching(false);
      }
    };
    fetchEmployees();
  }, []);

  // Toggle employee selection checkbox
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Select all / deselect all
  const toggleAll = () => {
    if (selectedIds.length === employees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(employees.map((e) => e._id));
    }
  };

  // Send selected employees to AI and get recommendation
  const handleGetRecommendation = async () => {
    if (selectedIds.length === 0) {
      setError('Please select at least one employee.');
      return;
    }
    setError('');
    setRecommendation('');

    // Get full employee objects for selected IDs
    const selectedEmployees = employees.filter((emp) => selectedIds.includes(emp._id));

    try {
      setLoading(true);
      const res = await getAIRecommendation(selectedEmployees);
      setRecommendation(res.data.recommendation);
      setNote(res.data.note || '');
    } catch (err) {
      setError(err.response?.data?.message || 'AI recommendation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div className="ai-header">
          <h1>🤖 AI Recommendations</h1>
        </div>
        <Link to="/employees" className="btn btn-secondary">
          ← Back to List
        </Link>
      </div>

      <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.95rem' }}>
        Select one or more employees and click <strong>Get AI Recommendation</strong> to receive
        promotion advice, training suggestions, rankings, and performance feedback.
      </p>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Employee Selection */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <strong>Select Employees</strong>
          <button className="btn btn-secondary btn-sm" onClick={toggleAll}>
            {selectedIds.length === employees.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {fetching ? (
          <div className="loading">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found.</p>
            <Link to="/employees/add" className="btn btn-primary">
              Add Employees First
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Score</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    style={{
                      background: selectedIds.includes(emp._id) ? '#eff6ff' : '',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleSelect(emp._id)}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(emp._id)}
                        onChange={() => toggleSelect(emp._id)}
                        onClick={(e) => e.stopPropagation()}
                        id={`check-${emp._id}`}
                        style={{ width: 'auto', cursor: 'pointer' }}
                      />
                    </td>
                    <td><strong>{emp.name}</strong></td>
                    <td>{emp.department}</td>
                    <td>
                      <span
                        className={`score-badge ${
                          emp.performanceScore >= 80
                            ? 'score-high'
                            : emp.performanceScore >= 60
                            ? 'score-mid'
                            : 'score-low'
                        }`}
                      >
                        {emp.performanceScore}
                      </span>
                    </td>
                    <td>{emp.experience} yrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action button */}
        {employees.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <button
              id="get-ai-btn"
              className="btn btn-success"
              onClick={handleGetRecommendation}
              disabled={loading || selectedIds.length === 0}
            >
              {loading
                ? '🔄 Analyzing...'
                : `🤖 Get AI Recommendation (${selectedIds.length} selected)`}
            </button>
          </div>
        )}
      </div>

      {/* AI Recommendation Output */}
      {recommendation && (
        <div className="card">
          <h2 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>
            📋 AI Analysis Result
          </h2>

          {/* Show fallback note if API was unavailable */}
          {note && (
            <div className="alert alert-info" style={{ marginBottom: '12px' }}>
              ℹ️ {note}
            </div>
          )}

          <div className="ai-box">{recommendation}</div>
        </div>
      )}
    </div>
  );
}

export default AIRecommendPage;
