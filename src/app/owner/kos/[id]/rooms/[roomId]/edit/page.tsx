"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

type RoomForm = {
  roomNumber: string;
  type: string;
  price: string;
  capacity: string;
  facilities: string;
  imageUrl: string;
  isAvailable: boolean;
};

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();

  const kosId = params.id;
  const roomId = params.roomId;

  const [formData, setFormData] = useState<RoomForm>({
    roomNumber: "",
    type: "",
    price: "",
    capacity: "",
    facilities: "",
    imageUrl: "",
    isAvailable: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function fetchRoomDetail() {
      try {
        const response = await api.get(`/rooms/${roomId}`);

        setFormData({
          roomNumber: response.data.roomNumber,
          type: response.data.type,
          price: String(response.data.price),
          capacity: String(response.data.capacity),
          facilities: response.data.facilities,
          imageUrl: response.data.imageUrl,
          isAvailable: response.data.isAvailable,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load room detail");
      } finally {
        setLoading(false);
      }
    }

    fetchRoomDetail();
  }, [roomId]);

  if (loading) {
    return <p className="p-6 text-gray-700">Loading room detail...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      await api.patch(`/rooms/${roomId}`, {
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
      });

      router.push(`/owner/kos/${kosId}/rooms`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update room");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Edit Room</h1>

        <p className="mt-2 text-gray-600">Edit room from this kos.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <textarea
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            {submitLoading ? "Updating..." : "Update Room"}
          </button>
        </form>
      </div>
    </main>
  );
}
