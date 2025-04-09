import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Login() {
  return (
    <div className="app-container">
      <div className="card">
        <h2>Login</h2>
        <form>
          <input type="numbers" placeholder="School ID" required />
          <input type="email" placeholder="Email Account" required />
          <button type="submit">Login</button>

          <div className="divider">
            <h1>or</h1>
          </div>

          <div className="signup">
            <h2>Don't have an account?</h2>
            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
