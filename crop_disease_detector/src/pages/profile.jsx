import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 🌐 Language hook
import PageTransition from '../components/PageTransition';

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // 't' function text ke liye, 'i18n' language change ke liye

  // Dummy User Data
  const user = {
    name: "Kanishka",
    location: "Bareilly, Uttar Pradesh",
    joined: "April 2026",
    totalScans: 12,
  };

  // Language Badalne wala function
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-28 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* 👤 User Glass Card */}
          <div className="bg-white/40 backdrop-blur-xl rounded-[50px] p-10 border border-white shadow-2xl relative overflow-hidden mb-8 text-center">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 mx-auto mb-6 overflow-hidden shadow-xl bg-white flex items-center justify-center">
               <span className="text-5xl">👤</span>
            </div>

            <h1 className="text-3xl font-black text-green-950 italic">{user.name}</h1>
            <p className="text-green-900/60 font-bold text-xs uppercase tracking-[0.3em] mt-2">
              {user.location}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-green-900/5 p-5 rounded-[35px] border border-green-900/5 text-center">
                <span className="block text-[10px] font-black text-green-900/40 uppercase tracking-widest mb-1">
                    {t('Sadasya Kabse')} {/* 👈 JSON se aayega */}
                </span>
                <span className="text-lg font-black text-green-900">{user.joined}</span>
              </div>
              <div className="bg-green-900/5 p-5 rounded-[35px] border border-green-900/5 text-center">
                <span className="block text-[10px] font-black text-green-900/40 uppercase tracking-widest mb-1">
                    {t('Total Scans')}
                </span>
                <span className="text-lg font-black text-green-900">{user.totalScans}</span>
              </div>
            </div>
          </div>

          {/* 🌐 Language Switcher Card (New!) */}
          <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white shadow-xl mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">🌐</span>
                <h3 className="font-black text-green-950 italic text-lg">{t('lang_label')}</h3>
              </div>
              
              <select 
                value={i18n.language} 
                onChange={changeLanguage}
                className="bg-green-900 text-white px-4 py-2 rounded-2xl font-black text-xs outline-none shadow-lg shadow-green-900/20 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>

          {/* 📜 History Shortcut */}
          <button 
            onClick={() => navigate('/history')}
            className="w-full bg-white p-6 rounded-[35px] shadow-sm border border-gray-100 flex items-center justify-between hover:scale-[1.02] transition-transform mb-8"
          >
            <div className="flex items-center space-x-5">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl">📜</div>
              <span className="font-black text-green-950 uppercase tracking-widest text-sm">{t('scan_history')}</span>
            </div>
            <span className="text-gray-300">→</span>
          </button>

          {/* 🚪 Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full py-5 bg-red-50 text-red-600 rounded-[30px] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-red-100 transition-all border border-red-100 active:scale-95 shadow-sm"
          >
            {t('logout')}
          </button>

        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;