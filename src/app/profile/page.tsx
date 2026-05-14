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
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>

        {error && <p className="text-red-500">{error}</p>}

        {profile && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold">
                {profile.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h2>

                <p className="text-gray-500">{profile.email}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-400">Role</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {profile.role}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-400">User ID</p>

                <p className="mt-1 font-semibold text-gray-800">
                  #{profile.id}
                </p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
