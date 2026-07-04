import Image from "next/image";

export default function Thumbnail({
  thumbnail,
  name,
  sale,
}: {
  thumbnail: string;
  name: string;
  sale: number;
}) {
  return (
    <div className="flex-1 h-full relative w-full bg-(--surface) dark:bg-(--surface) overflow-hidden">
      <Image
        src={thumbnail}
        alt={name}
        className="w-124 h-75 object-cover"
        objectFit="cover"
        width={500}
        height={300}
        loading="lazy"
      />
      {sale > 0 && (
        <div className="absolute top-3 left-3 bg-red-600 dark:bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-sm">
          -{sale}%
        </div>
      )}
    </div>
  );
}
