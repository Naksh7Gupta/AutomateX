"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full py-4 px-6 navbar backdrop-blur-xl border-b flex items-center justify-between">

      <Link href="/" className="text-2xl font-bold">
        AutomateX
      </Link>

      <div className="flex items-center gap-6">

        <Link href="/dashboard" className="hover:underline transition">
          Dashboard
        </Link>

        <Link href="/about" className="hover:underline transition">
          About
        </Link>

        <Link href="/contact" className="hover:underline transition">
          Contact
        </Link>

        {session ? (
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border">
              <Image src={session.user.image} alt="user" width={40} height={40} />
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
