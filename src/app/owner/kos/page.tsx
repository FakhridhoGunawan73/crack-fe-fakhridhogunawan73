"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

type Kos = {
  id: number;
  name: string;
  address: string;
  city: string;
  description: string;
};

export default function OwnerKosPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyKos() {
      try {
        const response = await api.get("/kos/my-kos");

        setKosList(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load your kos data");
      } finally {
        setLoading(false);
      }
    }

    fetchMyKos();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = confirm("Are you sure you want to delete this kos?");

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/kos/${id}`);

      setKosList((prev) => prev.filter((kos) => kos.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete kos");
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-700">Loading your kos...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800">My Kos</h1>

        <p className="mt-2 text-gray-600">Manage your boarding house here.</p>

        <div className="mt-6 space-y-4">
          {kosList.map((kos) => (
            <div
              key={kos.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <Link href={`/owner/kos/${kos.id}/rooms`} className="block">
                <div className="cursor-pointer">
                  <h2 className="text-xl font-bold text-gray-800">
                    {kos.name}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {kos.city}
                  </p>

                  <p className="mt-2 text-gray-700">{kos.address}</p>

                  <p className="mt-2 text-gray-500">{kos.description}</p>

                  <p className="mt-4 text-sm font-medium text-blue-600">
                    Click to manage rooms →
                  </p>
                </div>
              </Link>

              <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                <Link
                  href={`/owner/kos/${kos.id}/edit`}
                  className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                >
                  Edit Kos
                </Link>

                <button
                  onClick={() => handleDelete(kos.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
