import React, { useState } from 'react';

function Search({ onNavigate, posts, setSearchKeyword, setFilteredPosts }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamically extract all tags from the posts
  const tagOptions = [...new Set(posts.flatMap(post => post.tags || []))];

  // Trigger search logic
  const handleSearch = (term) => {
    setSearchKeyword(term);
    const matched = posts.filter(post =>
      (post.tags || []).some(tag =>
        tag.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredPosts(matched);
    onNavigate('results');
  };

  return (
    <div className="h-screen p-14 bg-white dark:bg-gray-800">
      <button
        title="Cancel"
        className="flex ml-auto text-gray-500 hover:text-yellow-600 text-5xl font-bold"
        onClick={() => onNavigate('home')}
      >
        ×
      </button>

      <h1 className="text-3xl font-bold p-5 text-blue-600 dark:text-blue-300 text-center">
        Search Items
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-3xl dark:bg-gray-700 dark:text-white"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(searchTerm);
          }}
        />
        <button
          className="px-4 py-2 bg-blue-200 hover:bg-blue-300 text-blue-700 rounded-3xl"
          onClick={() => handleSearch(searchTerm)}
        >
          Search
        </button>
      </div>

      <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-300 mt-10 mb-2">
        Browse by Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {tagOptions.length > 0 ? (
          tagOptions.map((tag, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm bg-yellow-200 text-yellow-700 rounded-full hover:bg-blue-200"
              onClick={() => handleSearch(tag)}
            >
              {tag}
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No tags available yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;