import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './FarmerSold.css'; // Create a separate CSS for Sold page styling

export default function FarmerSold() {
  const [requests, setRequests] = useState([]);
  const farmer = JSON.parse(localStorage.getItem('farmer')); // Assuming you store farmer info in localStorage

  useEffect(() => {
    if (farmer && farmer.phone) {
      // Fetch requests for this farmer based on the farmer's phone
      axios.get(`http://localhost:5000/api/requests/${farmer.phone}`)
        .then((res) => {
          // Filter out requests with status 'Done' (already sold products)
          setRequests(res.data.filter(r => r.status === 'Done'));
        })
        .catch((err) => {
          console.error('Error fetching sold requests:', err);
        });
    }
  }, [farmer]);

  if (!farmer) return <p>Please log in as a farmer.</p>;

  return (
    <div>
      <Navbar role="farmer" />
      <div className="home-container">
        <h3>Sold Products</h3>
        <div className="card-container">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div className="card" key={r._id}>
                <h4>{r.productName}</h4>
                <p><strong>Buyer:</strong> {r.buyerName}</p>
                <p><strong>Phone:</strong> {r.buyerPhone}</p>
                <p><strong>Email:</strong> {r.buyerEmail}</p>
                <p><strong>Status:</strong> {r.status}</p>
                <p><strong>Sold At:</strong> {new Date(r.updatedAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No sold products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
