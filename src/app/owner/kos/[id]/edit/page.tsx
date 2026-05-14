"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

type KosForm = {
  name: string;
  address: string;
  city: string;
  description: string;
};

export default function EditKosPage() {
  const router = useRouter();
  const params = useParams();
  const kosId = params.id;

  const [formData, setFormData] = useState<KosForm>({
    name: "",
    address: "",
    city: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function fetchKosDetail() {
      try {
        const response = await api.get(`/kos/${kosId}`);

        setFormData({
          name: response.data.name,
          address: response.data.address,
          city: response.data.city,
          description: response.data.description,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load kos detail");
      } finally {
        setLoading(false);
      }
    }

    fetchKosDetail();
  }, [kosId]);

  if (loading) {
    return <p className="p-6 text-gray-700">Loading kos detail...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      await api.patch(`/kos/${kosId}`, formData);

      router.push("/owner/kos");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update kos");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Edit Kos</h1>

        <p className="mt-2 text-gray-600">
          Update your boarding house information.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitLoading ? "Updating..." : "Update Kos"}
          </button>
        </form>
      </div>
    </main>
  );
}
