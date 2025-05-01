import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './FarmerRequests.css';

export default function FarmerRequests() {
  const [requests, setRequests] = useState([]);
  const farmer = JSON.parse(localStorage.getItem('farmer')); // Assuming you store farmer info in localStorage

  useEffect(() => {
    if (farmer && farmer.phone) {
      // Fetch requests for this farmer based on the farmer's phone
      axios.get(`http://localhost:5000/api/requests/${farmer.phone}`)

        .then((res) => {
          setRequests(res.data); // Set the requests data
        })
        .catch((err) => {
          console.error('Error fetching requests:', err);
        });
    }
  }, [farmer]);

  if (!farmer) return <p>Please log in as a farmer.</p>;

  return (
    <div>
      <Navbar role="farmer" />
      <div className="home-container">
        <h3>Requests</h3>
        <div className="card-container">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div className="card" key={request._id}>
                <h4>Request for {request.productName}</h4>
                <p><strong>Buyer Name:</strong> {request.buyerName}</p>
                <p><strong>Phone:</strong> {request.buyerPhone}</p>
                <p><strong>Email:</strong> {request.buyerEmail}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                <button>Approve</button> {/* Add functionality to approve request */}
                <button>Reject</button> {/* Add functionality to reject request */}
              </div>
            ))
          ) : (
            <p>No requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
