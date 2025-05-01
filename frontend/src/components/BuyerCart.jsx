import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Home.css';

export default function BuyerCart() {
    const [requests, setRequests] = useState([]);
    const [farmerDetails, setFarmerDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const buyer = JSON.parse(localStorage.getItem('buyer'));

  useEffect(() => {
    if (!buyer) return;

    // Fetch buyer's requests with "Pending" status
    axios.get(`http://localhost:5000/api/requests/buyer/${buyer.phone}`)
      .then((res) => {
        const pendingRequests = res.data.filter(request => request.status === 'Accepted');
        setRequests(pendingRequests);

        // Fetch farmer details and product details for each request
        pendingRequests.forEach(request => {
          // Fetch farmer details based on farmerPhone
          axios.get(`http://localhost:5000/api/farmers/${request.farmerPhone}`)
            .then(farmerRes => {
              // Store the farmer details for each request
              setFarmerDetails(prevDetails => ({
                ...prevDetails,
                [request._id]: farmerRes.data  // Store farmer details with request ID as key
              }));
            })
            .catch(err => console.error('Error fetching farmer details:', err));

          // Fetch product details based on productId
          axios.get(`http://localhost:5000/api/products/${request.productId}`)
            .then(productRes => {
              // Store the product details for each request
              setProductDetails(prevDetails => ({
                ...prevDetails,
                [request._id]: productRes.data  // Store product details with request ID as key
              }));
            })
            .catch(err => console.error('Error fetching product details:', err));
        });
      })
      .catch((err) => console.error('Error fetching requests:', err));
  }, [buyer]);

  return (
    <div>
      <Navbar role="buyer" />
      <div className="home-container">
        <h3>Your Cart</h3>
        <div className="card-container">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div className="card" key={request._id}>
                <h4>Product: {request.productName}</h4>
                <p><strong>Farmer Name:</strong> {farmerDetails[request._id]?.farmName || 'Loading...'}</p>
                <p><strong>Farmer Phone:</strong> {farmerDetails[request._id]?.phone || 'Loading...'}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Quantity:</strong> {productDetails[request._id]?.quantity || 'Loading...'}</p>
                <p><strong>Price:</strong> {productDetails[request._id]?.price || 'Loading...'}</p>
                {productDetails[request._id]?.image && (
                  <img 
                    src={`http://localhost:5000/uploads/${productDetails[request._id].image}`} 
                    alt={productDetails[request._id].name} 
                    className="product-image"
                  />
                )}
                <p><strong>Contact the farmer to buy the product.</strong></p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
