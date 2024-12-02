import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import HospitalDashboard from './components/hospital/HospitalDashboard';
import PatientDashboard from './components/patient/PatientDashboard';
import './App.css'
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="py-10">
            <Routes>
              <Route path="/hospital/*" element={<HospitalDashboard />} />
              <Route path="/patient/*" element={<PatientDashboard />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
