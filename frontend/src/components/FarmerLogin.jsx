import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function FarmerLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the backend
      const res = await axios.post('http://localhost:5000/api/farmers/login', {
        phone,
        password,
      });
      if (res.status === 200) {
          // Save farmer details to localStorage
        const farmer = {
          phone: res.data.phone,
          farmName: res.data.farmName,
          email: res.data.email, // if applicable
          location: res.data.location // if needed
        };
        localStorage.setItem('farmer', JSON.stringify(farmer));
        console.log('Farmer saved to localStorage:', farmer);
  
        navigate('/farmer/home');
      } else {
        setError(res.data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login Error: ', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <p className="title">Farmer Sign In</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign In" className="submit-button" />
        {error && <p className="error-message">{error}</p>}
      </form>

      <Link to="/farmer/register">
        <button className="signup-button">New Farmer? Register Here</button>
      </Link>
    </div>
  );
}
