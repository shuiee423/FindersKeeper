// Confirmation.jsx
import React from 'react';

function Confirmation({ onNavigate }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="p-6 bg-yellow-50 shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Processing Claim Request...
        </h2>
        <p className="text-gray-700 mb-6">
          Thank You!<br></br> Your claim request has been submitted and is under review by the admin.
          <br></br>Please check notifications for further updates on your request.
        </p>
        <button
          className="px-4 py-2 bg-blue-200 hover:bg-blue-300 text-blue-700 rounded-md"
          onClick={() => onNavigate('home')} >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default Confirmation;