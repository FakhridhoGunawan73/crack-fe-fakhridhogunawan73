import Link from "next/link";
import Image from "next/image";

type KosCardProps = {
  id: number;
  name: string;
  city: string;
  address: string;
  description: string;
};

export default function KosCard({
  id,
  name,
  city,
  address,
  description,
}: KosCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-40 w-full">
        <Image
          src="/Kos-kosan.jpg"
          alt={name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>

        <p className="mt-2 text-sm text-blue-600">{city}</p>

        <p className="mt-2 text-sm text-gray-500">{address}</p>

        <p className="mt-4 line-clamp-3 text-sm text-gray-600">{description}</p>

        <Link
          href={`/kos/${id}`}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
