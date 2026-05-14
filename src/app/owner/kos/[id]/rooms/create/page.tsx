"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CreateRoomPage() {
  const params = useParams();
  const router = useRouter();
  const kosId = params.id;
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "",
    price: "",
    capacity: "",
    facilities: "",
    imageUrl: "",
    isAvailable: true,
  });

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

      await api.post("/rooms", {
        ...formData,
        kosId: Number(kosId),
        price: Number(formData.price),
        capacity: Number(formData.capacity),
      });

      router.push(`/owner/kos/${kosId}/rooms`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create room");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Create Room</h1>

        <p className="mt-2 text-gray-600">Add room for kos ID: {kosId}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="type"
            placeholder="Room Type"
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
            placeholder="Facilities"
            value={formData.facilities}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            {submitLoading ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </main>
  );
}
