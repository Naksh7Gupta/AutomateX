"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Home, User, FolderKanban, Settings, Bot, LogOut } from "lucide-react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p className="text-center mt-20">Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1A1A1A]">
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col"
      >
        <h1 className="text-white text-2xl font-bold mb-10">AutomateX</h1>

        <nav className="flex flex-col gap-4">
          <button onClick={() => router.push("/")} className="flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-xl transition">
            <Home size={20} /> Home
          </button>

          <button onClick={() => router.push("/profile")} className="flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-xl transition">
            <User size={20} /> Profile
          </button>

          <button onClick={() => router.push("/projects")} className="flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-xl transition">
            <FolderKanban size={20} /> Projects
          </button>

          <button onClick={() => router.push("/ai")} className="flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-xl transition">
            <Bot size={20} /> Automate AI
          </button>

          <button onClick={() => router.push("/settings")} className="flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-xl transition">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => router.push("/api/auth/signout")}
            className="flex items-center gap-3 text-red-400 hover:bg-red-400/10 px-3 py-2 rounded-xl transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Dashboard */}
      <div className="flex-1 p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Welcome back, {user.name}!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
        >
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            <Image src={user.image} alt="profile" fill className="object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-300 mt-1">{user.email}</p>
            <p className="text-gray-300 mt-2">{user.bio || "No bio added yet."}</p>

            <div className="mt-4 flex justify-center md:justify-start gap-3">
              <button
                onClick={() => router.push("/edit-profile")}
                className="px-4 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => router.push("/projects")}
                className="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition"
              >
                Projects
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Projects", value: 8 },
            { title: "Views", value: "1.2k" },
            { title: "Clients", value: 4 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md text-center shadow-lg hover:scale-105 transition-transform"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-300 mt-2">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/profile")}
              className="px-6 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition"
            >
              View Profile
            </button>
            <button
              onClick={() => router.push("/edit-profile")}
              className="px-6 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => router.push("/projects")}
              className="px-6 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition"
            >
              My Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
