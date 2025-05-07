import React from 'react';

function ReclaimRequest({ onNavigate, claims }) {
  // Group claims by post timestamp
  const groupedClaims = {};
  claims.forEach((claim) => {
    const postId = claim.timestamp; // Assuming post timestamp is unique
    if (!groupedClaims[postId]) {
      groupedClaims[postId] = {
        postDetails: {
          image: claim.image,
          description: claim.description,
          tags: claim.tags,
          location: claim.location,
          timestamp: claim.timestamp,
        },
        claimList: [],
      };
    }
    groupedClaims[postId].claimList.push(claim);
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">Re-claim Requests</h2>
        <button
          onClick={() => onNavigate('home')}
          className="text-5xl font-extrabold text-gray-500 hover:text-yellow-600"
        >
          ×
        </button>
      </div>

      {Object.keys(groupedClaims).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No re-claim requests yet.</p>
      ) : (
        Object.entries(groupedClaims).map(([postId, { postDetails, claimList }], index) => (
          <div
            key={index}
            className="mb-10 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-700 p-4"
          >
            {/* === Shared Post Section === */}
            <div className="border border-blue-200 p-4 rounded bg-white dark:bg-gray-800 mb-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">Item Details</h3>
              {postDetails.image ? (
                <img
                  src={postDetails.image}
                  alt="Item"
                  className="w-full max-h-60 object-contain rounded mb-3"
                />
              ) : (
                <div className="w-full h-60 flex items-center justify-center bg-gray-200 rounded mb-3">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <p className="text-gray-800 dark:text-white mb-2">{postDetails.description}</p>
              {postDetails.tags && (
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-300 mb-1">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {postDetails.tags.split(',').map((tag, tagIndex) => (
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
                Location: {postDetails.location || 'Not specified'}
              </p>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(postDetails.timestamp).toLocaleString()}
              </p>
            </div>

            {/* === Claims per Post === */}
            {claimList.map((claim, idx) => (
              <div
                key={idx}
                className="mb-8 border border-yellow-400 p-4 rounded bg-white dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-2">
                  Claim Verification
                </h3>
                <p><strong>ID:</strong> {claim.schoolId}</p>
                <p><strong>Name:</strong> {claim.fullName}</p>
                <p><strong>Department:</strong> {claim.department}</p>
                <p><strong>Phone:</strong> {claim.phone}</p>
                <p className="mt-2"><strong>Proof:</strong> {claim.proofDesc}</p>

                {claim.proofImage ? (
                  <img
                    src={claim.proofImage}
                    alt="Proof"
                    className="w-full h-60 mt-3 object-contain rounded"
                  />
                ) : (
                  <div className="w-full h-60 flex items-center justify-center bg-gray-200 rounded mt-3">
                    <span className="text-gray-500">No Proof Image</span>
                  </div>
                )}

                <div className="mt-6 flex justify-center gap-6">
                  <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Accept
                  </button>
                  <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default ReclaimRequest;