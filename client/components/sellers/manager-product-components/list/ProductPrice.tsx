"use client";

interface ProductPriceProps {
  originalPrice: number;
  salePercent: number;
}

export default function ProductPrice({
  originalPrice,
  salePercent,
}: ProductPriceProps) {
  const finalPrice = originalPrice - (originalPrice * salePercent) / 100;

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {finalPrice.toLocaleString("vi-VN")}₫
      </span>
      {salePercent > 0 && (
        <>
          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
            {originalPrice.toLocaleString("vi-VN")}₫
          </span>
          <span className="text-xs font-semibold text-red-600 dark:text-red-400">
            -{salePercent}%
          </span>
        </>
      )}
    </div>
  );
}
