import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CandidateDetailModal from './components/CandidateDetailModal';

// Radar Modules
import KpiSummary from './components/CoordinatorRadar/KpiSummary';
import SearchSection from './components/CoordinatorRadar/SearchSection';
import CandidateCardsView from './components/CoordinatorRadar/CandidateCardsView';
import AnalyticsChartView from './components/CoordinatorRadar/AnalyticsChartView';
import CompactTableView from './components/CoordinatorRadar/CompactTableView';

// Bursiyer Portal Modules
import DashboardTab from './components/BursiyerPortal/DashboardTab';
import CvUploadTab from './components/BursiyerPortal/CvUploadTab';
import ProfileEditTab from './components/BursiyerPortal/ProfileEditTab';
import ChatTab from './components/BursiyerPortal/ChatTab';

// Data & Utils
import { INITIAL_CANDIDATES } from './data/mockCandidates';
import { INITIAL_CHAT_MESSAGES } from './data/mockChat';
import { evaluateVectorMatch } from './utils/aiEngine';
import { getRankDegree } from './utils/formatters';

export default function App() {
  const [activePortal, setActivePortal] = useState('koordinator');
  const [radarViewMode, setRadarViewMode] = useState('cards');
  const [bursiyerTab, setBursiyerTab] = useState('dashboard');

  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [currentUser, setCurrentUser] = useState(INITIAL_CANDIDATES[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("Veri analitiği yapabilen ve daha önce eğitim kamplarında takım kaptanlığı yapmış biri");
  const [isSearching, setIsSearching] = useState(false);
  const [minMatchFilter, setMinMatchFilter] = useState(50);
  const [selectedTechFilter, setSelectedTechFilter] = useState("HEPSİ");
  const [searchProcessingStep, setSearchProcessingStep] = useState("");

  // Chat State
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);

  const PRESET_QUERIES = [
    { label: "📊 Veri Analitiği & Kaptanlık", text: "Veri analitiği yapabilen ve daha önce eğitim kamplarında takım kaptanlığı yapmış biri" },
    { label: "🚁 İHA / Otonom & React", text: "İHA/GKS otonom sistem tasarlamış, React ve Firebase bilen geliştirici" },
    { label: "🏆 Teknofest Derecesi & Python", text: "Teknofest dereceli, Python, ROS2 ve görüntü işleme uzmanı" },
    { label: "🌐 Full-Stack & Firebase Security", text: "React, Tailwind CSS ve Firebase veritabanı uzmanı" }
  ];

  const matchedCandidates = useMemo(() => {
    return candidates.map(candidate => {
      const matchResult = evaluateVectorMatch(searchQuery, candidate);
      return {
        ...candidate,
        matchScore: matchResult.score,
        aiReason: matchResult.reason,
        rankDegree: getRankDegree(matchResult.score)
      };
    })
    .filter(c => c.matchScore >= minMatchFilter)
    .filter(c => selectedTechFilter === "HEPSİ" || c.techStack.includes(selectedTechFilter))
    .sort((a, b) => b.matchScore - a.matchScore);
  }, [candidates, searchQuery, minMatchFilter, selectedTechFilter]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setSearchProcessingStep("Claude LLM Metin Semantiği Çözümleniyor...");
    setTimeout(() => setSearchProcessingStep("Vektör Embedding Matrisi Hesaplanıyor (Cosine Similarity)..."), 200);
    setTimeout(() => setSearchProcessingStep("Yetkinlik Matrisi & Dereceler Sıralanıyor..."), 400);
    setTimeout(() => { setIsSearching(false); setSearchProcessingStep(""); }, 600);
  };

  const handlePresetClick = (queryText) => {
    setSearchQuery(queryText);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 350);
  };

  const handleLogin = (loginEmail) => {
    const found = candidates.find(c => c.email.toLowerCase() === loginEmail.toLowerCase());
    if (found) {
      setCurrentUser(found);
    } else {
      const newUser = {
        id: `BURS-2025-${Math.floor(100 + Math.random() * 900)}`,
        fullName: loginEmail.split('@')[0].toUpperCase(),
        title: "T3 Yeni Bursiyeri",
        location: "İstanbul (DENEYAP)",
        email: loginEmail,
        phone: "+90 500 000 00 00",
        bio: "T3 Vakfı yeni kayıtlı bursiyer profili.",
        github: "github.com",
        linkedin: "linkedin.com",
        badges: ["✨ Yeni Bursiyer"],
        techStack: ["React", "HTML", "Python"],
        competencies: { frontend: 80, autonomous: 70, cloud: 75, leadership: 80, ai: 70 },
        projectHistory: [{ title: "T3 Oryantasyon Eğitimi", category: "Eğitim", year: "2024", role: "Bursiyer" }],
        defaultScore: 80,
        baseReason: "Yeni kayıtlı bursiyer profili."
      };
      setCandidates(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
    }
    setShowAuthModal(false);
  };

  const handleSaveProfile = (profileForm) => {
    if (!currentUser) return;
    const updatedTechStack = profileForm.techStackStr.split(",").map(s => s.trim()).filter(Boolean);
    const updatedUser = {
      ...currentUser,
      fullName: profileForm.fullName,
      title: profileForm.title,
      location: profileForm.location,
      bio: profileForm.bio,
      github: profileForm.github,
      linkedin: profileForm.linkedin,
      techStack: updatedTechStack,
      competencies: {
        frontend: Number(profileForm.frontend),
        autonomous: Number(profileForm.autonomous),
        cloud: Number(profileForm.cloud),
        leadership: Number(profileForm.leadership),
        ai: Number(profileForm.ai)
      }
    };
    setCurrentUser(updatedUser);
    setCandidates(prev => prev.map(c => c.id === updatedUser.id ? updatedUser : c));
  };

  const handleSendMessage = (channel, text) => {
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: Date.now(),
      sender: currentUser.fullName,
      avatar: currentUser.fullName.split(' ').map(n => n[0]).join(''),
      time: time,
      text: text
    };
    setChatMessages(prev => ({ ...prev, [channel]: [...(prev[channel] || []), newMsg] }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col selection:bg-[#E30A17] selection:text-white relative">
      
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute -top-24 -left-24 w-[30rem] h-[30rem] bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-amber-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <Navbar
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* PORTAL 1: KOORDİNATÖR RADARI */}
      {activePortal === 'koordinator' && (
        <div className="flex-1 flex flex-col relative z-10">
          <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/80 border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <KpiSummary />
              <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSearching={isSearching}
                searchProcessingStep={searchProcessingStep}
                onSearchSubmit={handleSearchSubmit}
                onPresetClick={handlePresetClick}
                presetQueries={PRESET_QUERIES}
              />
            </div>
          </section>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
            
            {/* VIEW TOOLBAR */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900">{matchedCandidates.length}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aday Listeleniyor</span>
                </div>

                <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 ml-2">
                  <button
                    onClick={() => setRadarViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                      radarViewMode === 'cards' ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    🎴 Kart Görünümü
                  </button>
                  <button
                    onClick={() => setRadarViewMode('chart')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                      radarViewMode === 'chart' ? "bg-[#E30A17] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    📊 Analiz Grafiği
                  </button>
                  <button
                    onClick={() => setRadarViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                      radarViewMode === 'list' ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    📋 Liste Görünümü
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-500">Teknoloji:</label>
                  <select
                    value={selectedTechFilter}
                    onChange={(e) => setSelectedTechFilter(e.target.value)}
                    className="bg-slate-50 text-xs font-semibold border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E30A17]"
                  >
                    <option value="HEPSİ">Tüm Teknolojiler</option>
                    <option value="React">React</option>
                    <option value="Tailwind CSS">Tailwind CSS</option>
                    <option value="Firebase">Firebase</option>
                    <option value="Otonom Sistemler">Otonom Sistemler</option>
                    <option value="Python">Python</option>
                    <option value="Veri Analitiği">Veri Analitiği</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-500">Min Uyum:</label>
                  <input
                    type="range" min="50" max="95" step="5"
                    value={minMatchFilter}
                    onChange={(e) => setMinMatchFilter(Number(e.target.value))}
                    className="w-24 accent-[#E30A17]"
                  />
                  <span className="text-xs font-black text-[#E30A17] font-mono">%{minMatchFilter}</span>
                </div>
              </div>
            </div>

            {/* VIEWS */}
            {radarViewMode === 'cards' && (
              <CandidateCardsView matchedCandidates={matchedCandidates} onSelectCandidate={setSelectedCandidateDetail} />
            )}
            {radarViewMode === 'chart' && (
              <AnalyticsChartView matchedCandidates={matchedCandidates} />
            )}
            {radarViewMode === 'list' && (
              <CompactTableView matchedCandidates={matchedCandidates} onSelectCandidate={setSelectedCandidateDetail} />
            )}

          </main>
        </div>
      )}

      {/* PORTAL 2: BURSİYER PORTALI */}
      {activePortal === 'bursiyer' && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
          {!currentUser ? (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 border border-slate-200 shadow-xl text-center space-y-6 my-10">
              <div className="w-20 h-20 rounded-2xl bg-red-50 text-[#E30A17] flex items-center justify-center mx-auto text-3xl font-bold border border-red-200">🎓</div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">T3 Bursiyer Portalı'na Hoş Geldiniz</h2>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                  Özgeçmişinizi (CV) yüklemek, yetkinlik profilinizi güncellemek ve bursiyer topluluk sohbetine katılmak için lütfen oturum açın.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button onClick={() => setShowAuthModal(true)} className="bg-[#E30A17] text-white font-bold px-8 py-3.5 rounded-2xl text-xs shadow-lg">
                  🔑 Bursiyer Girişi Yap
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs mb-8 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => setBursiyerTab('dashboard')} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${bursiyerTab === 'dashboard' ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                    📊 Kişisel Özeti & Rozetler
                  </button>
                  <button onClick={() => setBursiyerTab('cv')} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${bursiyerTab === 'cv' ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                    📄 CV Yükle & AI Analizi
                  </button>
                  <button onClick={() => setBursiyerTab('profile')} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${bursiyerTab === 'profile' ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                    ✏️ Profilimi Düzenle
                  </button>
                  <button onClick={() => setBursiyerTab('chat')} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${bursiyerTab === 'chat' ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                    💬 Bursiyer Chat <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">3</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-700">{currentUser.fullName}</span>
                </div>
              </div>

              {bursiyerTab === 'dashboard' && <DashboardTab currentUser={currentUser} />}
              {bursiyerTab === 'cv' && <CvUploadTab currentUser={currentUser} />}
              {bursiyerTab === 'profile' && <ProfileEditTab currentUser={currentUser} onSaveProfile={handleSaveProfile} />}
              {bursiyerTab === 'chat' && <ChatTab currentUser={currentUser} chatMessages={chatMessages} onSendMessage={handleSendMessage} />}
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}
      {selectedCandidateDetail && <CandidateDetailModal candidate={selectedCandidateDetail} onClose={() => setSelectedCandidateDetail(null)} />}

      <Footer />
    </div>
  );
}
