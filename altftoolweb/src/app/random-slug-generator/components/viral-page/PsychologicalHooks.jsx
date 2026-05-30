import { motion } from 'framer-motion';
import { Brain, AlertTriangle, EyeOff } from 'lucide-react';

const hooks = [
  {
    icon: Brain,
    headline: 'YOUR BRAIN CANNOT IGNORE THIS MYSTERY',
    sub: 'The Zeigarnik effect • unfinished stories create tension your mind needs to resolve • we engineer that tension deliberately',
    color: 'emerald',
  },
  {
    icon: AlertTriangle,
    headline: 'PEOPLE DISAPPEAR AFTER RESEARCHING THIS',
    sub: '12 documented cases • Same search terms • No digital footprint after 3:33 AM • we don\'t publish the term here',
    color: 'amber',
  },
  {
    icon: EyeOff,
    headline: 'THIS WAS REMOVED FROM HISTORY BOOKS',
    sub: 'Found in 3 school basements • Printed 1947 • Page 47 missing from all digital scans • physical archive only',
    color: 'violet',
  },
];

export default function PsychologicalHooks() {
  return (
    <section className="pt-24 pb-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-8">
            <Brain className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-xs tracking-[0.15em] text-violet-700 uppercase font-bold">PSYCHOLOGY OF VIRAL MYSTERY</span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] text-zinc-900 leading-[1.1] mb-6">
            WHY YOU CAN'T
            <br />
            <span className="text-zinc-300">STOP SCROLLING.</span>
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed font-medium">
            We don't use faces. We use psychology. These hooks are engineered for 3AM curiosity spirals.
          </p>
        </motion.div>

        <div className="space-y-5 max-w-4xl mx-auto">
          {hooks.map((hook, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-[28px] border border-zinc-200 p-8 lg:p-10 shadow-sm hover:shadow-xl hover:shadow-zinc-200/60 hover:border-zinc-300 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-${hook.color}-50 border border-${hook.color}-200 flex items-center justify-center shadow-sm`}>
                    <hook.icon className={`w-7 h-7 text-${hook.color}-600`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[32px] leading-[1.1] tracking-[-0.02em] text-zinc-900 mb-3 font-medium">
                      {hook.headline}
                    </h3>
                    
                    <p className="text-zinc-600 leading-relaxed text-base lg:text-lg font-medium max-w-2xl">
                      {hook.sub}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <span className="text-xs tracking-widest text-zinc-400 uppercase font-bold">HOOK #{String(index + 1).padStart(2, '0')}</span>
                      <div className="h-px flex-1 max-w-24 bg-zinc-200" />
                      <span className="text-xs text-emerald-600 font-semibold">FACELess FORMULA</span>
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
          transition={{ delay: 0.4 }}
          className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-3xl bg-zinc-50 border border-zinc-200"
        >
          <p className="text-sm text-zinc-600 font-medium leading-relaxed">
            No faces. No personalities. Just raw psychological triggers that make mystery content spread. 
            <span className="text-zinc-900"> This is how faceless pages get 12M views at 3AM.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}