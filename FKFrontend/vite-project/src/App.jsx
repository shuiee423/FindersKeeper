import React, { useState, useEffect } from 'react';
import SignupLogin from './SignupLogin';
import Home from './Home';
import CreatePost from './CreatePost';
import Search from './Search';
import Results from './Results';
import ViewPost from './ViewPost';
import VerificationForm from './VerificationForm';
import Confirmation from './Confirmation';
import Post from './Post';
import ClaimRequest from './ClaimRequest';
import Notifications from './Notifications';
import ReclaimRequest from './ReclaimRequest';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userType, setUserType] = useState('user');
  const [darkMode, setDarkMode] = useState(false);

  const [posts, setPosts] = useState([]);
  const [claims, setClaims] = useState([]);

  const [userNickname, setUserNickname] = useState('');
  const [userSchoolId, setUserSchoolId] = useState('');

  const [selectedPost, setSelectedPost] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // === Load Posts from PHP ===
  useEffect(() => {
    fetch("http://localhost/fksystem/post.php")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // === Load Claims from PHP ===
  useEffect(() => {
    fetch("http://localhost/fksystem/claim.php")
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error("Error fetching claims:", err));
  }, []);

  // === Add Post to PHP ===
  const addPost = (newPost) => {
    const formData = new FormData();
    for (const key in newPost) {
      if (key === 'tags') {
        formData.append('tags', JSON.stringify(newPost[key]));
      } else if (key === 'image' && typeof newPost[key] !== 'string') {
        formData.append('image', newPost[key]);
      } else {
        formData.append(key, newPost[key]);
      }
    }

    fetch("http://localhost/fksystem/post.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setPosts((prev) => [...prev, data]))
      .catch((err) => console.error("Failed to add post:", err));
  };

  // === Add Claim to PHP ===
  const addClaim = (newClaim) => {
    const formData = new FormData();
    for (const key in newClaim) {
      if (key === 'post') {
        formData.append('post', JSON.stringify(newClaim[key]));
      } else if (key === 'proofImage' && typeof newClaim[key] !== 'string') {
        formData.append('proofImage', newClaim[key]);
      } else {
        formData.append(key, newClaim[key]);
      }
    }

    fetch("http://localhost/fksystem/claim.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setClaims((prev) => [...prev, data]))
      .catch((err) => console.error("Failed to add claim:", err));
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="App">
        {currentPage === 'login' && (
          <SignupLogin
            onNavigate={setCurrentPage}
            setUserType={setUserType}
            setUserNickname={setUserNickname}
            setUserSchoolId={setUserSchoolId}
          />
        )}

        {currentPage === 'home' && (
          <Home
            onNavigate={setCurrentPage}
            userType={userType}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            posts={posts}
            setSelectedPost={setSelectedPost}
            nickname={userNickname}
          />
        )}

        {currentPage === 'createPost' && (
          <CreatePost
            onNavigate={setCurrentPage}
            onPostSubmit={addPost}
            nickname={userNickname}
            schoolId={userSchoolId}
          />
        )}

        {currentPage === 'search' && (
          <Search
            onNavigate={setCurrentPage}
            posts={posts}
            setSearchKeyword={setSearchKeyword}
            setFilteredPosts={setFilteredPosts}
          />
        )}

        {currentPage === 'results' && (
          <Results
            onNavigate={setCurrentPage}
            keyword={searchKeyword}
            filteredPosts={filteredPosts}
            posts={posts}
            setSelectedPost={setSelectedPost}
          />
        )}

        {currentPage === 'viewPost' && (
          <ViewPost
            onNavigate={setCurrentPage}
            post={selectedPost}
            userType={userType}
            setSelectedPost={setSelectedPost}
          />
        )}

        {currentPage === 'verification' && (
          <VerificationForm
            onNavigate={setCurrentPage}
            onClaimSubmit={addClaim}
            post={selectedPost}
            userSchoolId={userSchoolId}
          />
        )}

        {currentPage === 'confirmation' && (
          <Confirmation onNavigate={setCurrentPage} />
        )}

        {currentPage === 'post' && (
          <Post
            onNavigate={setCurrentPage}
            userSchoolId={userSchoolId}
            posts={posts}
          />
        )}

        {currentPage === 'claimRequest' && (
          <ClaimRequest
            onNavigate={setCurrentPage}
            claims={claims}
            userType={userType}
            posts={posts}
            userSchoolId={userSchoolId}
          />
        )}

        {currentPage === 'notifications' && (
          <Notifications
            onNavigate={setCurrentPage}
            claims={claims}
            userSchoolId={userSchoolId}
          />
        )}

        {currentPage === 'reclaimRequest' && (
          <ReclaimRequest
            onNavigate={setCurrentPage}
            claims={claims}
            posts={posts}
            userType={userType}
          />
        )}
      </div>
    </div>
  );
}

export default App;