import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FormPage = () => {
  const { formType } = useParams();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    setName(storedData.name || "");
    setCountryCode(storedData.countryCode || "");
    setPhoneNumber(storedData.phoneNumber || "");
  }, []);

  const countryCodes = [
    "+1",
    "+91",
    "+44",
    "+81",
    "+86",
    "+61",
    "+33",
    "+49",
    "+7",
    "+39",
    "+34",
  ];

  const validateForm = () => {
    let formErrors = {};
    if (!name.trim()) {
      formErrors.name = "Name is required";
    } else if (!name.match(/^[A-Za-z]+$/)) {
      formErrors.name = "Name must contain only alphabetic characters";
    }

    if (!countryCode) {
      formErrors.countryCode = "Country Code is required";
    } else if (!countryCodes.includes(countryCode)) {
      formErrors.countryCode = "Invalid country code";
    }

    if (!phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone Number is required";
    } else if (!phoneNumber.match(/^[0-9]{10}$/)) {
      formErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      localStorage.setItem(
        "formData",
        JSON.stringify({ name, countryCode, phoneNumber })
      );
      axios
        .post(`${process.env.REACT_APP_SERVER_LINK}/submit`, {
          formType,
          name,
          countryCode,
          phoneNumber,
        })
        .then((response) => {
          console.log(response.data);
          setShowSuccessAlert(true);
          setName("");
          setCountryCode("");
          setPhoneNumber("");
        })
        .catch((error) => {
          console.log("There was an error submitting the form!", error);
          setShowErrorAlert(true);
        });
    } else {
      setShowErrorAlert(true);
    }
  };

  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const closeErrorAlert = () => {
    setShowErrorAlert(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Form {formType}</h1>

      {showSuccessAlert && (
        <div
          className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Form submitted successfully!</strong>
          <span className="block sm:inline">
            {" "}
            Your data has been submitted successfully.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={closeSuccessAlert}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.35 14.35a1 1 0 0 1-1.41 0L10 11.41l-2.94 2.94a1 1 0 1 1-1.41-1.41L8.59 10 5.65 7.06a1 1 0 0 1 1.41-1.41L10 8.59l2.94-2.94a1 1 0 0 1 1.41 1.41L11.41 10l2.94 2.94a1 1 0 0 1 0 1.41z" />
            </svg>
          </span>
        </div>
      )}

      {showErrorAlert && (
        <div
          className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Form submission failed!</strong>
          <span className="block sm:inline">
            {" "}
            Please correct the following errors:
          </span>
          <ul className="list-disc ml-5 mt-2">
            {errors.name && <li className="text-sm">{errors.name}</li>}
            {errors.countryCode && (
              <li className="text-sm">{errors.countryCode}</li>
            )}
            {errors.phoneNumber && (
              <li className="text-sm">{errors.phoneNumber}</li>
            )}
          </ul>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={closeErrorAlert}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.35 14.35a1 1 0 0 1-1.41 0L10 11.41l-2.94 2.94a1 1 0 1 1-1.41-1.41L8.59 10 5.65 7.06a1 1 0 0 1 1.41-1.41L10 8.59l2.94-2.94a1 1 0 0 1 1.41 1.41L11.41 10l2.94 2.94a1 1 0 0 1 0 1.41z" />
            </svg>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country Code:
          </label>
          <select
            className={`w-full px-3 py-2 border rounded ${
              errors.countryCode ? "border-red-500" : "border-gray-300"
            }`}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select</option>
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          {errors.countryCode && (
            <p className="text-red-500 text-xs mt-1">{errors.countryCode}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            className={`w-full px-3 py-2 border rounded ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
