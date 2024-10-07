import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const handlePaymentRequest = () => {
    navigate('/payment-request');
  };

  return (
    <div style={styles.container}>
      {/* Logout button in the top right corner */}
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>

      {/* Welcome heading */}
      <h1 style={styles.heading}>Welcome to the Payment Portal!</h1>

      {/* Payment Request Tile */}
      <div style={styles.tile}>
        <h2 style={styles.tileHeading}>Submit Payment Request</h2>
        <p style={styles.description}>
          Click here to submit a payment request using SWIFT or other supported providers. Make secure and seamless international payments.
        </p>
        <button onClick={handlePaymentRequest} style={styles.button}>
          Submit a Payment Request
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f5',
  },
  heading: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '40px',
  },
  tile: {
    maxWidth: '500px',
    width: '100%',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',  // Darker shadow
    textAlign: 'center',
  },
  tileHeading: {
    fontSize: '1.8em',
    color: '#007bff',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Home;
