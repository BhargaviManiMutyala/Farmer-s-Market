import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import './Register.css';

function FarmerRegister() {
  const [farmName, setFarmName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/farmers/register', {
        farmName,
        email,
        password,
        location,
        phone
      });
      console.log(res.data);
      alert('Farmer Registered Successfully!');
    } catch (err) {
      console.error(err);
      alert('Registration Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="title">Farmer Sign Up</p>
      <input type="text" placeholder="Name" value={farmName} onChange={(e) => setFarmName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <button type="submit">Register</button>
      {/* Signin Button */}
        <Link to="/farmer/login">
        <button className="login-button">Already Registered? Login Here</button>
        </Link>
    </form>
  );
}

export default FarmerRegister;