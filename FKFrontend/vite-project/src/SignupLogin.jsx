import React, { useState } from 'react';

function SignupLogin({
  onNavigate,
  setUserType,
  setUserNickname,
  setUserSchoolId,
  registeredUsers,
  setRegisteredUsers,
}) {
  const [isSignup, setIsSignup] = useState(false);
  const [nickname, setNickname] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin shortcut
    if (schoolId === 'a' && email === 'a@edu.com') {
      setUserType('admin');
      setUserNickname('Admin');
      onNavigate('home');
      return;
    }

    if (isSignup) {
      const exists = registeredUsers.some((u) => u.schoolId === schoolId);
      if (exists) {
        alert('An account with this School ID already exists.');
        return;
      }

      // Register user
      setRegisteredUsers((prev) => [...prev, { schoolId, nickname, email }]);
      alert('Account created successfully! Please log in.');
      setIsSignup(false);
      return;
    }

    // LOGIN mode
    const found = registeredUsers.find(
      (u) => u.schoolId === schoolId && u.email === email
    );

    if (!found) {
      alert('No account found. Please sign up first.');
      return;
    }

    // Log user in
    setUserType('user');
    setUserNickname(found.nickname);
    setUserSchoolId(found.schoolId);
    onNavigate('home');
  };

  return (
    <div className="bg-blue-100 h-screen flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 px-6 py-12">
      <div className="lg:w-1/2 m-10 ml-16 mt-20">
        <img className="size-60 ml-5" src="/src/FKlogo.png" alt="Logo" />
        <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-300 mt-5">
          Finders Keepers
        </h1>
        <i className="mt-2 text-yellow-600 lg:block">
          A Better Way To Return What's Lost.
        </i>
      </div>

      <div className="m-14 mr-12 w-full max-w-md bg-yellow-50 shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-20">
          {isSignup && (
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white"
              required
            />
          )}

          <input
            type="text"
            placeholder="School ID"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl dark:bg-gray-700 dark:text-white"
            required
          />

          <button
            type="submit"
            className="self-center bg-blue-300 hover:bg-blue-400 text-blue-700 w-36 py-2 rounded-2xl"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <i className="text-md text-gray-500 text-center mb-1 block">
          {isSignup
            ? 'Already have an account?'
            : "Don't have an account yet?"}
        </i>
        <button
          className="block mx-auto w-60 bg-yellow-300 hover:bg-yellow-400 text-yellow-700 py-2 rounded-2xl"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Go to Login' : 'Go to Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default SignupLogin;