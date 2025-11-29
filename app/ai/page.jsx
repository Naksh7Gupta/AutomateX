"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AIPage() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!msg.trim()) return;
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: msg }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),black)] text-white p-6">
      
      <div className="w-full max-w-2xl space-y-6">

        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center"
        >
          AI Assistant
        </motion.h1>

        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Ask anything..."
          className="w-full h-40 p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
        />

        <button
          onClick={sendPrompt}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold transition hover:opacity-90 active:scale-[0.97]"
        >
          {loading ? "Thinking…" : "Ask AI"}
        </button>

        {reply && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-lg leading-relaxed"
          >
            {reply}
          </motion.div>
        )}
      </div>
    </div>
  );
}
