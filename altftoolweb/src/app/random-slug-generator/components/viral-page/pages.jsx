 "use client"

// import { useState, useEffect } from 'react';
// import Hero from './Hero.jsx';
// import TrendingMysteries from './TrendingMysteries.jsx';
// import FactsGrid from './FactsGrid.jsx';
// import ShortFormShowcase from './ShortFormShowcase.jsx';
// import PsychologicalHooks from './PsychologicalHooks.jsx';
// import CommunityDiscussion from './CommunityDiscussion.jsx';
// //import Footer from './Footer.jsx';
// import EmailGate from './EmailGate.jsx';

// export default function MysteryPlatform() {
//   const [viewCount, setViewCount] = useState(0);
//   const [showGate, setShowGate] = useState(false);
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   const [pendingOpen, setPendingOpen] = useState(null);
//   const [userEmail, setUserEmail] = useState('');

//   useEffect(() => {
//     const saved = sessionStorage.getItem('faceless_views');
//     const unlocked = localStorage.getItem('faceless_unlocked');
//     const savedEmail = localStorage.getItem('faceless_email');
    
//     if (saved) setViewCount(parseInt(saved));
//     if (unlocked === 'true') {
//       setIsUnlocked(true);
//       if (savedEmail) setUserEmail(savedEmail);
//     }
//   }, []);

//   const handleItemClick = (itemData, type) => {
//     if (isUnlocked) {
//       return { allowed: true };
//     }

//     const newCount = viewCount + 1;
//     setViewCount(newCount);
//     sessionStorage.setItem('faceless_views', newCount.toString());

//     if (newCount >= 3) {
//       setPendingOpen({ data: itemData, type });
//       setShowGate(true);
//       return { allowed: false };
//     }

//     return { allowed: true };
//   };

//   const handleUnlock = (email, phone) => {
//     // Save to localStorage for persistence across sessions
//     localStorage.setItem('faceless_unlocked', 'true');
//     localStorage.setItem('faceless_email', email);
//     localStorage.setItem('faceless_phone', phone);
//     localStorage.setItem('faceless_verified_at', new Date().toISOString());
    
//     setIsUnlocked(true);
//     setUserEmail(email);

//     if (pendingOpen) {
//       setTimeout(() => {
//         window.dispatchEvent(new CustomEvent('faceless-open-pending', { 
//           detail: pendingOpen 
//         }));
//         setPendingOpen(null);
//       }, 600);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fcfcfa] text-zinc-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
//       {!isUnlocked && viewCount > 0 && viewCount < 3 && (
//         <div className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700 flex items-center gap-2 shadow-lg shadow-amber-100/50 backdrop-blur-xl">
//           <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
//           {3 - viewCount} FREE VIEW{3 - viewCount !== 1 ? 'S' : ''} LEFT
//         </div>
//       )}

//       {isUnlocked && (
//         <div className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700 flex items-center gap-2 shadow-lg shadow-emerald-100/50 backdrop-blur-xl">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           {userEmail ? userEmail.split('@')[0] : 'VERIFIED'} • UNLIMITED
//         </div>
//       )}

//       <Hero />
//       <TrendingMysteries onItemClick={handleItemClick} />
//       <FactsGrid onItemClick={handleItemClick} />
//       <ShortFormShowcase onItemClick={handleItemClick} />
//       <PsychologicalHooks />
//       <CommunityDiscussion />
//       {/* <Footer /> */}

//       <EmailGate 
//         isOpen={showGate}
//         onClose={() => setShowGate(false)}
//         onUnlock={handleUnlock}
//         viewCount={viewCount}
//       />
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import Hero from './Hero.jsx';
import TrendingMysteries from './TrendingMysteries.jsx';
import FactsGrid from './FactsGrid.jsx';
import ShortFormShowcase from './ShortFormShowcase.jsx';
import PsychologicalHooks from './PsychologicalHooks.jsx';
import CommunityDiscussion from './CommunityDiscussion.jsx';
//import Footer from './Footer.jsx';
import EmailGate from './EmailGate.jsx';

export default function MysteryPlatform() {
  const [viewCount, setViewCount] = useState(0);
  const [showGate, setShowGate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('faceless_views');
    const unlocked = localStorage.getItem('faceless_unlocked');
    const savedEmail = localStorage.getItem('faceless_email');
    
    if (saved) setViewCount(parseInt(saved));
    if (unlocked === 'true') {
      setIsUnlocked(true);
      if (savedEmail) setUserEmail(savedEmail);
    }
  }, []);

  const handleItemClick = (itemData, type) => {
    if (isUnlocked) {
      return { allowed: true };
    }

    const newCount = viewCount + 1;
    setViewCount(newCount);
    sessionStorage.setItem('faceless_views', newCount.toString());

    if (newCount >= 3) {
      setPendingOpen({ data: itemData, type });
      setShowGate(true);
      return { allowed: false };
    }

    return { allowed: true };
  };

  const handleUnlock = (email, phone) => {
    // Save to localStorage for persistence across sessions
    localStorage.setItem('faceless_unlocked', 'true');
    localStorage.setItem('faceless_email', email);
    localStorage.setItem('faceless_phone', phone);
    localStorage.setItem('faceless_verified_at', new Date().toISOString());
    
    setIsUnlocked(true);
    setUserEmail(email);

    if (pendingOpen) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('faceless-open-pending', { 
          detail: pendingOpen 
        }));
        setPendingOpen(null);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfa] text-zinc-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {!isUnlocked && viewCount > 0 && viewCount < 3 && (
        <div className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700 flex items-center gap-2 shadow-lg shadow-amber-100/50 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {3 - viewCount} FREE VIEW{3 - viewCount !== 1 ? 'S' : ''} LEFT
        </div>
      )}

      {isUnlocked && (
        <div className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700 flex items-center gap-2 shadow-lg shadow-emerald-100/50 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {userEmail ? userEmail.split('@')[0] : 'VERIFIED'} • UNLIMITED
        </div>
      )}

      <Hero />
      <TrendingMysteries onItemClick={handleItemClick} />
      <FactsGrid onItemClick={handleItemClick} />
      <ShortFormShowcase onItemClick={handleItemClick} />
      <PsychologicalHooks />
      <CommunityDiscussion />
      {/* <Footer /> */}

      <EmailGate 
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        onUnlock={handleUnlock}
        viewCount={viewCount}
      />
    </div>
  );
}