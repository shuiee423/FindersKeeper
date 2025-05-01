import React from 'react';

function ClaimRequest({ onNavigate, claims, userType, userSchoolId }) {
  const isAdmin = userType === 'admin';

  // Filter claims based on user type and schoolId
  const visibleClaims = isAdmin
    ? claims
    : claims.filter((claim) => claim.schoolId === userSchoolId);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
          {isAdmin ? 'Claim Requests (Admin View)' : 'Your Claim Requests'}
        </h2>
        <button
          onClick={() => onNavigate('home')}
          className="text-5xl font-extrabold text-gray-500 hover:text-yellow-600"
        >
          ×
        </button>
      </div>

      {visibleClaims.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          {isAdmin
            ? 'No claim requests submitted yet.'
            : 'You haven’t submitted any claim requests yet.'}
        </p>
      ) : (
        visibleClaims.map((claim, index) => {
          const matchedPost = claim.post;

          return (
            <div key={index} className="mb-10 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-700 p-4">
              {/* === STATUS LABEL === */}
              <div className="mb-4">
                <span className="px-4 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-full">
                  Status: {claim.status || 'Pending'}
                </span>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                {/* ===== Post Section ===== */}
                <div className="w-full lg:w-1/2 border border-blue-200 p-4 rounded bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">
                    Item Details
                  </h3>
                  {matchedPost?.image ? (
                    <img
                      src={matchedPost.image}
                      alt="Item"
                      className="w-full h-60 rounded mb-3 object-contain"
                    />
                  ) : (
                    <div className="w-96 h-52 mt-9 ml-12 mb-4 flex justify-center bg-gray-200 dark:bg-gray-600 rounded-xl">
                      <p className="text-gray-500 text-md my-auto italic">No proof image submitted</p>
                    </div>
                  )}
                  <p className="font-semibold text-gray-800 dark:text-white mb-2">{matchedPost?.description}</p>
                  {matchedPost?.tags && matchedPost.tags.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-300 mb-1">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchedPost.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Location: {matchedPost?.location || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Posted on: {new Date(matchedPost?.timestamp).toLocaleString()}
                  </p>
                </div>

                {/* ===== Form Section ===== */}
                <div className="w-full lg:w-1/2 border border-yellow-400 p-4 rounded bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-2">
                    Claim Verification
                  </h3>
                  <p>
                    <strong>ID:</strong> {claim.schoolId}
                  </p>
                  <p>
                    <strong>Name:</strong> {claim.fullName}
                  </p>
                  <p>
                    <strong>Department:</strong> {claim.department}
                  </p>
                  <p>
                    <strong>Phone:</strong> {claim.phone}
                  </p>
                  <p className="mt-2">
                    <strong>Proof:</strong> {claim.proofDesc}
                  </p>

                  {/* ===== Proof Image or Placeholder ===== */}
                  {claim.proofImage ? (
                    <img
                      src={claim.proofImage}
                      alt="Proof"
                      className="w-full max-h-60 mt-3 object-contain rounded"
                    />
                  ) : (
                    <div className="w-96 h-52 mt-3 mx-14 flex justify-center bg-gray-200 dark:bg-gray-600 border-2 border-gray-300 rounded-xl">
                      <p className="text-gray-500 text-md my-auto italic">No proof image submitted</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ===== Admin Buttons ===== */}
              {isAdmin && (
                <div className="mt-6 flex justify-center gap-6">
                  <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Accept
                  </button>
                  <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default ClaimRequest;