import React from 'react';
import { T3VakfiLogo, TeknofestLogo } from './Logos';

export default function Navbar({ activePortal, setActivePortal, currentUser, onLogout, onOpenAuth }) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <T3VakfiLogo />
          <div className="h-6 w-[1px] bg-slate-300 hidden sm:block"></div>
          <div className="hidden sm:block">
            <TeknofestLogo />
          </div>
        </div>

        {/* NAVIGATION PORTALS */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => setActivePortal('koordinator')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activePortal === 'koordinator'
                  ? "bg-[#E30A17] text-white shadow-md shadow-red-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🎯 Koordinatör Radarı</span>
            </button>

            <button
              onClick={() => setActivePortal('bursiyer')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activePortal === 'bursiyer'
                  ? "bg-[#E30A17] text-white shadow-md shadow-red-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🎓 Bursiyer Portalı</span>
            </button>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center border border-slate-700 shadow-xs">
                {currentUser.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-extrabold text-slate-900 leading-tight">{currentUser.fullName}</div>
                <span className="text-[10px] font-mono text-slate-500">{currentUser.id}</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-[#E30A17] text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 transition-colors"
              >
                🚪 Çıkış
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-[#E30A17] hover:bg-[#C00813] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-red-500/20 transition-all"
            >
              🔑 Bursiyer Girişi
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
