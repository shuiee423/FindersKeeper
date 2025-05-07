import React from 'react';

function Results({ onNavigate, keyword, filteredPosts, posts, setSelectedPost }) {
  const groupByMonth = (items) => {
    const grouped = {};
    items.forEach((post) => {
      const month = new Date(post.timestamp).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(post);
    });
    return grouped;
  };

  const groupedResults = groupByMonth(filteredPosts);
  const groupedAllPosts = groupByMonth(posts);

  const hasResults = filteredPosts.length > 0;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
          Search Results
        </h2>
        <button
          title="Cancel"
          className="text-gray-500 hover:text-yellow-600 text-5xl font-bold"
          onClick={() => onNavigate('search')}
        >
          ×
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        Tag: <span className="font-semibold text-yellow-700">{keyword}</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Results: {filteredPosts.length} post{filteredPosts.length !== 1 && 's'}
      </p>

      {hasResults ? (
        Object.entries(groupedResults).map(([month, posts], index) => (
          <div key={index} className="mb-6">
            <h4 className="text-blue-500 dark:text-blue-300 font-semibold mb-2 border-b pb-1">
              {month}
            </h4>
            <div className="flex flex-wrap gap-4">
             {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="w-60 bg-gray-100 dark:bg-gray-700 border border-blue-300 rounded-md cursor-pointer hover:shadow-lg dark:hover:shadow-gray-600 hover:border-yellow-500 hover:border-2 overflow-hidden flex flex-col"
                  onClick={() => {
                    setSelectedPost(post);
                    onNavigate('viewPost');
                  }}
                >
                  {post.image ? (
                    <img
                      src={`http://localhost/fk-backend/${post.image}`}
                      alt="Post preview"
                      className="block mx-auto h-40 w-40 object-cover"
                    />
                  ) : (
                    <div className="block mx-auto h-40 w-40 flex items-center justify-center bg-gray-200 text-sm text-gray-500 italic">
                      No Image
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-sm text-blue-800 dark:text-white truncate">
                      {post.description?.split('\n')[0] || 'Untitled Post'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <>
          <p className="text-sm italic text-gray-400 dark:text-gray-500 mb-6">
            No posts found matching your search.
          </p>

          <hr className="my-6 border-gray-400" />
          <h3 className="text-lg font-semibold text-blue-500 mb-3">
            Other Available Posts
          </h3>

          {Object.entries(groupedAllPosts).map(([month, posts], index) => (
            <div key={index} className="mb-6">
              <h4 className="text-blue-400 dark:text-blue-200 font-semibold mb-2 border-b pb-1">
                {month}
              </h4>
              <div className="flex flex-wrap gap-4">
                {posts.map((post, idx) => (
                  <div
                    key={idx}
                    className="w-[200px] h-[230px] bg-gray-100 dark:bg-gray-700 border border-blue-300 rounded-md p-2 flex items-end cursor-pointer hover:shadow-lg dark:hover:shadow-gray-600 hover:border-yellow-500 hover:border-2"
                    onClick={() => {setSelectedPost(post); onNavigate('viewPost')}}
                  >
                    <p className="text-sm text-blue-800 dark:text-white truncate">
                      {post.description?.split('\n')[0] || 'Untitled Post'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Results;