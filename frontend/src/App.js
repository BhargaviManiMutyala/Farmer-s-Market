import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import FarmerLogin from './components/FarmerLogin';
import BuyerLogin from './components/BuyerLogin';
import FarmerRegister from './components/FarmerRegister';
import BuyerRegister from './components/BuyerRegister';
import FarmerHome from './components/FarmerHome';
import BuyerHome from './components/BuyerHome';
import AddProduct from './components/AddProduct';
import FarmerProducts from './components/FarmerProducts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Farmer pages */}
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />
        <Route path="/farmer/home" element={<FarmerHome />} />
        <Route path="/farmer/addproduct" element={<AddProduct />} />

        {/* Buyer pages */}
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route path="/buyer/home" element={<BuyerHome />} />
        <Route path="/buyer/farmer/:phone" element={<FarmerProducts />} />

        {/* Redirect any unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
