import { Zap } from 'lucide-react';

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteCodePreview() {
  return (
    <section className="py-24 px-6 bg-[#111] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8">
            Engineered for <br />
            <span className="text-amber-400 font-serif italic">
              Developer Happiness.
            </span>
          </h2>
          <ul className="space-y-6">
            {[
              {
                title: 'Type Safe Everything',
                desc: 'End-to-end types with Prisma and Zod.',
              },
              {
                title: 'Instant Deployment',
                desc: 'Pre-configured for Vercel and Docker.',
              },
              {
                title: 'Global Edge Runtime',
                desc: 'Ready for Next.js 16 edge functions.',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-2 shadow-2xl">
            <div className="bg-zinc-900 rounded-xl p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <p className="text-pink-400">export default async function</p>
              <p className="text-white">DashboardPage() {'{'}</p>
              <p className="text-amber-400 pl-4">
                const session = await auth.getSession();
              </p>
              <p className="text-zinc-500 pl-4">// Securely fetch your data</p>
              <p className="text-amber-400 pl-4">
                const data = await db.user.findMany();
              </p>
              <p className="text-white pl-4 mt-4">return {'<'}</p>
              <p className="text-amber-300 pl-8">
                DataTable columns={'{'}cols{'}'} data={'{'}data{'}'} /&gt;
              </p>
              <p className="text-white pl-4">);</p>
              <p className="text-white">{'}'}</p>
            </div>
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-amber-600 p-4 rounded-xl shadow-xl flex items-center gap-3">
            <Zap className="text-white" fill="white" size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">
              Ultra Fast
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
