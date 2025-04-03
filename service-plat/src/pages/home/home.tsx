import { useState } from 'react';

function FreelancePlatform() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [userRole, setUserRole] = useState('freelancer'); // Default role
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic (replace with actual API call)
    setIsLoggedIn(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup logic (replace with actual API call)
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h1>
        <p>You are logged in as a {userRole}.</p>
        {/* Add dashboard content here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">
        {isSignup ? 'Sign Up' : 'Login'}
      </h1>

      <div className="mb-4">
        <label className="mr-2">
          <input
            type="radio"
            value="freelancer"
            checked={userRole === 'freelancer'}
            onChange={() => setUserRole('freelancer')}
          />
          Freelancer
        </label>
        <label>
          <input
            type="radio"
            value="business"
            checked={userRole === 'business'}
            onChange={() => setUserRole('business')}
          />
          Business
        </label>
      </div>

      <form
        onSubmit={isSignup ? handleSignup : handleLogin}
        className="w-full max-w-sm"
      >
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        {isSignup && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p className="mt-4">
        {isSignup ? (
          <span onClick={() => setIsSignup(false)} className="text-blue-500 cursor-pointer">
            Already have an account? Login
          </span>
        ) : (
          <span onClick={() => setIsSignup(true)} className="text-blue-500 cursor-pointer">
            New to the platform? Sign up
          </span>
        )}
      </p>
    </div>
  );
}

export default FreelancePlatform;