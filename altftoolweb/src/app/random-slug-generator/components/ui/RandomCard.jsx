import React from 'react';

export default function RandomCard({ category, title, description, iconSvg, onRedirect, isLoading }) {
  return (
    <div className="group relative flex flex-col justify-between p-6 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] transition-all duration-500 transform hover:-translate-y-2">
      
      {/* Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 group-hover:opacity-100 opacity-0 transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 shadow-sm group-hover:border-indigo-100 group-hover:bg-indigo-50/50 transition-colors duration-300">
            {iconSvg}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 font-medium">{description}</p>
      </div>
      
      <button
        onClick={() => onRedirect(category)}
        disabled={isLoading}
        className={`relative z-10 w-full overflow-hidden rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 ${
          isLoading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed py-3.5' 
            : 'bg-gray-900 text-white hover:bg-indigo-600 shadow-md hover:shadow-indigo-500/30 py-3.5 group-hover:scale-[1.02]'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Routing...
          </span>
        ) : (
          <span className="relative z-10 flex items-center justify-center gap-2">
            Explore Now
          </span>
        )}
      </button>
    </div>
  );
}
