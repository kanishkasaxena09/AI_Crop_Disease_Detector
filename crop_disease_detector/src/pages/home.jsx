import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';

// Ab naam exactly match karega jo tumhare folder mein hai
import heroImage from '../assets/images/home.jfif'; 

const Home = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
    <div className="bg-background min-h-[90vh]">
      <div className="container mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-left animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight">
            {t('welcome')}
          </h1>
          <p className="mt-8 text-xl text-gray-700 max-w-xl">
            {t('tagline')}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5">
            <Link to="/scan" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition transform text-center">
              {t('scan_btn')}
            </Link>
            <Link to="/dashboard" className="bg-white text-primary border-2 border-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition text-center">
              {t('dashboard')}
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform group-hover:rotate-2 transition-transform duration-500"></div>
          
          <img 
            src={heroImage} 
            alt="Crop AI Home" 
            className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px] md:h-[500px] border-4 border-white"
          />
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Home;