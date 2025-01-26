import React from 'react';
import LoginSignUp from './pages/LoginSignUp';
import HomePage from './pages/HomePage';
import PatientDashboard from './pages/Dashboard/patient/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/doctor/DoctorDashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
