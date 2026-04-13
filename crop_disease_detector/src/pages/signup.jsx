import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Signup = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Saari jankari bharna zaruri hai lala!");
      return;
    }

    // Signup ke baad seedha Home par
    setIsLoggedIn(true);
    navigate('/home');
  };

  return (
    <PageTransition>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 animate-page-in">
        <h2 className="text-3xl font-black text-gray-800 mb-2 italic">Signup</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Naya account banayein</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" 
            placeholder="Poora Naam" 
            required
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password Set Karein" 
            required
            className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary/20 transition font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            type="submit"
            className="w-full bg-secondary text-white py-4 mt-4 rounded-2xl font-black text-lg shadow-lg shadow-secondary/30 hover:bg-opacity-90 active:scale-95 transition"
          >
            Account Banayein
          </button>
        </form>
      </div>
    </div>
    </PageTransition>
  );
};

export default Signup;