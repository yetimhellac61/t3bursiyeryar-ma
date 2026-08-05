/**
 * Claude LLM Cosine Similarity tabanlı vektör arama simülasyonu
 */
export const evaluateVectorMatch = (query, candidate) => {
  if (!query || query.trim() === "") return { score: candidate.defaultScore, reason: candidate.baseReason };

  const qLower = query.toLowerCase();
  let scoreBoost = 0;
  let matchedTerms = [];

  const terms = [
    { kw: ["veri analitiği", "veri analizi", "pandas", "sql", "veri"], weight: 18, term: "Veri Analitiği" },
    { kw: ["takım kaptanı", "kaptan", "liderlik", "eğitim kampı", "eğitmen"], weight: 16, term: "Takım Kaptanlığı" },
    { kw: ["iha", "otonom", "gks", "deniz aracı", "ida", "ros2"], weight: 20, term: "Otonom Sistemler (İHA/İDA)" },
    { kw: ["react", "tailwind", "frontend", "html", "geliştirici"], weight: 15, term: "React/Tailwind Frontend" },
    { kw: ["firebase", "firestore", "güvenlik", "node"], weight: 16, term: "Firebase & Bulut Teknolojileri" },
    { kw: ["python", "teknofest", "yapay zekâ", "nlp", "claude", "pytorch"], weight: 15, term: "Yapay Zekâ / Teknofest" }
  ];

  terms.forEach(t => {
    if (t.kw.some(k => qLower.includes(k))) {
      const matchesTech = candidate.techStack.some(ts => t.kw.some(k => ts.toLowerCase().includes(k)));
      const matchesProj = candidate.projectHistory.some(p => t.kw.some(k => p.title.toLowerCase().includes(k) || p.role.toLowerCase().includes(k)));
      
      if (matchesTech || matchesProj) {
        scoreBoost += t.weight;
        matchedTerms.push(t.term);
      }
    }
  });

  let computedScore = Math.min(98, Math.max(62, 58 + scoreBoost));
  let generatedReason = matchedTerms.length > 0
    ? `Aday; ${matchedTerms.join(", ")} alanlarındaki tecrübesi ve aktif proje geçmişi nedeniyle aramanızla %${computedScore} eşleşmektedir.`
    : `Aday, genel mühendislik ve proje yetkinlikleri çerçevesinde aramanızla %${computedScore} temel uyum göstermektedir.`;

  return { score: computedScore, reason: generatedReason };
};
