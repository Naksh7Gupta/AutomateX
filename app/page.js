"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!session) {
    return <p className="text-center mt-20">Redirecting...</p>;
  }

  const features = [
    { name: "Profile", route: "/profile", icon: "👤" },
    { name: "Analytics", route: "/analytics", icon: "📊" },
    { name: "Settings", route: "/settings", icon: "⚙️" },
    { name: "Reports", route: "/reports", icon: "📑" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8 flex flex-col items-center">
      <header className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          Welcome, {session.user.name.split(" ")[0]}!
        </h1>
        <button
          onClick={() => signOut()}
          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow-md"
        >
          Logout
        </button>
      </header>

      <p className="text-center max-w-3xl text-lg text-gray-600 mb-12">
        AutomateX is your AI-powered productivity engine. Click on any feature below to get started and boost your workflow efficiency!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {features.map((feature) => (
          <div
            key={feature.name}
            onClick={() => router.push(feature.route)}
            className="cursor-pointer bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-center gap-4 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="text-5xl">{feature.icon}</div>
            <p className="font-semibold text-xl text-gray-800">{feature.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
