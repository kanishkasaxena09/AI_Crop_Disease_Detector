import React from 'react';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <button className="w-full bg-secondary text-white py-2 rounded-lg font-semibold">
          Register
        </button>
      </div>
    </div>
  );
};

export default Signup;