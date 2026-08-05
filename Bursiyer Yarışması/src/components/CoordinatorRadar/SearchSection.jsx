import React from 'react';

export default function SearchSection({ searchQuery, setSearchQuery, isSearching, searchProcessingStep, onSearchSubmit, onPresetClick, presetQueries }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#E30A17] border border-red-200 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#E30A17] animate-pulse"></span>
        Claude LLM Semantik Arama & Vektör Matrisi
      </span>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Projeniz İçin Nitelikli Bursiyer Eşleştirmesi Yapın
      </h2>

      <form onSubmit={onSearchSubmit} className="relative mt-5 mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Örn: Veri analitiği yapabilen ve daha önce eğitim kamplarında takım kaptanlığı yapmış biri..."
            className="w-full bg-white text-slate-900 text-sm sm:text-base font-medium rounded-2xl pl-12 pr-32 py-4 shadow-md shadow-slate-200/50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E30A17]"
          />
          <div className="absolute left-4 text-slate-400">🔍</div>
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 bg-[#E30A17] hover:bg-[#C00813] text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md"
          >
            {isSearching ? "Analiz..." : "Eşleştir 🚀"}
          </button>
        </div>
      </form>

      {isSearching && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-[#E30A17] font-semibold animate-pulse flex justify-between">
          <span>⚡ {searchProcessingStep}</span>
          <span className="font-mono">Cosine Sim Latency: ~140ms</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 justify-center">
        <span className="text-xs font-bold text-slate-500 uppercase">Örnekler:</span>
        {presetQueries.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => onPresetClick(preset.text)}
            className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
