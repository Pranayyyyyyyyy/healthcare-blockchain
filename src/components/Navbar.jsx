import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">HealthChain</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/patient"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600"
            >
              Patient Portal
            </Link>
            <Link
              to="/hospital"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              Hospital Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
