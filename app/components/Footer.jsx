"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Footer = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;
  if (!session) return null;

  return (
    <footer className="footer py-4 mt-12 border-t">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <a href="/" className="flex items-center mb-2 sm:mb-0">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
            className="h-6 mr-2"
            alt="AutomateX Logo"
          />
          <span className="font-semibold text-lg">AutomateX</span>
        </a>
        <ul className="flex flex-wrap items-center gap-4 text-sm">
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Privacy</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      <div className="mt-4 text-center text-sm">
        © 2025 AutomateX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
