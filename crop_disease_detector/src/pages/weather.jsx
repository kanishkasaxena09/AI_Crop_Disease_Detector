import React from 'react';
import PageTransition from '../components/PageTransition';

const WeatherCard = () => {
  const weather = {
    day: "Monday, 13 April 2026",
    temp: 32,
    condition: "Saaf Mausam",
    location: "Bareilly, Uttar Pradesh",
    rain: "10%",
    humidity: "45%",
    wind: "12 km/h",
    sunrise: "5:45 am",
    sunset: "6:30 pm",
  };

  const forecast = [
    { day: "Mon", icon: "☀️", temp: "32°" },
    { day: "Tue", icon: "🌤️", temp: "31°" },
    { day: "Wed", icon: "🌤️", temp: "30°" },
    { day: "Thu", icon: "🌧️", temp: "28°" },
    { day: "Fri", icon: "☀️", temp: "33°" },
    { day: "Sat", icon: "☀️", temp: "34°" },
    { day: "Sun", icon: "🌤️", temp: "32°" },
  ];

  return (
    <PageTransition>
    
    <div className="relative w-full max-w-6xl mx-auto mt-24 bg-white/5 backdrop-blur-md rounded-[50px] p-10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-green-900/10 font-sans overflow-hidden group">
      
      {/* 👇 1. IMAGE PLACEHOLDER: Apni image ka path yahan paste karein (like src/assets/images/weather.jfif) */}
      <img 
        src="src/assets/images/weather.jfif" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30" // opacity se transparency control karein
      />
      {/* 👆 IMAGE PLACEHOLDER END */}

      {/* Background Glow Effect - Green Theme */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] group-hover:bg-primary/20 transition-all duration-700"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* LEFT SECTION: Dark Green Text Ranges */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-green-900/10 border border-green-900/20 text-green-900 text-[11px] font-black uppercase tracking-[0.3em] mb-4">
            Live Monitoring
          </div>
          
          <div className="py-4">
            {/* Temperature is a Deep Green shade */}
            <h1 className="text-[10rem] font-black tracking-tighter italic leading-none text-green-950 drop-shadow-sm">
              {weather.temp}<span className="text-green-700 text-6xl not-italic ml-2">°C</span>
            </h1>
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-4 text-green-900">
            <span className="text-5xl animate-bounce-slow">☀️</span>
            <div>
              <h2 className="text-3xl font-bold">{weather.condition}</h2>
              <p className="text-green-800 font-medium tracking-wide">{weather.location}</p>
            </div>
          </div>
          
          <p className="text-green-900/70 text-sm font-bold mt-8">{weather.day}</p>
        </div>

        {/* RIGHT SECTION: Detailed Info & Forecast */}
        <div className="flex-[1.4] w-full space-y-10">
          
          {/* Detailed Stats Pills - Dark Green Content */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-black/10 backdrop-blur-2xl rounded-[35px] p-6 border border-green-900/10 flex flex-col items-center justify-center hover:bg-black/20 transition">
              <span className="text-green-900/50 text-[11px] font-black uppercase mb-3 tracking-widest">Baarish</span>
              <span className="text-2xl font-black text-green-900">{weather.rain}</span>
            </div>
            <div className="bg-black/10 backdrop-blur-2xl rounded-[35px] p-6 border border-green-900/10 flex flex-col items-center justify-center hover:bg-black/20 transition">
              <span className="text-green-900/50 text-[11px] font-black uppercase mb-3 tracking-widest">Umas</span>
              <span className="text-2xl font-black text-green-900">{weather.humidity}</span>
            </div>
            <div className="bg-black/10 backdrop-blur-2xl rounded-[35px] p-6 border border-green-900/10 flex flex-col items-center justify-center hover:bg-black/20 transition">
              <span className="text-green-900/50 text-[11px] font-black uppercase mb-3 tracking-widest">Hawa</span>
              <span className="text-2xl font-black text-green-900">{weather.wind}</span>
            </div>
          </div>

          {/* 7-Day Weekly Forecast Row - Dark Green Text */}
          <div className="bg-black/10 backdrop-blur-md rounded-[40px] p-8 border border-green-900/10 shadow-inner">
            <div className="flex justify-between items-center gap-2">
              {forecast.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center flex-1 py-4 rounded-3xl transition-all duration-300 ${
                    index === 0 
                    ? 'bg-green-900 text-white shadow-xl shadow-primary/20 scale-110 border border-white/20' 
                    : 'hover:bg-green-900/5 border border-transparent'
                  }`}
                >
                  <span className={`text-[10px] font-black mb-3 ${index === 0 ? 'text-green-100' : 'text-green-900/60'}`}>
                    {item.day}
                  </span>
                  <span className="text-2xl mb-3">{item.icon}</span>
                  <span className={`text-md font-black ${index === 0 ? 'text-white' : 'text-green-900'}`}>{item.temp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sunrise / Sunset Times - Deep Green Text */}
          <div className="flex justify-between px-8 text-[12px] font-black text-green-900/70 uppercase tracking-[0.2em]">
            <div className="flex items-center"><span className="mr-3 text-xl">🌅</span> Suraj Nikla: <span className="text-green-950 ml-2">{weather.sunrise}</span></div>
            <div className="flex items-center">Suraj Dooba: <span className="text-green-950 mx-2">{weather.sunset}</span> <span className="ml-3 text-xl">🌇</span></div>
          </div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default WeatherCard;