/**
 * KVKK Standartlarına Uygun Telefon Numarası Maskeleme Yardımcısı
 * Örn: "+90 532 410 45 91" -> "+90 532 *** 45 91"
 */
export const maskPhoneNumber = (phoneStr) => {
  if (!phoneStr) return "+90 5** *** ** **";
  const parts = phoneStr.split(' ');
  if (parts.length >= 4) {
    return `${parts[0]} ${parts[1]} *** ${parts[3]} ${parts[4] || ''}`.trim();
  }
  return phoneStr.replace(/(\d{3})\d{3}(\d{4})/, "$1***$2");
};

/**
 * Derece Seviyesi Badge Formatlayıcısı
 */
export const getRankDegree = (score) => {
  if (score >= 90) return { label: "🥇 S-Seviye (Mükemmel Uyum)", badgeClass: "bg-[#E30A17] text-white border-red-300" };
  if (score >= 85) return { label: "🥈 A-Seviye (Yüksek Uyum)", badgeClass: "bg-emerald-600 text-white border-emerald-300" };
  if (score >= 75) return { label: "🥉 B-Seviye (Orta-İleri Uyum)", badgeClass: "bg-sky-600 text-white border-sky-300" };
  return { label: "🎖️ C-Seviye (Temel Uyum)", badgeClass: "bg-amber-600 text-white border-amber-300" };
};
