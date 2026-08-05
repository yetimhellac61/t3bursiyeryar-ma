import React, { useState } from 'react';

export default function AuthModal({ onClose, onLogin }) {
  const [authMode, setAuthMode] = useState('login');
  const [loginEmail, setLoginEmail] = useState("ahmet.yilmaz@t3burs.org");
  const [loginPassword, setLoginPassword] = useState("123456");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword, authMode);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E30A17] font-bold text-xl flex items-center justify-center mx-auto mb-3 border border-red-100">T3</div>
          <h3 className="font-extrabold text-xl text-slate-900">{authMode === 'login' ? "Bursiyer Girişi" : "Yeni Bursiyer Kaydı"}</h3>
          <p className="text-xs text-slate-500 mt-1">T3 Vakfı E-Posta hesabınızla oturum açın.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">T3 E-Posta Adresi</label>
            <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="ahmet.yilmaz@t3burs.org" className="w-full bg-slate-50 border rounded-xl p-2.5 font-semibold" />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Parola</label>
            <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border rounded-xl p-2.5 font-semibold" />
          </div>
          <button type="submit" className="w-full bg-[#E30A17] text-white font-bold py-3 rounded-xl shadow-md text-xs mt-2">
            {authMode === 'login' ? "Giriş Yap 🚀" : "Kayıt Ol & Başla"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t text-center text-xs text-slate-500">
          {authMode === 'login' ? (
            <p>Hesabınız yok mu? <button onClick={() => setAuthMode('register')} className="font-bold text-[#E30A17]">Kayıt Olun</button></p>
          ) : (
            <p>Zaten hesabınız var mı? <button onClick={() => setAuthMode('login')} className="font-bold text-[#E30A17]">Giriş Yapın</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
