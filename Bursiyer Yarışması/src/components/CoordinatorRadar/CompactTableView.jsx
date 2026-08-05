import React from 'react';
import { maskPhoneNumber } from '../../utils/formatters';

export default function CompactTableView({ matchedCandidates, onSelectCandidate }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-extrabold">
              <th className="p-4">Aday ID</th>
              <th className="p-4">Ad Soyad & Unvan</th>
              <th className="p-4">Maskeli Telefon</th>
              <th className="p-4">Teknoloji Yığını</th>
              <th className="p-4 text-center">Uyum Skoru</th>
              <th className="p-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {matchedCandidates.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-900">{c.id}</td>
                <td className="p-4">
                  <div className="font-extrabold text-slate-900 text-sm">{c.fullName}</div>
                  <div className="text-[11px] text-slate-500">{c.title}</div>
                </td>
                <td className="p-4 font-mono text-slate-700 font-semibold">
                  {maskPhoneNumber(c.phone)}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {c.techStack.slice(0, 3).map((t, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded border">{t}</span>
                    ))}
                    {c.techStack.length > 3 && <span className="text-[10px] text-slate-400">+{c.techStack.length - 3}</span>}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="font-mono font-extrabold text-[#E30A17] bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
                    %{c.matchScore}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onSelectCandidate(c)}
                    className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-800"
                  >
                    İncele
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
