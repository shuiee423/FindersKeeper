import React, { useState, useEffect } from 'react';

function Home({ onNavigate, userType, darkMode, setDarkMode, setSelectedPost, nickname }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/your-backend-folder/post.php') // Update to match your actual PHP path
      .then(res => res.json())
      .then(data => setFetchedPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
        <header className="flex justify-between items-center bg-blue-400 p-5 text-blue-100">
        <div className="flex items-start">
        <img className="size-14" src="/src/FKlogo.png" alt="Logo" />
        <h2 className="text-3xl mx-5 mt-3 font-bold">Finders Keepers</h2>
        </div>
        <div className="flex gap-2">
          <button
            title="Switch to Dark Mode"
            className="text-5xl px-3 rounded-xl border border-yellow-500 bg-blue-200 text-blue-700 hover:bg-blue-300"
            onClick={() => setDarkMode(prev => !prev)} >
            {darkMode ? '◐' : '◑'}
          </button>
          <button
            className="text-4xl px-4 rounded-xl border border-yellow-500 bg-blue-200 text-blue-700 hover:bg-blue-300"
            title="Menu"
            onClick={toggleMenu} >
            ≡
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className={`fixed top-0 right-0 h-screen w-52 bg-blue-200 z-50 transform transition-transform duration-700 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full' }`}>
        <div className="flex justify-end">
          <button
            className="text-4xl px-4 py-1 mr-4 mt-5 border border-yellow-500 bg-blue-300 text-blue-700 hover:bg-blue-100 rounded-xl"
            title="Close Menu"
            onClick={() => setMenuOpen(false)}>
            ≡
          </button>
        </div>

        <div className="text-center px-2 py-10">
          <div className="text-7xl font-bold">
          👤
          </div>
          <p className="text-yellow-700 font-semibold text-lg mt-2">Hi, {nickname}!</p>
        </div>

        <ul className="divide-y divide-yellow-500 text-sm">
          <li
            className="text-black p-3 hover:bg-blue-300 cursor-pointer"
            onClick={() => onNavigate('post')} >            
            Posts
          </li>
          <li
            className="text-black p-3 hover:bg-blue-300 cursor-pointer"
            onClick={() => onNavigate('claimRequest')} >
            Claim Request
          </li>
          {userType === 'user' ? (
            <li
              className="text-black p-3 hover:bg-blue-300 cursor-pointer"
              onClick={() => onNavigate('notifications')} >
              Notifications
            </li>
          ) : (
            <li
              className="text-black p-3 hover:bg-blue-300 cursor-pointer"
              onClick={() => onNavigate('reclaimRequest')} >
              Re-claimed Requests
            </li>
          )}
          <li
            className="text-black p-3 hover:bg-blue-300 cursor-pointer"
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                onNavigate('login');
              } }}>
            Logout
          </li>
        </ul>
      </div>

      {/* ===== Main Content ===== */}
      <main className="p-8">
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for items..."
            readOnly 
            onClick={() => onNavigate('search')}
            className="w-full max-w-xl px-4 py-2 bg-white dark:bg-gray-800 border border-yellow-500 rounded-3xl"
          />
        </div>

        <h3 className="text-2xl font-bold text-blue-600 border-b border-gray-400 pb-1 mb-4">Relevant Posts</h3>

        <div className="flex flex-wrap gap-4 justify-start mt-6">
          {fetchedPosts.length > 0 ? (
            fetchedPosts.map((post, index) => (
              <div
                key={index}
                className="w-64 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg border-2 dark:border-gray-800 hover:border-yellow-500 transition cursor-pointer"
                onClick={() => {
                  setSelectedPost(post);
                  onNavigate('viewPost'); 
                }}
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="block mx-auto w-40 h-40 object-cover"
                  />
                )}
                <div className="p-3">
                  <h3 className="text-lg font-semibold text-blue-400 dark:text-blue-300 truncate">
                    {post.description?.split('\n')[0] || 'Untitled Post'}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No posts yet.</p>
          )}
        </div>

        <div className="mt-20">
          <button
            className="text-2xl size-16 bg-yellow-400 text-yellow-700 rounded-full hover:border-blue-500 border-2"
            onClick={() => onNavigate('createPost')}
          >
            +
          </button>
        </div>
      </main>

      <footer className="bg-blue-400 text-center text-white p-8">
        <p>Finders Keepers &copy; 2025 | All Rights Reserved </p>
      </footer>
    </div>
  );
}

export default Home;