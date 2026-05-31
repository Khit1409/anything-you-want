"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-inline-size: 640px) 100vw, (max-inline-size: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
