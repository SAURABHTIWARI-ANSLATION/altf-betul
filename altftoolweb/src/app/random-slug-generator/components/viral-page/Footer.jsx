import { Radio, Share2, Play, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 bg-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg">
                <Radio className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-serif text-xl text-zinc-900 leading-none tracking-tight font-medium">FACELess</div>
                <div className="text-xs text-zinc-500 tracking-[0.2em] uppercase mt-1 font-semibold">MYSTERY • ARCHIVE</div>
              </div>
            </div>
            
            <p className="text-zinc-600 leading-relaxed font-medium max-w-md">
              A faceless cinematic archive of viral mysteries. No hosts. No faces. 
              Just the internet's darkest secrets, presented anonymously and impossible to ignore.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {[
              {
                title: 'ARCHIVE',
                links: ['Trending Now', 'Unsolved Cases', 'Declassified', '3AM Feed'],
              },
              {
                title: 'FORMAT',
                links: ['Shorts • 0:30', 'Documentaries', 'Audio Only', 'Text Files'],
              },
              {
                title: 'MANIFESTO',
                links: ['No Faces Ever', 'No Algorithm', 'Human Only', 'Only Mystery'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-xs tracking-[0.15em] text-zinc-400 uppercase font-bold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs text-zinc-500 font-medium">
            <span>© 2025 FACELess ARCHIVE</span>
            <span className="hidden md:block h-3 w-px bg-zinc-200" />
            <span className="font-mono">NO FACES • NO TRACKING • NO BS</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: Share2, label: 'X' },
              { icon: Video, label: 'YouTube' },
              { icon: Play, label: 'IG' },
              { icon: Radio, label: 'RSS' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-400 font-medium tracking-wide">
            BUILT FOR 3AM SCROLLING • OPTIMIZED FOR VIRAL MYSTERY • MADE TO BE SCREENSHOTTED
          </p>
        </div>
      </div>
    </footer>
  );
}