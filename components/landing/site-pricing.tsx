import { siteConfig } from '@/lib/constants';
import {
  ArrowRight,
  Check,
  Github,
  Heart,
  Infinity,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import React from 'react';

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 text-zinc-600 group/item">
    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center transition-colors group-hover/item:bg-emerald-500">
      <Check
        size={12}
        className="text-emerald-600 group-hover/item:text-white transition-colors"
      />
    </div>
    <span className="text-sm font-medium tracking-tight group-hover/item:text-zinc-900 transition-colors">
      {children}
    </span>
  </div>
);

export default function SitePricing() {
  return (
    <section
      id="pricing"
      className="py-32 px-6 relative overflow-hidden bg-zinc-900"
    >
      {/* Background soft focus glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200 mb-6">
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">
              Community Launch
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Everything you need. <br />
            <span className="text-amber-600 font-serif italic">
              On the house.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-300 text-lg leading-relaxed font-medium">
            Building the future of SaaS should be accessible. Get full access to
            the starter kit while we're in early-access.
          </p>
        </div>

        {/* --- The "Free Forever" Card --- */}
        <div className="relative group max-w-3xl mx-auto">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-violet-500 rounded-[3rem] blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200" />

          <div className="relative bg-white border border-white rounded-[3rem] overflow-hidden">
            <div className="grid md:grid-cols-5 h-full">
              {/* Left Side: Pricing Details */}
              <div className="md:col-span-3 p-10 md:p-14">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-amber-600 rounded-2xl flex items-center justify-center text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 leading-none">
                      Founder's Access
                    </h3>
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mt-1">
                      Early Adopter Tier
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-6xl font-black tracking-tighter text-zinc-900">
                    $0
                  </span>
                  <span className="text-zinc-400 font-bold text-lg">
                    /lifetime
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                  <FeatureItem>Next.js 16 (App Router)</FeatureItem>
                  <FeatureItem>Better Auth Native</FeatureItem>
                  <FeatureItem>Prisma v7 Latest</FeatureItem>
                  <FeatureItem>TanStack DataTables</FeatureItem>
                  <FeatureItem>Tailwind Premium UI</FeatureItem>
                  <FeatureItem>Unlimited Projects</FeatureItem>
                </div>

                <button className="w-full py-5 bg-zinc-900 text-white rounded-[2rem] font-bold md:text-lg flex items-center justify-center gap-3 hover:bg-zinc-800 hover:-translate-y-1 transition-all active:scale-95">
                  Get Lifetime Access <ArrowRight size={20} />
                </button>
              </div>

              {/* Right Side: Perks/Social Proof */}
              <div className="md:col-span-2 bg-zinc-50/50 p-10 md:p-14 border-l border-zinc-100 flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-white rounded-lg border border-zinc-100 flex items-center justify-center">
                      <Github size={16} className="text-zinc-900" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        Private Repo Access
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Direct access to the source code and future updates.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-white rounded-lg border border-zinc-100 flex items-center justify-center">
                      <Zap size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        Discord Community
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Join 500+ builders in our private engineering group.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-white rounded-lg border border-zinc-100 flex items-center justify-center">
                      <Infinity size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        Future Proof
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        All v1.x and v2.x updates included for free, forever.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-200">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 text-center">
                    Trusted by developers at
                  </p>
                  <div className="flex justify-center gap-6 grayscale opacity-40 text-xs font-bold">
                    <span>VERCEL</span>
                    <span>NETLIFY</span>
                    <span>LINEAR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Terminal Hint beneath --- */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-zinc-900 text-zinc-300 rounded-2xl font-mono text-xs border border-white/10 shadow-2xl">
            <Terminal size={14} className="text-emerald-400" />
            <span>npx launch-kit@latest init {siteConfig.short_name}</span>
            <button
              className="ml-4 hover:text-white transition-colors"
              title="Copy command"
            >
              <Check size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
