import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Phone, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function EmailGate({ isOpen, onClose, onUnlock, viewCount }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return phone.replace(/\D/g, '').length >= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number (10+ digits)');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call and save to localStorage via parent
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        onUnlock(email, phone);
      }, 1500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/70 backdrop-blur-2xl z-[100]"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-md bg-white rounded-[28px] border border-zinc-200 shadow-2xl shadow-zinc-900/20 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {step === 1 ? (
                <>
                  <div className="relative bg-gradient-to-b from-emerald-50 via-white to-white p-8 border-b border-zinc-200">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-4 shadow-sm">
                        <Lock className="w-7 h-7 text-red-600" />
                      </div>
                      
                      <h2 className="text-2xl font-serif text-zinc-900 leading-tight mb-2 font-medium">
                        Archive Access
                        <br />
                        Requires Verification
                      </h2>
                      
                      <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                        You've viewed <span className="text-emerald-700 font-semibold">{viewCount} investigations</span>. 
                        Free tier: 2 cases. Verify to unlock unlimited access.
                      </p>
                    </div>

                    <button
                      onClick={onClose}
                      className="absolute top-6 right-6 w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm"
                    >
                      <X className="w-4 h-4 text-zinc-500" />
                    </button>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 mb-6">
                      <Zap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-800 font-medium leading-relaxed">
                        <div className="font-semibold mb-0.5">2,847 investigators online now</div>
                        Free tier limits to prevent AI scraping. Human verification required.
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 tracking-wide mb-2 uppercase">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="investigator@proton.me"
                            required
                            autoFocus
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1.5 font-medium">Anonymous alias accepted • We never share emails</p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 tracking-wide mb-2 uppercase">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1.5 font-medium">Access codes only • Burner numbers ok • No spam ever</p>
                      </div>

                      {error && (
                        <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting || !email || !phone}
                        className="w-full py-3.5 rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/20"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            VERIFYING & SAVING...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4" />
                            UNLOCK UNLIMITED ACCESS
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-zinc-100 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Saved to localStorage • Persists across sessions
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        No password needed • One-time verification
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Delete anytime • We don't track you
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center bg-gradient-to-b from-emerald-50 via-white to-white">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-16 h-16 rounded-2xl bg-emerald-500 mx-auto mb-6 flex items-center justify-center shadow-xl shadow-emerald-500/25"
                  >
                    <CheckCircle2 className="w-9 h-9 text-white stroke-2" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-serif text-zinc-900 mb-2 font-medium">Access Granted ✓</h3>
                  <p className="text-sm text-zinc-600 font-medium mb-2 leading-relaxed">
                    Saved to localStorage • {email.split('@')[0]}
                  </p>
                  <p className="text-xs text-zinc-500 font-medium mb-6">
                    Unlimited archive unlocked • Session persists on refresh
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-emerald-200 shadow-sm text-xs text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    847 INVESTIGATIONS NOW ACCESSIBLE
                  </div>
                  
                  <div className="mt-4 text-[10px] text-zinc-400 font-medium">
                    Data stored locally • Not sent to servers • You control it
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}