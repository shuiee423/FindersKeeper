import React from 'react';

function ViewPost({ onNavigate, post, userType,setSelectedPost }) {
  console.log("Post received in ViewPost:", post);

  if (!post) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>No post selected.</p>
        <button
          onClick={() => onNavigate('home')}
          className="mt-4 px-4 py-2 bg-yellow-300 rounded-xl hover:bg-yellow-400 text-yellow-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-50 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
          View Item
        </h2>
        <button
          title="Back"
          className="mb-4 text-5xl font-bold text-gray-500 hover:text-yellow-600"
          onClick={() => onNavigate('home')}
        >
          ×
        </button>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="Item Preview"
          className="w-full max-h-72 object-contain rounded-lg mb-6"
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

      {userType === 'admin' && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-300 mb-1">
            Key Details (Private)
          </h4>
          <p className="text-gray-600 dark:text-gray-200 text-sm italic">
            {post.keyDetails || 'No private key details provided.'}
          </p>
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          Posted by: <span className="font-semibold">{post.nickname || 'Anonymous'}</span>
        </p>
        <p>
          Posted on: {new Date(post.timestamp).toLocaleString()}
        </p>
      </div>

      {userType !== 'admin' &&(
        <div className="mt-8 text-center">
          <button onClick={() => {setSelectedPost(post); onNavigate('verification')}}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 rounded-2xl" >
            Claim This Item
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewPost;