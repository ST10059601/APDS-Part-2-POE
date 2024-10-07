import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentRequest from './components/PaymentRequest';

function App() {
  // Helper function to check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/payment-request" element={isAuthenticated() ? <PaymentRequest /> : <Navigate to="/login" />} />
        <Route path="/payment-success" element={isAuthenticated() ? <PaymentSuccess /> : <Navigate to="/login" />} />  
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
