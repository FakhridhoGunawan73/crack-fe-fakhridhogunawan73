"use client";

import Link from "next/link";

const dashboardItems = [
  {
    title: "Manage Kos",
    description: "Create, edit, delete kos, and manage rooms.",
    href: "/owner/kos",
    icon: "🏠",
  },
  {
    title: "Owner Bookings",
    description: "Approve or reject booking requests.",
    href: "/owner/bookings",
    icon: "📋",
  },
  {
    title: "My Bookings",
    description: "View your personal room bookings.",
    href: "/my-bookings",
    icon: "🛏️",
  },
  {
    title: "Profile",
    description: "View your account information.",
    href: "/profile",
    icon: "👤",
  },
];

export default function OwnerDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-200">
            Kostify Owner
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Owner Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Manage your kos, rooms, booking requests, and account from one
            place.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {dashboardItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  {item.icon}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-gray-600">{item.description}</p>

                  <p className="mt-4 text-sm font-medium text-blue-600">
                    Open →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
