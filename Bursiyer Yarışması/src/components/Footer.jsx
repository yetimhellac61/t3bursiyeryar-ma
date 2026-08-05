import React from 'react';
import { T3VakfiLogo } from './Logos';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <T3VakfiLogo />
          <span>•</span>
          <span className="font-bold text-slate-800">Teknofest Destekli Yetkinlik Radarı</span>
        </div>
        <p>© 2026 T3 Vakfı Geliştirici Ekibi. Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
}
