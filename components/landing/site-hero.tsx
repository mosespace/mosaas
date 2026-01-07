import { Command, Plus } from 'lucide-react';
import React from 'react';

// --- Atomic Components ---

const GlassButton = ({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) => (
  <button
    className={`
    group relative flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-all duration-300
    ${
      primary
        ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200'
        : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
    }
  `}
  >
    {children}
  </button>
);

export default function SiteHero() {
  return (
    <section className="relative pt-44 pb-32 px-6 overflow-hidden">
      {/* Soft Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full border border-green-300 shadow-xs mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-green-600">
            Next.js 16 Production Ready
          </span>
        </div>

        <h1 className="text-6xl md:text-[92px] font-black tracking-[-0.05em] leading-[0.85] text-center mb-10">
          Build software <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-zinc-900 to-zinc-500">
            at the speed of light.
          </span>
        </h1>

        <p className="max-w-2xl text-center text-xl text-zinc-500 leading-relaxed mb-12">
          A high-performance boilerplate engineered for speed, security, and
          aesthetics. Integrated with Better Auth, TanStack Table, and Shadcn
          UI.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <GlassButton primary>
            Get Started Free <Plus size={18} />
          </GlassButton>
          <GlassButton>
            Documentation <Command size={16} />
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
