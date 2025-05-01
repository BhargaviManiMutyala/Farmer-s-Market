import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Home.css';

export default function FarmerCart() {
  const [requests, setRequests] = useState([]);
  const farmer = JSON.parse(localStorage.getItem('farmer'));

  useEffect(() => {
    if (!farmer) return;

    axios.get(`http://localhost:5000/api/requests/${farmer.phone}`)
      .then((res) => {
        setRequests(res.data.filter(r => r.status === 'Accepted'));
      })
      .catch((err) => console.error('Error fetching accepted requests:', err));
  }, [farmer]);

  const handleSold = async (request) => {
    try {
      // 1. Update request status to "Done"
      await axios.put(`http://localhost:5000/api/requests/${request._id}/status`, {
        status: 'Done'
      });
    
      // 2. Delete the product from Product schema
      const productId = request.productId._id;
      await axios.delete(`http://localhost:5000/api/products/${productId}`);

      // 3. Update UI
      setRequests(prev => prev.filter(r => r._id !== request._id));
      alert('Product marked as sold and removed from listings.');
    } catch (err) {
      console.error('Error marking as sold:', err);
      alert('Failed to mark as sold.');
    }
  };

  const handleNotSold = async (requestId) => {
    try {
      // Delete the request from the database
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`);

      // Update UI
      setRequests(prev => prev.filter(r => r._id !== requestId));
      alert('Request deleted (unsold).');
    } catch (err) {
      console.error('Error deleting request:', err);
      alert('Failed to delete request.');
    }
  };

  return (
    <div>
      <Navbar role="farmer" />
      <div className="home-container">
        <h3>Accepted Requests (Cart)</h3>
        <div className="card-container">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div className="card" key={r._id}>
                <h4>{r.productName}</h4>
                <p><strong>Buyer:</strong> {r.buyerName}</p>
                <p><strong>Phone:</strong> {r.buyerPhone}</p>
                <p><strong>Email:</strong> {r.buyerEmail}</p>
                <p><strong>Status:</strong> {r.status}</p>
                <button onClick={() => handleSold(r)}>Sold</button>
                <button onClick={() => handleNotSold(r._id)}>Not Sold</button>
                <p><strong>Contact to buyer to sell the product.</strong></p>
              </div>
            ))
          ) : (
            <p>No accepted requests.</p>
          )}
        </div>
      </div>
    </div>
  );
}
