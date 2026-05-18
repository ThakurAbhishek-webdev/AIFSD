// src/App.jsx — Root component with all routes defined

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import AIRecommendPage from './pages/AIRecommendPage';

function App() {
  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar />

      <Routes>
        {/* Public routes — no login required */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes — require JWT token */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-recommend"
          element={
            <ProtectedRoute>
              <AIRecommendPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect — go to employees list or login */}
        <Route path="/" element={<Navigate to="/employees" replace />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
