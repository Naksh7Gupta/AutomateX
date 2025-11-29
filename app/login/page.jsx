"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">AutomateX</h1>
        <p className="text-gray-600 mb-8">
          Boost your productivity with AI-powered task automation.
        </p>

        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 mb-4 px-5 py-3 border border-gray-300 rounded-xl hover:shadow-lg transition-all"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google"
            className="w-6 h-6"
          />
          <span className="text-gray-800 font-medium">Sign in with Google</span>
        </button>

        {/* Github Login */}
        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 border border-gray-300 rounded-xl hover:shadow-lg transition-all"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="Github"
            className="w-6 h-6"
          />
          <span className="text-gray-800 font-medium">Sign in with Github</span>
        </button>

        <p className="mt-6 text-sm text-gray-500">
          By signing in, you agree to our terms & privacy.
        </p>
      </div>
    </div>
  );
}
