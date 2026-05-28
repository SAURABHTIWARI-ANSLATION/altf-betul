import React from 'react';

export default function EmptyState({ message, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] my-8 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative z-10 w-20 h-20 bg-gray-50/80 backdrop-blur-md rounded-2xl border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      
      <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3 tracking-tight">Space Empty</h3>
      <p className="relative z-10 text-gray-500 mb-8 max-w-md text-base leading-relaxed font-medium">
        {message || "We couldn't locate any active portals for this sector. The coordinates might be updating."}
      </p>
      
      {onReset && (
        <button 
          onClick={onReset}
          className="relative z-10 px-8 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Return to Hub
        </button>
      )}
    </div>
  );
}
