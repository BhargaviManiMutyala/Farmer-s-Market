import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Farmer’s Market</h1>
      <div className="button-group">
        <Link to="/farmer/login">
          <button className="landing-button">I am a Farmer</button>
        </Link>
        <Link to="/buyer/login">
          <button className="landing-button">I am a Buyer</button>
        </Link>
      </div>
    </div>
  );
}
