import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RefreshButton = () => {
  const [formData, setFormData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  const handleRefresh = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/sync-to-sheets`);
      console.log('Response from server:', response.data);
      setAlertMessage('Data synced to Google Sheets successfully!');
      setAlertType('success');
      setShowAlert(true);
    } catch (error) {
      console.error('Error syncing data to Google Sheets:', error);
      setAlertMessage('Error syncing data to Google Sheets');
      setAlertType('error');
      setShowAlert(true);
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('formData');
    setFormData(null);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-lg text-center mt-8">
      {showAlert && (
        <div className={`bg-${alertType === 'success' ? 'green' : 'red'}-100 border border-${alertType === 'success' ? 'green' : 'red'}-400 text-${alertType === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative mb-4`} role="alert">
          <strong className="font-bold">{alertType === 'success' ? 'Success!' : 'Error!'}</strong>
          <span className="block sm:inline"> {alertMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeAlert}>
            <svg className={`fill-current h-6 w-6 text-${alertType === 'success' ? 'green' : 'red'}-500`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.35 14.35a1 1 0 0 1-1.41 0L10 11.41l-2.94 2.94a1 1 0 1 1-1.41-1.41L8.59 10 5.65 7.06a1 1 0 0 1 1.41-1.41L10 8.59l2.94-2.94a1 1 0 0 1 1.41 1.41L11.41 10l2.94 2.94a1 1 0 0 1 0 1.41z"/></svg>
          </span>
        </div>
      )}

      {formData ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">List of Last Form Data</h1>
          <p className="text-lg mb-2">Name: {formData.name}</p>
          <p className="text-lg mb-2">Country Code: {formData.countryCode}</p>
          <p className="text-lg mb-4">Phone Number: {formData.phoneNumber}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleRefresh}
          >
            Refresh Google Sheets
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearLocalStorage}
          >
            Clear Local Storage
          </button>
        </div>
      ) : (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleRefresh}
          >
            Refresh Google Sheets
          </button>
        </div>
      )}
    </div>
  );
};

export default RefreshButton;
