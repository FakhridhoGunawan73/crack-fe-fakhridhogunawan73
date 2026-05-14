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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-52 w-full">
        <Image
          src="/Kos-kosan.jpg"
          alt={name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
          Available
        </div>
      </div>

      <div className="flex flex-col p-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>

          <p className="mt-1 text-sm font-medium text-blue-600">{city}</p>

          <p className="mt-2 text-sm text-gray-500">{address}</p>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        <Link
          href={`/kos/${id}`}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
