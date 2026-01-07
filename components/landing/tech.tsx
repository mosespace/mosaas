import React from 'react';
import {
  Database,
  ShieldCheck,
  Table,
  Zap,
  Maximize,
  Cpu,
  Code2,
  Box,
} from 'lucide-react';

// --- Tech Card Component ---
const TechCard = ({
  icon: Icon,
  name,
  version,
  description,
  colorClass,
}: {
  icon: any;
  name: string;
  version?: string;
  description: string;
  colorClass: string;
}) => (
  <div className="group relative bg-white border border-zinc-100 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden">
    <div
      className={`absolute top-0 right-0 w-24 h-24 blur-2xl opacity-20 transition-opacity group-hover:opacity-40 ${colorClass}`}
    />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-zinc-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} className="text-zinc-900" />
        </div>
        {version && (
          <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 bg-zinc-900 text-white rounded-md">
            {version}
          </span>
        )}
      </div>

      <h4 className="text-xl font-bold text-zinc-900 mb-2">{name}</h4>
      <p className="text-sm text-zinc-500 leading-relaxed italic">
        {description}
      </p>
    </div>
  </div>
);

export default function TechStackSection() {
  const avatars = [
    'https://avatar.iran.liara.run/public/22',
    'https://avatar.iran.liara.run/public/47',
    'https://avatar.iran.liara.run/public/28',
    'https://avatar.iran.liara.run/public/40',
  ];

  return (
    <section id="framework" className="py-32 px-6 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-amber-500 mb-4">
              The Infrastructure
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">
              Battle-tested internals. <br />
              <span className="text-zinc-400 italic font-serif">
                Zero legacy debt.
              </span>
            </h3>
          </div>
          <div className="hidden md:block">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-12 h-12 rounded-full border-4 border-[#F8F9FB] bg-zinc-200"
                />
              ))}

              <div className="w-12 h-12 rounded-full border-4 border-[#F8F9FB] bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                +12
              </div>
            </div>
            <p className="text-xs font-bold text-zinc-400 mt-3 text-right uppercase tracking-widest">
              Enterprise Ready
            </p>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Main Pillars */}
          <TechCard
            icon={ShieldCheck}
            name="Better Auth"
            version="Latest"
            description="The most comprehensive auth library for Next.js. Multi-session, 2FA, and Organization management built-in."
            colorClass="bg-amber-500"
          />

          <TechCard
            icon={Database}
            name="Prisma ORM"
            version="v7"
            description="Type-safe database access with the brand new Prisma v7 features. Optimized queries and automated migrations."
            colorClass="bg-emerald-500"
          />

          <TechCard
            icon={Table}
            name="TanStack Table"
            version="v8"
            description="Headless UI for building powerful tables & datagrids. Full control over markup and enterprise-grade performance."
            colorClass="bg-yellow-500"
          />

          <TechCard
            icon={Zap}
            name="TanStack Query"
            version="v5"
            description="Powerful asynchronous state management. Auto-caching, refetching, and optimistic updates out of the box."
            colorClass="bg-red-500"
          />

          {/* Secondary Stack (Visual Variety) */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-[2rem] p-10 text-white flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <Code2 className="text-amber-400 mb-6" size={32} />
              <h4 className="text-2xl font-bold mb-4">TypeScript Native</h4>
              <p className="text-zinc-400 leading-relaxed max-w-sm">
                Every component, hook, and API route is strictly typed. Catch
                errors at build time, not in production.
              </p>
            </div>
            <div className="mt-8 flex gap-4 relative z-10">
              <span className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-mono">
                z.object(&#123; ... &#125;)
              </span>
              <span className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-mono">
                InferType&lt;T&gt;
              </span>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 right-10 w-64 h-64 border border-white rounded-full" />
              <div className="absolute top-20 right-20 w-64 h-64 border border-white rounded-full opacity-50" />
            </div>
          </div>

          <TechCard
            icon={Box}
            version="v0.562.0"
            name="Lucide React"
            description="A beautiful, consistent icon toolkit. High-performance SVG components that look crisp on every screen."
            colorClass="bg-pink-500"
          />

          <TechCard
            icon={Maximize}
            version="v4.0.0"
            name="Tailwind CSS"
            description="Utility-first styling for rapid UI development. Includes a custom configuration for this 'soft' aesthetic."
            colorClass="bg-cyan-500"
          />
        </div>

        {/* Deployment Footer */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-1 bg-zinc-100 border border-zinc-100 rounded-3xl overflow-hidden shadow-inner">
          <div className="bg-white p-10 flex flex-col justify-between aspect-square md:aspect-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
              Speed
            </span>
            <p className="text-2xl font-bold text-zinc-900 leading-tight">
              Optimized for Next.js 16 App Router.
            </p>
          </div>
          <div className="bg-white p-10 flex flex-col justify-between aspect-square md:aspect-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
              Scale
            </span>
            <p className="text-2xl font-bold text-zinc-900 leading-tight">
              Serverless-first Prisma v7 architecture.
            </p>
          </div>
          <div className="bg-white p-10 flex flex-col justify-between aspect-square md:aspect-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">
              Security
            </span>
            <p className="text-2xl font-bold text-zinc-900 leading-tight">
              Better Auth session management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
