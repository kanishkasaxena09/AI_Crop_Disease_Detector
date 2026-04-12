// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-primary tracking-tighter">
          CROP<span className="text-secondary">AI</span>
        </Link>

        <div className="hidden md:flex space-x-8 font-semibold text-gray-700">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/scan" className="hover:text-primary transition">Scan</Link>
          <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
        </div>

        <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;