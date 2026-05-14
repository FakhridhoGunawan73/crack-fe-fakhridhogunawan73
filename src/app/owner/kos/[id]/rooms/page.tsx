"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

type Room = {
  id: number;
  roomNumber: string;
  type: string;
  price: number;
  capacity: number;
  facilities: string;
  isAvailable: boolean;
};

export default function OwnerRoomsPage() {
  const params = useParams();
  const kosId = params.id;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await api.get(`/rooms/kos/${kosId}`);

        setRooms(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [kosId]);

  if (loading) {
    return <p className="p-6 text-gray-700">Loading rooms...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  async function handleDelete(roomId: number) {
    const confirmed = confirm("Are you sure you want to delete this room?");

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/rooms/${roomId}`);

      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete room");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Rooms</h1>

            <p className="mt-2 text-gray-600">Manage rooms for this kos.</p>
          </div>

          <Link
            href={`/owner/kos/${kosId}/rooms/create`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Add Room
          </Link>
        </div>

        {rooms.length === 0 ? (
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-600">No rooms available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rooms.map((room) => (
              <div key={room.id} className="rounded-xl bg-white p-5 shadow">
                <h2 className="text-xl font-bold text-gray-800">
                  Room {room.roomNumber}
                </h2>

                <p className="mt-2 text-gray-600">Type: {room.type}</p>

                <p className="mt-1 text-gray-600">
                  Capacity: {room.capacity} people
                </p>

                <p className="mt-1 text-gray-600">Price: Rp {room.price}</p>

                <p className="mt-1 text-gray-600">
                  Facilities: {room.facilities}
                </p>

                <p
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    room.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.isAvailable ? "Available" : "Not Available"}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/owner/kos/${kosId}/rooms/${room.id}/edit`}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(room.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
