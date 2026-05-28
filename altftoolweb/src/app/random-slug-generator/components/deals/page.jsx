import React from 'react';

export default function DealsPage() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Active Deals</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage promotional campaigns and discounts.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300">
          + Add New Deal
        </button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Deal Card 1 */}
        <div className="group p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/50 hover:border-indigo-200 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-1">Flash Sale Electronics</h4>
          <p className="text-sm text-gray-500 font-medium">Ends in 24 hours</p>
        </div>

        {/* Deal Card 2 */}
        <div className="group p-6 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-2xl border border-blue-100/50 hover:border-blue-200 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-1">Weekend Getaway</h4>
          <p className="text-sm text-gray-500 font-medium">Travel category exclusive</p>
        </div>
      </div>
    </div>
  );
}
