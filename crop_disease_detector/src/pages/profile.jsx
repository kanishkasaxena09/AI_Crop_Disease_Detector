import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = ({ setIsLoggedIn }) => {
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState(''); // 👈 Location state
  const [userPhoto, setUserPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const city = localStorage.getItem('userCity');
    const state = localStorage.getItem('userState');
    const savedPhoto = localStorage.getItem('userPhoto');
    
    if (name) setUserName(name);
    if (city && state) setUserLocation(`${city}, ${state}`); // 👈 Display logic
    if (savedPhoto) setUserPhoto(savedPhoto);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setUserPhoto(base64);
        localStorage.setItem('userPhoto', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[40px] shadow-lg overflow-hidden border border-gray-100">
          <div className="h-32 bg-green-700 relative">
            <div className="absolute -bottom-12 left-8">
              <div onClick={() => fileInputRef.current.click()} className="w-24 h-24 bg-green-100 rounded-[30px] border-4 border-white flex items-center justify-center shadow-md overflow-hidden cursor-pointer hover:opacity-80 transition-all">
                {userPhoto ? <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl text-green-700">👤</span>}
              </div>
            </div>
          </div>

          <div className="pt-16 pb-10 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black text-green-950 italic tracking-tighter">{userName || 'Kisan Bhai'}</h1>
                <p className="text-gray-400 font-bold mt-1 uppercase text-xs tracking-widest">Verified Member</p>
              </div>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-2 rounded-2xl font-black text-sm hover:bg-red-600 hover:text-white transition-all">Logout</button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100">
                <p className="text-[10px] font-black text-green-700 uppercase mb-1">Status</p>
                <p className="font-bold text-gray-800">Active Farmer</p>
              </div>
              {/* Location Card 👈 */}
              <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100">
                <p className="text-[10px] font-black text-green-700 uppercase mb-1">Location</p>
                <p className="font-bold text-gray-800">{userLocation || 'Not Set'}</p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={() => navigate('/home')} className="w-full bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-green-800 transition-all">Ghar Wapas Chals</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;