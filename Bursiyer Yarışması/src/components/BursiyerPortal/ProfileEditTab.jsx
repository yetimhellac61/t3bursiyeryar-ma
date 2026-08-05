import React, { useState } from 'react';

export default function ProfileEditTab({ currentUser, onSaveProfile }) {
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser ? currentUser.fullName : "",
    title: currentUser ? currentUser.title : "",
    location: currentUser ? currentUser.location : "",
    bio: currentUser ? currentUser.bio : "",
    github: currentUser ? currentUser.github || "" : "",
    linkedin: currentUser ? currentUser.linkedin || "" : "",
    techStackStr: currentUser ? currentUser.techStack.join(", ") : "",
    frontend: currentUser ? currentUser.competencies.frontend : 85,
    autonomous: currentUser ? currentUser.competencies.autonomous : 80,
    cloud: currentUser ? currentUser.competencies.cloud : 80,
    leadership: currentUser ? currentUser.competencies.leadership : 85,
    ai: currentUser ? currentUser.competencies.ai : 75
  });
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(profileForm);
    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
      <h3 className="text-lg font-extrabold text-slate-900 mb-1">Bursiyer Profilini Düzenle</h3>
      <p className="text-xs text-slate-500 mb-6">Profil bilgileriniz koordinatörlerin yapay zekâ radarına anında yansır.</p>

      {profileSavedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold mb-4">
          ✅ Profiliniz başarıyla güncellendi! Radarda üst sıralara yansıtıldı.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold block mb-1">Ad Soyad</label>
            <input type="text" value={profileForm.fullName} onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-semibold" />
          </div>
          <div>
            <label className="font-bold block mb-1">Unvan</label>
            <input type="text" value={profileForm.title} onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-semibold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold block mb-1">Şehir / Atölye</label>
            <input type="text" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-semibold" />
          </div>
          <div>
            <label className="font-bold block mb-1">Teknoloji Yığını (Virgülle Ayırın)</label>
            <input type="text" value={profileForm.techStackStr} onChange={(e) => setProfileForm({ ...profileForm, techStackStr: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-semibold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold block mb-1">GitHub Adresi</label>
            <input type="text" value={profileForm.github} onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-medium" />
          </div>
          <div>
            <label className="font-bold block mb-1">LinkedIn Adresi</label>
            <input type="text" value={profileForm.linkedin} onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-medium" />
          </div>
        </div>

        <div>
          <label className="font-bold block mb-1">Biyografi</label>
          <textarea rows="3" value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} className="w-full bg-slate-50 border rounded-xl p-2.5 font-medium"></textarea>
        </div>

        <div className="flex justify-end pt-3">
          <button type="submit" className="bg-[#E30A17] hover:bg-[#C00813] text-white font-bold px-6 py-2.5 rounded-xl shadow-md">
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
