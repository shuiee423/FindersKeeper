import React from 'react';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Routes, Link, HashRouter } from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;