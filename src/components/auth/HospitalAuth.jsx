import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalAuth = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospitalName: '',
    registrationNumber: '',
    phoneNumber: '',
    address: '',
    website: '',
    specialties: '',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Image and Info */}
        <div className="lg:w-1/2 bg-blue-700 text-white p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              {mode === 'login' ? 'Hospital Portal' : 'Register Your Hospital'}
            </h2>
            <p className="text-xl mb-8">
              {mode === 'login'
                ? 'Access your hospital management system with blockchain security.'
                : 'Join our network of healthcare providers with advanced blockchain technology.'}
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Patient Data Management</span>
              </div>
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Streamlined Collaboration</span>
              </div>
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Digital Record Management</span>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
            <div className="w-64 h-64 rounded-full bg-blue-600 opacity-20"></div>
          </div>
          <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
            <div className="w-64 h-64 rounded-full bg-blue-600 opacity-20"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Hospital Sign In' : 'Register Hospital'}
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                {mode === 'login' ? (
                  <>
                    Need to register your hospital?{' '}
                    <button
                      onClick={() => navigate('/hospital/signup')}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{' '}
                    <button
                      onClick={() => navigate('/hospital/login')}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div>
                      <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="hospitalName"
                          name="hospitalName"
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                          placeholder="Enter hospital name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="registrationNumber"
                          name="registrationNumber"
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                          placeholder="Enter registration number"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                      placeholder="Enter hospital email"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                      placeholder="Enter password"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                          placeholder="Enter contact number"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                          placeholder="Enter hospital address"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <div className="mt-1">
                        <input
                          id="website"
                          name="website"
                          type="url"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                          placeholder="Enter hospital website"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-1">
                        Specialties
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="specialties"
                          name="specialties"
                          rows={3}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 placeholder-gray-400 bg-gray-50"
                          placeholder="List hospital specialties (e.g., Cardiology, Neurology)"
                          onChange={handleChange}
                        />
                      </div>
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {mode === 'login' ? 'Sign in' : 'Register Hospital'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAuth;
