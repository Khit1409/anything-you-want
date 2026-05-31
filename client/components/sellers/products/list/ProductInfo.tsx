"use client";

interface ProductInfoProps {
  name: string;
  categoryName: string;
  brand?: string;
  origin?: string;
}

export default function ProductInfo({
  name,
  categoryName,
  brand,
  origin,
}: ProductInfoProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
        {name}
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{categoryName}</p>
      {(brand || origin) && (
        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
          {brand && <span>{brand}</span>}
          {origin && <span>•</span>}
          {origin && <span>{origin}</span>}
        </div>
      )}
    </div>
  );
}
