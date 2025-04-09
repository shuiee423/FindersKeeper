// src/SignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function SignUp() {
  return (
    <div className="app-container">
      <div className="card">
        <h2>Sign Up</h2>
        <form>
          <input type="numbers" placeholder="School ID" required />
          <input type="email" placeholder="Email Account" required />
          <input type="text" placeholder="Nickname" required />
          <button type="submit">Create Account</button>

          <div className="divider">
            <h1>or</h1>
          </div>

          <div className="signup">
            <h2>Already have an account?</h2>
            <Link to="/">
              <button type="button">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;