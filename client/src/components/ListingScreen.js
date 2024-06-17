import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingScreen = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_LINK}/forms`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Listing Screen</h1>
      <ul className="divide-y divide-gray-300">
        {formData.map((form, index) => (
          <li key={index} className="py-4">
            <div>
              <strong className="text-gray-800">Name:</strong> {form.name}<br />
              <strong className="text-gray-800">Country Code:</strong> {form.countryCode}<br />
              <strong className="text-gray-800">Phone Number:</strong> {form.phoneNumber}<br />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingScreen;
