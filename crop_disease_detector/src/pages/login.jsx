import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;