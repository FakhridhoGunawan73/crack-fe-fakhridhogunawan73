"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import KosCard from "@/components/KosCard";

type Kos = {
  id: number;
  name: string;
  city: string;
  address: string;
  description: string;
};

export default function Home() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchKos() {
      try {
        const response = await api.get("/kos");
        setKosList(response.data);
        console.log("Kos data:", response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Failed to retrieve boarding house data",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchKos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-200">
              Kostify
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Temukan Kos Nyaman
              <br />
              Dengan Booking Online
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-blue-100">
              Cari dan booking kos dengan mudah, cepat, dan nyaman langsung dari
              rumahmu.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#kos-list"
                className="rounded-lg bg-white px-6 py-3 font-medium text-blue-700 transition hover:bg-gray-100"
              >
                Cari Kos
              </a>

              <a
                href="/my-bookings"
                className="rounded-lg border border-white px-6 py-3 font-medium text-white transition hover:bg-white hover:text-blue-700"
              >
                My Bookings
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="kos-list" className="mx-auto max-w-6xl px-8 py-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Daftar Kos Tersedia
        </h2>

        {loading && <p className="text-gray-600">Loading data kos...</p>}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && kosList.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold text-gray-700">
              Belum ada kos tersedia
            </h2>

            <p className="mt-2 text-gray-500">Silakan kembali lagi nanti.</p>
          </div>
        )}

        {!loading && !error && kosList.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kosList.map((item) => (
              <KosCard
                key={item.id}
                id={item.id}
                name={item.name}
                city={item.city}
                address={item.address}
                description={item.description}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
