import React from 'react';

export default function AnalyticsChartView({ matchedCandidates }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900">📊 Uyum ve Derece Sıralama Analiz Grafiği</h3>
            <p className="text-xs text-slate-500 mt-0.5">Arama algoritmasının ürettiği Cosine Similarity vektör puanlarının aday bazlı görsel karşılaştırması.</p>
          </div>
          <span className="bg-red-50 text-[#E30A17] font-bold text-xs px-3 py-1 rounded-full border border-red-200">
            Canlı Vektör Hesabı
          </span>
        </div>

        <div className="space-y-6">
          {matchedCandidates.map((c, index) => (
            <div key={c.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-400">#{index + 1}</span>
                  <span className="font-extrabold text-slate-900 text-sm">{c.fullName}</span>
                  <span className="font-mono text-slate-400 text-xs">({c.id})</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.rankDegree.badgeClass}`}>
                    {c.rankDegree.label}
                  </span>
                </div>

                <span className="font-mono font-black text-sm text-[#E30A17]">%{c.matchScore} Uyum</span>
              </div>

              <div className="w-full bg-slate-100 h-5 rounded-xl overflow-hidden p-1 border border-slate-200 flex items-center relative">
                <div
                  className="h-full rounded-lg bg-gradient-to-r from-[#E30A17] via-red-500 to-amber-500 transition-all duration-700 shadow-sm"
                  style={{ width: `${c.matchScore}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-500 italic pl-1">"{c.aiReason}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h3 className="font-extrabold text-lg text-slate-900 mb-4">🕸️ 5 Boyutlu Yetkinlik Radarı Matrisi</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-extrabold">
                <th className="p-3">Aday Adı</th>
                <th className="p-3">Derece</th>
                <th className="p-3 text-center">Frontend</th>
                <th className="p-3 text-center">Otonom Sistemler</th>
                <th className="p-3 text-center">Cloud & Firebase</th>
                <th className="p-3 text-center">Takım Liderliği</th>
                <th className="p-3 text-center">Yapay Zekâ / AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {matchedCandidates.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-slate-900">{c.fullName}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.rankDegree.badgeClass}`}>
                      {c.rankDegree.label}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-[#E30A17]">{c.competencies.frontend}%</td>
                  <td className="p-3 text-center font-mono font-bold text-sky-700">{c.competencies.autonomous}%</td>
                  <td className="p-3 text-center font-mono font-bold text-amber-700">{c.competencies.cloud}%</td>
                  <td className="p-3 text-center font-mono font-bold text-emerald-700">{c.competencies.leadership}%</td>
                  <td className="p-3 text-center font-mono font-bold text-purple-700">{c.competencies.ai}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
