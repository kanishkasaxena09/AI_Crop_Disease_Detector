import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-primary">Kisan Dashboard</h1>
      <p className="text-gray-600 mt-2">Aapka pichla saara data yahan dikhega.</p>
      <div className="mt-6 p-10 bg-white border-2 border-dashed border-gray-200 rounded-xl text-center">
        Stats aur Reports jald hi yahan honge!
      </div>
    </div>
  );
};

export default Dashboard;