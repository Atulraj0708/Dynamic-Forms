import React from 'react';

const OnlineExcel = () => {
  const handleOpenExcelSheet = () => {
    window.open('https://docs.google.com/spreadsheets/d/1m-Y5cAP89yTbvHe0Nw4C3t4KGbjDMxgdMMPEuMRhM5o/edit?pli=1&gid=0#gid=0', '_blank');
  };

  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleOpenExcelSheet}
    >
      Open Online Excel Sheet
    </button>
  );
};

export default OnlineExcel;
