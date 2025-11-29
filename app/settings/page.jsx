"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "../components/ThemeProvider";

export default function Settings() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [user] = useState({ name: "Naksh Gupta", email: "naksh@example.com" });

  if (status === "loading") return null;
  if (!session) return <div className="min-h-screen p-10">Please login to access settings.</div>;

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen p-10 transition-colors">
      <h1 className="text-4xl font-bold mb-6">Settings</h1>

      {/* Profile Info */}
      <div className="mb-8 p-6 rounded-xl shadow-md card">
        <h2 className="text-2xl font-semibold mb-2">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Theme Toggle */}
      <div className="mb-8 p-6 rounded-xl shadow-md flex items-center justify-between card">
        <span className="text-lg font-medium">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg font-semibold"
        >
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>

      {/* Logout */}
      <div className="p-6 rounded-xl shadow-md card">
        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
