import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Dashboard = () => {
  // Fake History Data (Baad mein ye Database se aayega)
  const scanHistory = [
    { id: 1, crop: "Tomato", disease: "Early Blight", date: "12 April 2026", status: "Critical", color: "bg-red-100 text-red-700" },
    { id: 2, crop: "Wheat", disease: "Yellow Rust", date: "10 April 2026", status: "Healthy", color: "bg-green-100 text-green-700" },
    { id: 3, crop: "Potato", disease: "Late Blight", date: "05 April 2026", status: "Moderate", color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <PageTransition>
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary">Kisan Dashboard</h1>
            <p className="text-gray-500">Aapki fasalon ki sehat ka poora hisab-kitab.</p>
          </div>
          <Link to="/scan" className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition transform">
            + New Scan
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Scans</p>
            <h3 className="text-4xl font-black text-primary mt-2">12</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Under Treatment</p>
            <h3 className="text-4xl font-black text-secondary mt-2">3</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Healthy Crops</p>
            <h3 className="text-4xl font-black text-green-600 mt-2">9</h3>
          </div>
        </div>

        {/* Recent History Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Crop Name</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Detected Disease</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {scanHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-700">{item.crop}</td>
                    <td className="p-4 text-gray-600">{item.disease}</td>
                    <td className="p-4 text-gray-500 text-sm">{item.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.color}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-primary font-bold text-sm">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Dashboard;