"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1A1A1A] p-6 flex items-center justify-center">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl rounded-2xl p-8 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
            <Image
              src={user.image}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white tracking-wide">
            {user.name}
          </h1>
          <p className="text-gray-300 text-sm mt-1">{user.email}</p>

          {/* BIO */}
          <p className="text-gray-300 text-sm mt-2 text-center max-w-md">
            {user.bio && user.bio.trim() !== "" ? user.bio : "No bio added yet."}
          </p>

          <div className="mt-4 flex gap-3">
            <span className="px-4 py-1 text-xs rounded-full bg-white/10 text-gray-200 border border-white/20">
              Member
            </span>
            <span className="px-4 py-1 text-xs rounded-full bg-white/10 text-gray-200 border border-white/20">
              Verified User
            </span>
          </div>
        </div>

        {/* Line */}
        <div className="h-px w-full bg-white/10 mt-8 mb-8"></div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-3xl font-semibold text-white">8</p>
            <p className="text-gray-400 text-sm">Projects</p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-3xl font-semibold text-white">1.2k</p>
            <p className="text-gray-400 text-sm">Views</p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-3xl font-semibold text-white">4</p>
            <p className="text-gray-400 text-sm">Clients</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4 justify-center">
          <button
            onClick={() => router.push("/edit-profile")}
            className="px-6 py-2 rounded-xl bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition"
          >
            Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
