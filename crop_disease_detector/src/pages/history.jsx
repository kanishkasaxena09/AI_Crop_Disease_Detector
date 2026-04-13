import React from 'react';
import PageTransition from '../components/PageTransition';

const History = () => {
  // Dummy data: Asaliyat mein ye database (MySQL) se aayega
  const allScans = [
    { id: 1, date: "12 April, 2026", time: "10:30 AM", disease: "Early Blight", crop: "Tamatar", status: "Critical", color: "bg-red-100 text-red-600" },
    { id: 2, date: "10 April, 2026", time: "02:15 PM", disease: "Healthy", crop: "Tamatar", status: "Safe", color: "bg-green-100 text-green-600" },
    { id: 3, date: "05 April, 2026", time: "09:00 AM", disease: "Leaf Mold", crop: "Mirch", status: "Recovering", color: "bg-orange-100 text-orange-600" },
    { id: 4, date: "01 April, 2026", time: "11:45 AM", disease: "Late Blight", crop: "Aloo", status: "Treated", color: "bg-blue-100 text-blue-600" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-28 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-10 flex justify-between items-end px-2">
            <div>
              <h1 className="text-4xl font-black text-green-950 italic tracking-tighter">Scan <span className="text-primary">History</span></h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Pichle saare records yahan hain</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 text-[10px] font-black text-green-900 uppercase">
              Total: {allScans.length}
            </div>
          </div>

          {/* Search/Filter Bar (Chota sa touch) */}
          <div className="mb-8 relative">
            <input 
              type="text" 
              placeholder="Fasal ya bimari dhoondhein..." 
              className="w-full bg-white border border-gray-100 py-4 px-6 rounded-[25px] text-sm font-bold text-green-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {allScans.map((scan) => (
              <div 
                key={scan.id} 
                className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-100 flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-5">
                  {/* Icon with Dynamic Background */}
                  <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-3xl shadow-inner ${scan.color.split(' ')[0]}`}>
                    🌿
                  </div>
                  
                  <div>
                    <h3 className="font-black text-green-950 text-lg group-hover:text-primary transition-colors">{scan.disease}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{scan.crop}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-[10px] font-bold text-gray-400">{scan.date}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${scan.color}`}>
                  {scan.status}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <p className="text-center text-gray-300 font-bold text-[10px] uppercase tracking-widest mt-12 mb-4">
            --- Diary ka anth ---
          </p>

        </div>
      </div>
    </PageTransition>
  );
};

export default History;