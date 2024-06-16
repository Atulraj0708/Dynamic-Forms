import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormButton = ({ formType, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/form/${formType}`);
  };

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={handleClick}
    >
      Form {formType}
    </button>
  );
};

export default FormButton;
