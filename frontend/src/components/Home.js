import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const handlePaymentRequest = () => {
    navigate('/payment-request');  // Navigate to the payment request form
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={handlePaymentRequest}>Submit a Payment Request</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
