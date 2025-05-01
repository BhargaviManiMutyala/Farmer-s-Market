import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any saved session or token
    localStorage.clear();
    // Redirect to landing or login page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Farmer's Market</h2>
      <div className="nav-links">
        {role === 'farmer' && (
          <>
            <Link to="/farmer/home">Home</Link>
            <Link to="/farmer/addproduct">Add Product</Link>
            <Link to="/farmer/requests">Requests</Link>
            <Link to="/farmer/cart">Cart</Link>
            <Link to="/farmer/sold">Sold</Link>
          </>
        )}
        {role === 'buyer' && (
          <>
            <Link to="/buyer/home">Home</Link>
            <Link to="/">Requests</Link>
            <Link to="/">Cart</Link>
            <Link to="/">Bought</Link>
          </>
        )}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}
