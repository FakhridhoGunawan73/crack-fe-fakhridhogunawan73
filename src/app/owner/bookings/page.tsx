"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
  user?: {
    name: string;
    email: string;
  };
  room?: {
    roomNumber: string;
    type: string;
    kos?: {
      name: string;
      city: string;
    };
  };
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getStatusStyle(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "CANCELLED":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBookings() {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengambil data booking");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function updateStatus(id: number, status: "APPROVED" | "REJECTED") {
    try {
      await api.patch(`/bookings/${id}/status`, { status });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking,
        ),
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengubah status booking");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Owner Bookings</h1>
          <p className="mt-2 text-gray-600">
            Kelola permintaan booking dari user.
          </p>
        </div>

        {loading && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <p className="animate-pulse text-gray-500">Loading bookings...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="mt-6 rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Belum Ada Booking Masuk
            </h2>
            <p className="mt-2 text-gray-500">
              Booking dari user akan muncul di sini.
            </p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="mt-6 grid gap-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {booking.room?.kos?.name || "Nama kos tidak tersedia"}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      User: {booking.user?.name || "-"} (
                      {booking.user?.email || "-"})
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-gray-700 sm:grid-cols-4">
                  <div>
                    <p className="text-gray-400">Kamar</p>
                    <p className="font-medium">
                      {booking.room?.roomNumber || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Tipe</p>
                    <p className="font-medium">{booking.room?.type || "-"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Tanggal Mulai</p>
                    <p className="font-medium">
                      {formatDate(booking.startDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Tanggal Selesai</p>
                    <p className="font-medium">{formatDate(booking.endDate)}</p>
                  </div>
                </div>

                {booking.status === "PENDING" && (
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => updateStatus(booking.id, "APPROVED")}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(booking.id, "REJECTED")}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
