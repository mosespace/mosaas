import {
  BarChart2,
  Bell,
  ChevronRight,
  Globe,
  MessageSquare,
  PlusCircle,
  Settings,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import AppleStyleDataTable from './showcase';

const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="w-8 h-8 rounded-full" />
);

export default function UiKit() {
  return (
    <section
      id="ui-kit"
      className="py-32 px-6 bg-linear-to-br from-[#F8F9FB] to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full border border-amber-50 mb-6">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
              The Component Lab
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Data, but <span className="text-amber-600">delightful.</span>
          </h2>
          <p className="max-w-2xl text-slate-500 text-lg leading-relaxed">
            A TanStack Table v8 implementation that handles thousands of rows
            with ease, featuring faceted filters, bulk actions, and
            high-fidelity UI.
          </p>
        </div>

        {/* --- Main DataTable Showcase --- */}
        <AppleStyleDataTable />

        {/* --- Secondary Component Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card: Charts */}
          <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-xs">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <BarChart2 size={24} />
              </div>
              <h4 className="text-xl font-bold text-zinc-900">
                Revenue Trends
              </h4>
            </div>
            {/* Simple chart visualization */}
            <div className="h-40 bg-zinc-50 rounded-xl flex items-end p-4 gap-2">
              <div className="w-8 h-2/3 bg-red-200 rounded-md" />
              <div className="w-8 h-1/2 bg-red-200 rounded-md" />
              <div className="w-8 h-3/4 bg-red-300 rounded-md" />
              <div className="w-8 h-full bg-red-400 rounded-md" />
              <div className="w-8 h-2/5 bg-red-200 rounded-md" />
            </div>
            <p className="text-sm text-zinc-500 mt-6">
              Powered by Recharts or Chart.js for beautiful data visualization.
            </p>
          </div>

          {/* Card: Notifications */}
          <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-xs">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Bell size={24} />
              </div>
              <h4 className="text-xl font-bold text-zinc-900">
                Notification Center
              </h4>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Avatar
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=N1"
                  alt="User 1"
                />
                <div>
                  <p className="font-medium text-zinc-900">
                    New user signed up!
                  </p>
                  <p className="text-xs text-zinc-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=N2"
                  alt="User 2"
                />
                <div>
                  <p className="font-medium text-zinc-900">
                    Stripe payment failed.
                  </p>
                  <p className="text-xs text-red-500">1 hour ago</p>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full text-amber-600 bg-amber-50 font-medium py-3 rounded-xl hover:bg-amber-100 transition-colors">
              View all notifications
            </button>
          </div>

          {/* Card: Quick Actions */}
          <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-xs">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <PlusCircle size={24} />
              </div>
              <h4 className="text-xl font-bold text-zinc-900">Quick Actions</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:bg-zinc-100 transition-colors">
                <UserCircle size={24} className="text-blue-600 mb-2" />
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:bg-zinc-100 transition-colors">
                <Settings size={24} className="text-zinc-600 mb-2" />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:bg-zinc-100 transition-colors">
                <MessageSquare size={24} className="text-amber-600 mb-2" />
                <span className="text-sm font-medium">Support</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:bg-zinc-100 transition-colors">
                <Globe size={24} className="text-green-600 mb-2" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
