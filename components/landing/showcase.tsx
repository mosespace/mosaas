'use client';

import {
  Check,
  Command,
  Mail,
  Maximize2,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';

const USERS = [
  {
    id: '1',
    name: 'Adrian Kozak',
    email: 'adrian@linear.app',
    role: 'Product Lead',
    status: 'Active',
    plan: 'Enterprise',
    usage: 84,
  },
  {
    id: '2',
    name: 'Sarah Drasner',
    email: 'sarah@netlify.com',
    role: 'DX Engineer',
    status: 'Active',
    plan: 'Pro',
    usage: 42,
  },
  {
    id: '3',
    name: 'Guillermo Rauch',
    email: 'g@vercel.com',
    role: 'CEO',
    status: 'Active',
    plan: 'Enterprise',
    usage: 99,
  },
  {
    id: '4',
    name: 'Lee Robinson',
    email: 'lee@nextjs.org',
    role: 'Head of DevRel',
    status: 'Away',
    plan: 'Pro',
    usage: 12,
  },
];

export default function AppleStyleDataTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredUsers = USERS.filter((user) => {
    const q = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.role.toLowerCase().includes(q) ||
      user.plan.toLowerCase().includes(q)
    );
  });

  const toggleSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="px-3 pb-16">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-black mb-2">
            Demo V0.0.5
          </h1>
          <p className="text-zinc-500 text-sm md:text-base font-medium">
            When you get this, you will get this table version as well which is
            optimized for fast loads .
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
                setExpandedRow(null);
                setSelectedRows([]);
              }}
              className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur-md border border-zinc-200 rounded-full text-sm focus:ring-4 focus:ring-amber-100 transition-all outline-none w-64"
            />
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-500 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Invite Member
          </button>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="relative bg-white/70 backdrop-blur-2xl rounded-xl border overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-zinc-100">
              <th className="p-6 w-12">
                <div
                  onClick={() =>
                    setSelectedRows(
                      selectedRows.length === USERS.length
                        ? []
                        : filteredUsers.map((u) => u.id),
                    )
                  }
                  className={`w-5 h-5 rounded-md border-2 transition-all cursor-pointer flex items-center justify-center ${selectedRows.length > 0 ? 'bg-amber-600 border-amber-600' : 'border-zinc-200 bg-white'}`}
                >
                  {selectedRows.length > 0 && (
                    <Check size={12} className="text-white" strokeWidth={4} />
                  )}
                </div>
              </th>
              <th className="p-6 text-[13px] font-semibold text-zinc-400 uppercase tracking-wider">
                Member
              </th>
              <th className="p-6 text-[13px] font-semibold text-zinc-400 uppercase tracking-wider">
                Role
              </th>
              <th className="p-6 text-[13px] font-semibold text-zinc-400 uppercase tracking-wider">
                Plan
              </th>
              <th className="p-6 text-[13px] font-semibold text-zinc-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr className="h-[50vh]">
                <td colSpan={5} className="p-10 text-center text-zinc-400">
                  No members found
                </td>
              </tr>
            )}

            {filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr
                  onClick={() =>
                    setExpandedRow(expandedRow === user.id ? null : user.id)
                  }
                  className={`group cursor-pointer transition-all duration-300 ${expandedRow === user.id ? 'bg-amber-50/50' : 'hover:bg-zinc-50'}`}
                >
                  <td className="p-6" onClick={(e) => e.stopPropagation()}>
                    <div
                      onClick={() => toggleSelect(user.id)}
                      className={`w-5 h-5 rounded-md border-2 transition-all cursor-pointer flex items-center justify-center ${selectedRows.includes(user.id) ? 'bg-amber-600 border-amber-600' : 'border-zinc-200 bg-white'}`}
                    >
                      {selectedRows.includes(user.id) && (
                        <Check
                          size={12}
                          className="text-white"
                          strokeWidth={4}
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-100 to-white flex items-center justify-center font-bold text-amber-600 border border-amber-50">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-16 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${user.usage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-zinc-400">
                        {user.plan}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 rounded-full hover:bg-white transition-colors text-zinc-400 hover:text-amber-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>

                {/* --- Smooth Expandable Row --- */}
                {expandedRow === user.id && (
                  <tr className="bg-amber-50/30">
                    <td colSpan={5} className="p-8 border-t border-amber-100">
                      <div className="grid grid-cols-3 gap-12 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400">
                            Security Details
                          </h4>
                          <div className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                            <Shield size={16} className="text-amber-500" />{' '}
                            Multi-factor Auth Active
                          </div>
                          <div className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                            <Command size={16} className="text-zinc-400" /> Last
                            login from London, UK
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400">
                            Activity Log
                          </h4>
                          <div className="text-xs text-zinc-500 border-l-2 border-amber-200 pl-4 py-1">
                            <p className="font-bold text-zinc-700">
                              Modified "Invoices" table
                            </p>
                            <p>Yesterday at 4:20 PM</p>
                          </div>
                        </div>
                        <div className="flex justify-end items-center gap-3">
                          <button className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-bold text-red-500 hover:bg-red-50 transition-all">
                            Revoke Access
                          </button>
                          <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center gap-2">
                            <Maximize2 size={14} /> View Full Profile
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* --- Bottom Floating Bulk Actions --- */}
        {selectedRows.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl flex items-center gap-6 animate-in fade-in zoom-in duration-300 z-50 border border-white/10">
            <span className="text-sm font-medium border-r border-white/20 pr-6">
              <span className="text-amber-400 font-bold">
                {selectedRows.length}
              </span>{' '}
              members selected
            </span>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-xs font-bold hover:text-amber-300 transition-all">
                <Mail size={14} /> Send Email
              </button>
              <button className="flex items-center gap-2 text-xs font-bold hover:text-amber-300 transition-all">
                <UserPlus size={14} /> Change Role
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-all">
                <Trash2 size={14} /> Delete
              </button>
            </div>
            <button
              onClick={() => setSelectedRows([])}
              className="ml-4 p-1 hover:bg-white/10 rounded-full transition-all"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* --- Dialog / Popover Invitation --- */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-100 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl md:rounded-[2.5rem] w-full max-w-md p-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-zinc-900">
                  Invite Team
                </h3>
                <p className="text-zinc-500">Add members to your workspace.</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-2 hover:bg-zinc-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@doe.com"
                  className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:ring-4 focus:ring-amber-100 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
                  Permission Level
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  <button className="p-4 border-2 border-amber-600 bg-amber-50 rounded-2xl text-left">
                    <p className="font-bold text-sm text-amber-700">Member</p>
                    <p className="text-[10px] text-amber-500">
                      Standard access
                    </p>
                  </button>
                  <button className="p-4 border-2 border-zinc-100 rounded-2xl text-left hover:border-zinc-200 transition-all">
                    <p className="font-bold text-sm text-zinc-900">Admin</p>
                    <p className="text-[10px] text-zinc-500">Full control</p>
                  </button>
                </div>
              </div>
              <Button
                disabled
                className="w-full h-16 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all"
              >
                Send Invitations
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
