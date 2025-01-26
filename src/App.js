import React from 'react';
import LoginSignUp from './pages/LoginSignUp';
import PatientDashboard from './pages/Dashboard/patient/PatientDashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
