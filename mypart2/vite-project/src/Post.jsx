import React from 'react';

function Post({ posts, userSchoolId, onNavigate }) {
  const userPosts = posts.filter((post) => post.schoolId === userSchoolId);

  return (
    <div className="max-w-3xl h-screen mx-auto p-6 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
          My Posts
        </h2>
        <button
          onClick={() => onNavigate('home')}
          className="text-5xl font-bold text-gray-500 hover:text-yellow-600"
        >
          ×
        </button>
      </div>

      {userPosts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">You haven’t posted anything yet.</p>
      ) : (
        userPosts.map((post, index) => (
          <div key={index} className="mb-6 p-4 rounded-lg border border-blue-300 bg-blue-50 dark:bg-gray-700">
            {post.image && (
              <img
                src={post.image}
                alt="Item"
                className="w-full max-h-60 object-contain rounded mb-4"
              />
            )}
            <p className="text-gray-800 dark:text-white text-lg mb-4">
              {post.description || 'No description provided.'}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-300 mb-1">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4 text-sm">
              <p className="text-blue-500 dark:text-blue-300 font-semibold">
                Location Found:
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                {post.location || 'Not specified'}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-300 mb-1">
                Key Details (Private)
              </h4>
              <p className="text-gray-600 dark:text-gray-200 text-sm italic">
                {post.keyDetails || 'No private key details provided.'}
              </p>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              Posted on: {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Post;