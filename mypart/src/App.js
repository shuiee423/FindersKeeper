import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`body ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="site-name">Finders Keepers</div>
        <div className="header-buttons">
          <button onClick={toggleTheme}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={toggleMenu}>Menu</button>
        </div>
        {menuOpen && (
          <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>Posts</li>
              <li>Claim Request</li>
              <li>Notifications</li>
            </ul>
          </div>
        )}
      </header>

      <main className="main-content">
        <input
          type="text"
          placeholder="Search items..."
          className="search-bar"
        />
        <h2 className="section-label">Relevant Posts</h2>
        <div className="card-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="post-card">
              <p>Lost Item {i + 1}</p>
            </div>
          ))}
        </div>
        <div className="btn">
          <button>Create Post</button>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Finders Keepers. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;