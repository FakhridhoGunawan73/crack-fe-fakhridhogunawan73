"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";

export default function CreateBookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomId = searchParams.get("roomId");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [succsess, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!roomId) {
      setError("Room ID tidak ditemukan");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/bookings", {
        roomId: Number(roomId),
        startDate,
        endDate,
      });

      setSuccess("Booking berhasil dibuat");

      setTimeout(() => {
        router.push("/my-bookings");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal membuat booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Booking Kamar</h1>

        <p className="mt-2 text-gray-600">Room ID: {roomId}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Start Date</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">End Date</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {succsess && <p className="text-sm text-green-500">{succsess}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {loading ? "Loading..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </main>
  );
}
