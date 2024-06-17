import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormButton from './components/FormButton';
import FormPage from './components/FormPage';
import RefreshButton from './components/RefreshButton';
import OnlineExcel from './components/OnlineExcel';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">Dynamic Forms</h1>
          <div className="flex space-x-4 mb-4">
            <FormButton formType="A" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" />
            <FormButton formType="B" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" />
            <OnlineExcel />
          </div>
          <Routes>
            <Route path="/form/:formType" element={<FormPage />} />
          </Routes>
          <RefreshButton />
        </div>
      </div>
    </Router>
  );
};

export default App;
