import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentRequest() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ZAR'); 
  const [provider, setProvider] = useState('SWIFT'); // Default to SWIFT
  const [recipientAccount, setRecipientAccount] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You must be logged in to submit a payment request.');
      return;
    }

    const paymentData = {
      amount: parseFloat(amount),  // Ensure amount is a number
      currency,
      provider,
      recipientAccount,
      swiftCode
    };

    try {
      const response = await fetch('http://localhost:3000/payment/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include the JWT token in the request
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Payment request submitted successfully.');
        // Optionally navigate to another page after submission
        navigate('/home');
      } else {
        setMessage(data.message || 'Failed to submit payment request.');
      }
    } catch (error) {
      console.error('Error submitting payment request:', error);
      setMessage('An error occurred while submitting your request.');
    }
  };

  return (
    <div>
      <h1>Submit a Payment Request</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ZAR">ZAR</option>
            {/* Add more currency options as needed */}
          </select>
        </div>

        <div>
          <label>Provider</label>
          <select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="SWIFT">SWIFT</option>
            {/* Add more provider options if needed */}
          </select>
        </div>

        <div>
          <label>Recipient Account</label>
          <input
            type="text"
            placeholder="Enter recipient account number"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
            required
          />
        </div>

        <div>
          <label>SWIFT Code</label>
          <input
            type="text"
            placeholder="Enter SWIFT code"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Payment Request</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PaymentRequest;
