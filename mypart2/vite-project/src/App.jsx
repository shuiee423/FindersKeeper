import React, { useState } from 'react';
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

  const [registeredUsers, setRegisteredUsers] = useState([]);

  const [posts, setPosts] = useState([]);
  const addPost = (newPost) => { 
    setPosts((prev) => [...prev, newPost]);
  };
  const [selectedPost, setSelectedPost] = useState(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [userNickname, setUserNickname] = useState('');

  const [userSchoolId, setUserSchoolId] = useState('');
  
  const [claims, setClaims] = useState([]);
  const addClaim = (newClaim) => {
    setClaims((prev) => [...prev, newClaim]); };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="App">
        {currentPage === 'login' && (
          <SignupLogin
            onNavigate={setCurrentPage}
            setUserType={setUserType}
            setUserNickname={setUserNickname}
            setUserSchoolId={setUserSchoolId}
            registeredUsers={registeredUsers}
            setRegisteredUsers={setRegisteredUsers}
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
          <Search onNavigate={setCurrentPage} posts={posts} 
          setSearchKeyword={setSearchKeyword} setFilteredPosts={setFilteredPosts}/>
        )}

        {currentPage === 'results' && (
          <Results onNavigate={setCurrentPage} keyword={searchKeyword}
          filteredPosts={filteredPosts} posts={posts} setSelectedPost={setSelectedPost} />
        )}

        {currentPage === 'viewPost' && (
          <ViewPost onNavigate={setCurrentPage} post={selectedPost} 
          userType={userType} setSelectedPost={setSelectedPost}/>
        )}

        {currentPage === 'verification' && (
          <VerificationForm onNavigate={setCurrentPage} onClaimSubmit={addClaim}
          post={selectedPost} userSchoolId={userSchoolId}/>
        )}

        {currentPage === 'confirmation' && (
          <Confirmation onNavigate={setCurrentPage} />
        )}

        {currentPage === 'post' && (
          <Post onNavigate={setCurrentPage} userSchoolId={userSchoolId} posts={posts} />
        )}

        {currentPage === 'claimRequest' && (
          <ClaimRequest onNavigate={setCurrentPage} claims={claims} userType={userType} 
          posts={posts} userSchoolId={userSchoolId} />
        )}

        {currentPage === 'notifications' && (
          <Notifications
            onNavigate={setCurrentPage}
            claims={claims}
            userSchoolId={userSchoolId}
          />
        )}

        {currentPage === 'reclaimRequest' && (
          <ReclaimRequest onNavigate={setCurrentPage} claims={claims} posts={posts}
          userType={userType}/>
        )}      

      </div>
    </div>
  );
}

export default App;