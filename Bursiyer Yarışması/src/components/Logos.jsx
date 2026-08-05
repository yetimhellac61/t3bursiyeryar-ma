import React from 'react';

export const T3VakfiLogo = () => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E30A17] to-[#B80712] flex items-center justify-center text-white font-black text-xl shadow-md shadow-red-500/20 border border-white/20">
      T3
    </div>
    <div className="flex flex-col">
      <span className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">T3 VAKFI</span>
      <span className="text-[10px] font-bold text-red-600 tracking-wider">TÜRKİYE TEKNOLOJİ TAKIMI</span>
    </div>
  </div>
);

export const TeknofestLogo = () => (
  <div className="flex items-center gap-2 bg-slate-100/80 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-all">
    <svg className="w-5 h-5 text-[#E30A17]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
    <div className="flex flex-col">
      <span className="font-black text-xs text-[#E30A17] tracking-wider leading-none">TEKNOFEST</span>
      <span className="text-[8px] font-bold text-slate-500">MİLLİ TEKNOLOJİ HAMLESİ</span>
    </div>
  </div>
);
