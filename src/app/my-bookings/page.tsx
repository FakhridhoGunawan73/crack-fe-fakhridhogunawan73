"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
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

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMyBookings() {
      try {
        const response = await api.get("/bookings/my-bookings");
        setBookings(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal mengambil booking");
      } finally {
        setLoading(false);
      }
    }

    getMyBookings();
  }, []);

  async function handleCancelBooking(id: number) {
    const confirmCancel = confirm("Yakin ingin membatalkan bookingan ini?");

    if (!confirmCancel) return;

    try {
      await api.patch(`/bookings/${id}/cancel`);

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "CANCELLED" } : booking,
        ),
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal membatalkan booking");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">
            Lihat semua riwayat booking kamar kos kamu di sini.
          </p>
        </div>

        {loading && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow">
            <p className="animate-pulse text-gray-500">Loading bookings...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="mt-6 rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-bold text-gray-800">
              Belum Ada Booking
            </h2>
            <p className="mt-2 text-gray-500">
              Kamu belum melakukan booking kamar.
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
                      {booking.room?.kos?.city || "Kota tidak tersedia"}
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
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="mt-5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
