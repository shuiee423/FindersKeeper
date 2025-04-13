import React, { useState } from 'react';

const Login = () => {
  const [isLoginMode, setLoginMode] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-200">
      <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
        {/* Header Title */}
        <div className="flex justify-center mb-4">
          <h2 className="text-3xl font-semibold text-center">
            {isLoginMode ? "Login" : "Sign Up"}
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
          <button
            onClick={() => setLoginMode(true)}
            className={`w-1/2 text-lg font-medium z-10 transition-all ${
              isLoginMode ? "text-white" : "text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setLoginMode(false)}
            className={`w-1/2 text-lg font-medium z-10 transition-all ${
              !isLoginMode ? "text-white" : "text-black"
            }`}
          >
            Sign Up
          </button>
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 transition-all duration-300 ${
              isLoginMode ? "left-0" : "left-1/2"
            }`}
          ></div>
        </div>

        {/* Form Section */}
        <form className="space-y-4">
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Nickname"
              required
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
            />
          )}
          <input
            type="text"
            placeholder="School ID"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-400 text-white rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-gray-600">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setLoginMode(!isLoginMode)}
              className="text-cyan-600 hover:underline"
            >
              {isLoginMode ? "SignUp now" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
