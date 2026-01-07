import { siteConfig } from '@/lib/constants';

export default function SiteFooter() {
  return (
    <footer className="py-20 bg-white px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start border-t border-zinc-100 pt-12 gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="font-bold uppercase tracking-tighter text-xl">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            The only starter kit that doesn't feel like a boilerplate. Built for
            the next generation of SaaS founders.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-4 text-sm">
            <span className="font-bold text-zinc-900 uppercase tracking-widest text-[10px]">
              Product
            </span>
            <a href="#" className="text-zinc-500 hover:text-zinc-900">
              Features
            </a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900">
              UI Components
            </a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900">
              Architecture
            </a>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <span className="font-bold text-zinc-900 uppercase tracking-widest text-[10px]">
              Support
            </span>
            <a href="#" className="text-zinc-500 hover:text-zinc-900">
              Docs
            </a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900">
              Community
            </a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
