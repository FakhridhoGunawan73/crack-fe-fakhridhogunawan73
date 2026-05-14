"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

type Room = {
  id: number;
  roomNumber: string;
  type: string;
  price: number;
  capacity: number;
  facilities: string;
  imageUrl: string;
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="bg-gray-200">
                  <Image
                    src={room.imageUrl}
                    alt={`Room ${room.roomNumber}`}
                    width={800}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Room {room.roomNumber}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">{room.type}</p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        room.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-bold text-blue-600">
                    Rp {room.price.toLocaleString("id-ID")}
                  </p>

                  <div className="flex flex-1 flex-col mt-2">
                    <p>Capacity: {room.capacity} person</p>
                    <p>Facilities: {room.facilities}</p>
                  </div>

                  <div className="mt-5 flex gap-2 border-t pt-4">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
