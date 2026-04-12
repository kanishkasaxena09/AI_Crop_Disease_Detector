import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-background min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight">
          Detect Crop Diseases <br /> 
          <span className="text-secondary">In Seconds with AI</span>
        </h1>
        
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          Apni fasal ki photo upload karein aur turant bimari ka pata lagayein. 
          Desh ke kisanon ke liye ek smart aur aasaan hal.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/scan" 
            className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition"
          >
            Start Scanning Now
          </Link>
          
          <Link 
            to="/about" 
            className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Stats or Features Preview */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-primary">98% Accuracy</h3>
          <p className="text-gray-500 text-sm mt-2">Advanced AI models trained on millions of crop images.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-primary">Instant Results</h3>
          <p className="text-gray-500 text-sm mt-2">Get diagnosis and treatment advice within seconds.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-primary">Free for All</h3>
          <p className="text-gray-500 text-sm mt-2">Empowering farmers with technology at zero cost.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;