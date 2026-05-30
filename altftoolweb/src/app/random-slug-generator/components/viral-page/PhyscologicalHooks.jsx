import { motion } from 'framer-motion';
import { Brain, AlertTriangle, EyeOff } from 'lucide-react';

const hooks = [
  {
    icon: Brain,
    headline: 'YOUR BRAIN CANNOT IGNORE THIS MYSTERY',
    sub: 'The Zeigarnik effect • unfinished stories create tension your mind needs to resolve',
    color: 'emerald',
  },
  {
    icon: AlertTriangle,
    headline: 'PEOPLE DISAPPEAR AFTER RESEARCHING THIS',
    sub: '12 documented cases • Same search terms • No digital footprint after 3:33 AM',
    color: 'amber',
  },
  {
    icon: EyeOff,
    headline: 'THIS HIDDEN TRUTH WAS REMOVED FROM HISTORY',
    sub: 'Found in 3 physical archives • Never digitized • Teachers instructed to skip page 47',
    color: 'violet',
  },
];

export default function PsychologicalHooks() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <Brain className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs tracking-[0.2em] text-violet-300 uppercase font-medium">PSYCHOLOGY OF VIRAL MYSTERY</span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] text-white mb-6" style={{ lineHeight: 1.2 }}>
            WHY YOU CAN'T
            <br />
            <span className="text-zinc-700">STOP SCROLLING.</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed font-light">
            We don't use faces. We use psychology. These hooks are engineered for 3AM curiosity spirals.
          </p>
        </motion.div>
 
        <div className="space-y-6 max-w-4xl mx-auto">
          {hooks.map((hook, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative bg-zinc-900/30 backdrop-blur-2xl rounded-[32px] border border-white/5 p-8 lg:p-10 overflow-hidden hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-500">
                {/* Glow accent */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-${hook.color}-500/10 blur-3xl group-hover:bg-${hook.color}-500/15 transition-colors`} />
                
                <div className="relative flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-${hook.color}-500/10 border border-${hook.color}-500/20 flex items-center justify-center`}>
                    <hook.icon className={`w-7 h-7 text-${hook.color}-400`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-white mb-4"
                      style={{ lineHeight: 1.2 }}
                    >
                      {hook.headline}
                    </motion.h3>
                    
                    <p className="text-zinc-400 leading-relaxed text-base lg:text-lg font-light max-w-2xl">
                      {hook.sub}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-xs tracking-widest text-zinc-500 uppercase font-medium">HOOK #{String(index + 1).padStart(2, '0')} • FACELess FORMULA</span>
                      <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-zinc-500 tracking-wide font-light max-w-2xl mx-auto">
            No faces. No personalities. Just raw psychological triggers that make mystery content spread like wildfire.
            <span className="text-zinc-400"> This is how faceless pages go viral.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}