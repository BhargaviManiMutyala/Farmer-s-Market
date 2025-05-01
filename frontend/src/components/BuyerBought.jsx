import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Home.css'; // Create a separate CSS for Bought page styling

export default function BuyerBought() {
  const [requests, setRequests] = useState([]);
  const [farmerDetails, setFarmerDetails] = useState({});
  const buyer = JSON.parse(localStorage.getItem('buyer')); // Assuming you store buyer info in localStorage

  useEffect(() => {
    if (!buyer || !buyer.phone) return;

    // Fetch buyer's requests with "Accepted" status
    axios.get(`http://localhost:5000/api/requests/buyer/${buyer.phone}`)
      .then((res) => {
        const acceptedRequests = res.data.filter(request => request.status === 'Done');
        setRequests(acceptedRequests);

        // Fetch farmer details for each accepted request
        acceptedRequests.forEach((request) => {
          axios.get(`http://localhost:5000/api/farmers/${request.farmerPhone}`)
            .then((farmerRes) => {
              // Store the farmer details for each request
              setFarmerDetails(prevDetails => ({
                ...prevDetails,
                [request._id]: farmerRes.data,  // Store farmer details with request ID as key
              }));
            })
            .catch((err) => {
              console.error('Error fetching farmer details:', err);
            });
        });
      })
      .catch((err) => {
        console.error('Error fetching buyer requests:', err);
      });
  }, [buyer]);

  if (!buyer) return <p>Please log in as a buyer.</p>;

  return (
    <div>
      <Navbar role="buyer" />
      <div className="home-container">
        <h3>Bought Products</h3>
        <div className="card-container">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div className="card" key={r._id}>
                <h4>{r.productName}</h4>
                <p><strong>Farmer Name:</strong> {farmerDetails[r._id]?.farmName || 'Loading...'}</p>
                <p><strong>Farmer Phone:</strong> {farmerDetails[r._id]?.phone || 'Loading...'}</p>
                <p><strong>Farmer Email:</strong> {farmerDetails[r._id]?.email || 'Loading...'}</p>
                <p><strong>Location:</strong> {farmerDetails[r._id]?.location || 'Loading...'}</p>
                <p><strong>Sold At:</strong> {new Date(r.updatedAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No bought products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
