import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientAuth = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement blockchain authentication
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-500 to-indigo-700 p-12 text-white flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8">
            {mode === 'login' ? 'Welcome Back!' : 'Join Our Healthcare Platform'}
          </h2>
          <p className="text-lg mb-8">
            {mode === 'login'
              ? 'Access your medical records securely with blockchain technology.'
              : 'Register to start managing your healthcare journey with advanced blockchain security.'}
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Secure Blockchain Technology</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <span>Access Anywhere, Anytime</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span>Complete Data Privacy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/patient/signup')}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-500 transition-colors duration-200 font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/patient/login')}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-500 transition-colors duration-200 font-medium"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <div className="text-left">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className="text-left">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <div className="text-left">
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                    </div>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 bg-gray-50"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div className="text-left">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                      placeholder="Enter your phone number"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div className="text-left">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                      placeholder="Enter your address"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {mode === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientAuth;
