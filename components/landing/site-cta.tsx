import { siteConfig } from '@/lib/constants';
import {
  ArrowRight,
  Code2,
  Command,
  Github,
  Globe,
  Terminal,
} from 'lucide-react';

export default function SiteCta() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Soft-Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-300">
            Available Today
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 mb-8">
          <span className="font-serif italic">The wait for 🫡</span>
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-green-400">
            perfection is over.
          </span>
        </h2>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
          Stop wrestling with configurations and start building your legacy.
          Join the next generation of SaaS founders building on the{' '}
          <span className="text-zinc-900 font-bold tracking-tight italic">
            {siteConfig.short_name}.
          </span>
        </p>

        {/* Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button className="group relative w-full sm:w-auto px-10 py-5 bg-white text-zinc-950 rounded-[2rem] font-black text-lg hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3">
            Start Building Free
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <button className="w-full sm:w-auto px-10 py-5 bg-zinc-900/50 text-white border border-white/10 rounded-[2rem] font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-3">
            <Github size={20} />
            Star on GitHub
          </button>
        </div>

        {/* "System Specs" Footnote */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Code2 size={16} className="text-zinc-400" />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              React 19 Ready
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Terminal size={16} className="text-zinc-400" />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Type-Safe ORM
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Globe size={16} className="text-zinc-400" />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Edge Optimized
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <Command size={16} className="text-zinc-400" />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Better Auth v1
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
