'use client';

import { siteConfig } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function SiteNav() {
  const router = useRouter();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="font-bold tracking-tighter uppercase">
            {siteConfig.short_name}
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <a href="/#framework" className="hover:text-amber-600">
            Framework
          </a>
          <a href="/#ui-kit" className="hover:text-amber-600">
            UI Kit
          </a>
          <a href="/#pricing" className="hover:text-amber-600">
            Pricing
          </a>
        </div>
        <button
          onClick={() => router.push(`/auth/login`)}
          className="bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform"
        >
          Buy Now $0
        </button>
      </div>
    </nav>
  );
}
