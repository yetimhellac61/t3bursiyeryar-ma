import React from 'react';
import { maskPhoneNumber } from '../utils/formatters';

export default function CandidateDetailModal({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#E30A17] font-bold text-base flex items-center justify-center border border-red-200">
            {candidate.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">{candidate.fullName}</h3>
            <span className="text-xs font-mono text-slate-500">{candidate.id}</span>
          </div>
        </div>
        
        <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-2 mb-4">
          <div className="flex justify-between"><b>E-Posta:</b> <span className="font-mono">{candidate.email}</span></div>
          <div className="flex justify-between"><b>Telefon (Maskeli):</b> <span className="font-mono font-bold text-red-600">{maskPhoneNumber(candidate.phone)}</span></div>
          <div className="flex justify-between"><b>Yer / Atölye:</b> {candidate.location}</div>
          <div className="flex justify-between"><b>En Yüksek Uyum:</b> <span className="font-bold text-[#E30A17]">%{candidate.matchScore}</span></div>
        </div>
        
        <button onClick={onClose} className="w-full bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl">
          Kapat
        </button>
      </div>
    </div>
  );
}
