import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-800 mb-4">Sorry, we couldn't find this page.</p>
        <p className="text-md text-gray-600 mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
        <Link to="/">
          <button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
