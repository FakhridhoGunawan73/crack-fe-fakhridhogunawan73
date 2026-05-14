import Link from "next/link";
import Image from "next/image";

type KosDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Kos = {
  id: number;
  name: string;
  city: string;
  address: string;
  description: string;
  rooms: Room[];
};

type Room = {
  id: number;
  roomNumber: string;
  type: string;
  price: number;
  facilities: string | null;
  imageUrl: string;
  isAvailable: boolean;
};

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function KosDetailPage({ params }: KosDetailPageProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/kos/${id}`,
    {
      cache: "no-store",
    },
  );

  const kos: Kos = await response.json();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-blue-600">{kos.city}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{kos.name}</h1>
          <p className="mt-2 text-gray-600">{kos.address}</p>

          {kos.description && (
            <p className="mt-4 text-gray-700">{kos.description}</p>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">Daftar Kamar</h2>
          <p className="mt-2 text-gray-600">
            Pilih kamar berdasarkan tipe, fasilitas, dan ketersediaan.
          </p>

          {kos.rooms.length === 0 && (
            <div className="mt-6 rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">Belum ada kamar.</p>
            </div>
          )}

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {kos.rooms.map((room) => (
              <div
                key={room.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48 w-full">
                  {room.imageUrl ? (
                    <Image
                      src={room.imageUrl}
                      alt={`Kamar ${room.roomNumber}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Kamar {room.roomNumber}
                      </h3>

                      <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {room.type || "Standard"}
                      </span>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        room.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.isAvailable ? "Tersedia" : "Penuh"}
                    </span>
                  </div>

                  <p className="mt-5 text-2xl font-bold text-blue-600">
                    {formatRupiah(room.price)}
                  </p>

                  <p className="mt-3 flex-1 text-sm text-gray-600">
                    {room.facilities || "Fasilitas belum diisi"}
                  </p>

                  {room.isAvailable ? (
                    <Link
                      href={`/bookings/create?roomId=${room.id}`}
                      className="mt-5 block rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                    >
                      Booking Kamar
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="mt-5 block w-full cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-500"
                    >
                      Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
