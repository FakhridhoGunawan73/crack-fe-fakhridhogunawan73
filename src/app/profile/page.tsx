"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/auth/profile");
        setProfile(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal mengambil profile");
      }
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    getProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>

        {error && <p className="text-red-500">{error}</p>}

        {profile && (
          <pre className="rounded bg-gray-100 p-4">
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
