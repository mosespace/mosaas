import { Fingerprint, LayoutGrid, TableIcon } from 'lucide-react';

const SectionHeading = ({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) => (
  <div className="flex flex-col items-center text-center mb-20">
    <span className="px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase text-amber-500 bg-amber-50 rounded-full mb-6">
      {badge}
    </span>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
      {title}
    </h2>
    <p className="max-w-xl text-zinc-500 text-lg leading-relaxed">{subtitle}</p>
  </div>
);

export default function SiteFeatures() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="Engineered Stack"
        title="The foundation for 10k users."
        subtitle="Everything you need to go from idea to IPO without touching your config files."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Better Auth */}
        <div className="relative group p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-500">
          <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
            <Fingerprint size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Secure by Default</h3>
          <p className="text-zinc-500 leading-relaxed mb-6">
            Full <b>Better Auth</b> implementation. MFA, social logins, and
            session management that actually works.
          </p>
          <div className="flex gap-2">
            {['OAuth', 'MFA', 'RBAC'].map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold px-2 py-1 bg-zinc-50 text-zinc-400 rounded-md uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: UI Kit */}
        <div className="relative group p-10 bg-zinc-900 text-white rounded-[2.5rem] overflow-hidden">
          <div className="relative z-10">
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
              <LayoutGrid size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Dashboard UI</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              30+ pre-built components designed for heavy data workflows and
              smooth user navigation.
            </p>
            <div className="h-1 w-24 bg-amber-500 rounded-full" />
          </div>
          {/* Soft Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-[60px]" />
        </div>

        {/* Card 3: DataTable */}
        <div className="relative group p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
            <TableIcon size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-4">DataTable Engine</h3>
          <p className="text-zinc-500 leading-relaxed mb-6">
            Powerful server-side tables with TanStack. Sorting, filtering, and
            export to CSV/PDF included.
          </p>
          <div className="flex flex-col gap-2">
            <div className="h-2 w-full bg-zinc-50 rounded" />
            <div className="h-2 w-2/3 bg-zinc-50 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
