import React from 'react';

export default function DashboardTab({ currentUser }) {
  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E30A17] to-red-700 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-white/20 shadow-md">
            {currentUser.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold">{currentUser.fullName}</h2>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">Aktif Bursiyer</span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">{currentUser.title} • {currentUser.location}</p>
            <p className="text-xs text-slate-300 mt-2 max-w-xl font-normal leading-relaxed">{currentUser.bio}</p>
          </div>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 text-center shrink-0 w-full md:w-auto">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Yapay Zekâ Profil Sağlığı</span>
          <span className="text-3xl font-black text-[#E30A17] font-mono">%{currentUser.defaultScore}</span>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">Radarda Üst Sıralardasınız</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h3 className="font-extrabold text-base text-slate-900 mb-3">🏆 Başarı Rozetleriniz</h3>
          <div className="flex flex-wrap gap-2">
            {(currentUser.badges || ["🏆 Teknofest Dereceli", "⚡ T3 Geliştiricisi"]).map((b, i) => (
              <span key={i} className="bg-red-50 text-[#E30A17] text-xs font-bold px-3 py-1.5 rounded-xl border border-red-200">{b}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h3 className="font-extrabold text-base text-slate-900 mb-3">💻 Kayıtlı Teknoloji Yınınız</h3>
          <div className="flex flex-wrap gap-1.5">
            {currentUser.techStack.map((tech, i) => (
              <span key={i} className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
