import React from 'react';

function Notifications({ onNavigate, claims, userSchoolId }) {
  // Filter only accepted claims (for now, simulate with a placeholder `status`)
  const acceptedClaims = claims.filter(
    (claim) => claim.schoolId === userSchoolId && claim.status === 'accepted'
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
          Notifications
        </h2>
        <button
          onClick={() => onNavigate('home')}
          className="text-5xl font-extrabold text-gray-500 hover:text-yellow-600"
          title="Close"
        >
          ×
        </button>
      </div>

      {acceptedClaims.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No notifications at the moment.
        </p>
      ) : (
        acceptedClaims.map((claim, index) => (
          <div
            key={index}
            className="border border-green-400 bg-green-50 dark:bg-gray-700 p-5 rounded-lg text-green-700 dark:text-green-300"
          >
            <h3 className="text-lg font-bold mb-2">Claim Request Approved!</h3>
            <p className="mb-2">
              You may now retrieve the item at:
              <br />
              <strong>Building 21 - Guard House</strong>
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              Please note that there is a chance another user may reclaim this item
              with stronger proof. Make sure to verify with security personnel.
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;