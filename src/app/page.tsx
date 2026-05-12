"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function Home() {
  useEffect(() => {
    async function fetchKos() {
      try {
        const response = await api.get("/kos");

        console.log("Kos data:", response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchKos();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Booking Kost Management System</h1>
    </main>
  );
}
