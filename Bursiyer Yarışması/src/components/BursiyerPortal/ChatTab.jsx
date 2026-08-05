import React, { useState } from 'react';

export default function ChatTab({ currentUser, chatMessages, onSendMessage }) {
  const [activeChannel, setActiveChannel] = useState("teknofest-takim");
  const [newMessageText, setNewMessageText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !currentUser) return;
    onSendMessage(activeChannel, newMessageText);
    setNewMessageText("");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row h-[600px]">
      <div className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white text-sm mb-4">💬 Bursiyer Kanalları</h3>
          <div className="space-y-1">
            <button onClick={() => setActiveChannel("teknofest-takim")} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeChannel === "teknofest-takim" ? "bg-[#E30A17] text-white" : "text-slate-400 hover:text-white"}`}># teknofest-takim-arayanlar</button>
            <button onClick={() => setActiveChannel("genel-sohbet")} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeChannel === "genel-sohbet" ? "bg-[#E30A17] text-white" : "text-slate-400 hover:text-white"}`}># genel-sohbet</button>
            <button onClick={() => setActiveChannel("yazilim-ai")} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${activeChannel === "yazilim-ai" ? "bg-[#E30A17] text-white" : "text-slate-400 hover:text-white"}`}># yazilim-ve-ai</button>
          </div>
        </div>
        <div className="text-[11px] text-slate-500">Aktif: <strong className="text-white">{currentUser?.fullName}</strong></div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="bg-white px-6 py-3.5 border-b font-extrabold text-sm text-slate-900">#{activeChannel}</div>
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {(chatMessages[activeChannel] || []).map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">{msg.avatar}</div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 max-w-xl shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-slate-900">{msg.sender}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
                </div>
                <p className="text-xs text-slate-700">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="bg-white p-4 border-t border-slate-200 flex items-center gap-3">
          <input type="text" value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} placeholder={`Mesaj yazın...`} className="flex-1 bg-slate-50 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#E30A17]" />
          <button type="submit" className="bg-[#E30A17] hover:bg-[#C00813] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm">Gönder 🚀</button>
        </form>
      </div>
    </div>
  );
}
