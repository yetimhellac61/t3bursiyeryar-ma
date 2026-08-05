import React from 'react';
import { maskPhoneNumber } from '../../utils/formatters';

export default function CandidateCardsView({ matchedCandidates, onSelectCandidate }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {matchedCandidates.map((candidate) => (
        <div key={candidate.id} className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
          <div className={`h-1.5 w-full ${candidate.matchScore >= 90 ? "bg-[#E30A17]" : "bg-amber-500"}`}></div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center font-black text-[#E30A17] text-lg shrink-0 shadow-2xs">
                  {candidate.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{candidate.fullName}</h3>
                  <p className="text-xs text-slate-500">
                    <span className="font-mono font-semibold text-slate-700">{candidate.id}</span> • {candidate.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="bg-red-50 text-[#E30A17] border border-red-200 px-3 py-1.5 rounded-xl font-extrabold text-sm shrink-0">
                  %{candidate.matchScore} Uyum
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${candidate.rankDegree.badgeClass}`}>
                  {candidate.rankDegree.label}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#E30A17] rounded-r-xl p-3.5 mb-4 shadow-2xs">
              <span className="text-[11px] font-bold text-[#E30A17] uppercase block">Yapay Zekâ Eşleşme Gerekçesi:</span>
              <p className="text-xs text-slate-700 font-medium mt-1">"{candidate.aiReason}"</p>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-slate-500 block mb-1.5">Teknoloji Yığını:</span>
              <div className="flex flex-wrap gap-1.5">
                {candidate.techStack.map((tech, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-slate-500 block mb-1.5">Proje Geçmişi:</span>
              <div className="space-y-1.5">
                {candidate.projectHistory.map((proj, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-2 border border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{proj.title} <span className="text-slate-400 font-normal">({proj.role})</span></span>
                    <span className="bg-white text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border">{proj.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>📱 Tel:</span>
              <code className="font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                {maskPhoneNumber(candidate.phone)}
              </code>
            </div>
            <button
              onClick={() => onSelectCandidate(candidate)}
              className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs"
            >
              Profil Detayı
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
