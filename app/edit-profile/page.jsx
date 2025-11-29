"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState(session?.user?.bio);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    await fetch("/api/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, email: session?.user?.email }),
    });

    setLoading(false);
    router.push("/dashboard");
  };

  if (!session) return router.push("/login");
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-black">Edit Profile</h1>

      <label className="block text-black mb-2">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
      />

      <label className="block text-black mb-2">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full p-3 bg-black text-white rounded-lg"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Page;
