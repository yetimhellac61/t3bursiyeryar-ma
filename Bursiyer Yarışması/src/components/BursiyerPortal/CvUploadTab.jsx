import React, { useState } from 'react';

export default function CvUploadTab({ currentUser, onCvParsed }) {
  const [isParsingCv, setIsParsingCv] = useState(false);
  const [cvAnalysisResult, setCvAnalysisResult] = useState(null);

  const handleCvUploadSimulation = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file || !currentUser) return;
    setIsParsingCv(true);
    setCvAnalysisResult(null);

    setTimeout(() => {
      setIsParsingCv(false);
      const result = {
        fileName: file.name,
        extractedSkills: ["React 18", "Tailwind CSS", "Firebase Auth", "Python 3.12", "ROS2", "Teknofest İHA Finalisti"],
        vectorEmbeddingStatus: "✅ Yapay Zekâ Vektör Profilinize İşlendi!",
        matchScoreImprovement: "+15% Uyum Artışı Kazandınız"
      };
      setCvAnalysisResult(result);
      if (onCvParsed) onCvParsed(result);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-xs">
      <div className="w-16 h-16 bg-red-50 text-[#E30A17] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">📂</div>
      <h3 className="text-xl font-extrabold text-slate-900">Özgeçmişinizi (CV) Yükleyin</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">Yapay Zekâ (Claude LLM) CV dosyanızdaki yetkinlikleri ayıklar ve radardaki puanınızı artırır.</p>

      <div className="mt-6 border-2 border-dashed border-slate-300 hover:border-[#E30A17] rounded-2xl p-8 bg-slate-50 transition-all relative">
        <input type="file" accept=".pdf,.docx,.doc" onChange={handleCvUploadSimulation} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        <span className="text-xs font-bold text-slate-700">📁 PDF veya Word Dosyası Yükleyin (.PDF, .DOCX)</span>
      </div>

      {isParsingCv && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-xs font-semibold text-[#E30A17] animate-pulse">
          ⚡ Claude LLM CV Metnini Ayrıştırıyor ve Vektör Embeddings Oluşturuyor...
        </div>
      )}

      {cvAnalysisResult && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-left">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-emerald-900 text-sm">✅ CV Yapay Zekâ Analizi Tamamlandı!</h4>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">{cvAnalysisResult.matchScoreImprovement}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {cvAnalysisResult.extractedSkills.map((sk, idx) => (
              <span key={idx} className="bg-white text-emerald-900 text-xs font-semibold px-2 py-1 rounded border border-emerald-200">{sk}</span>
            ))}
          </div>
          <p className="text-xs text-emerald-800 font-medium">{cvAnalysisResult.vectorEmbeddingStatus}</p>
        </div>
      )}
    </div>
  );
}
