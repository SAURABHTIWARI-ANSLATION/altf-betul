import React from 'react';

export default function LoadingState({ message = 'Orchestrating magic...' }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center transition-all duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing rings */}
        <div className="absolute w-32 h-32 bg-indigo-400/20 rounded-full animate-ping"></div>
        <div className="absolute w-24 h-24 bg-purple-400/20 rounded-full animate-pulse"></div>
        
        {/* Core spinner */}
        <div className="relative w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border border-gray-100">
          <div className="w-8 h-8 border-4 border-indigo-100 rounded-full absolute"></div>
          <div className="w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin absolute"></div>
        </div>
      </div>
      
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
          {message}
        </h2>
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          Securing the best destination
        </p>
      </div>
    </div>
  );
}
