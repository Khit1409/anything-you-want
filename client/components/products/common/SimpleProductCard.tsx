import { memo } from "react";
import Image from "next/image";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  onViewDetails?: () => void;
  onAddToCart?: () => void;
}

const SimpleProductCard = memo(function SimpleProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  rating = 0,
  reviews = 0,
  inStock = true,
  onViewDetails,
  onAddToCart,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group relative w-full max-w-sm rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 rounded-t-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}

        {/* Stock Status */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
            <span className="text-white font-semibold">Hết hàng</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-base font-medium text-gray-800 line-clamp-2 mb-2 transition-colors group-hover:text-gray-900">
          {name}
        </h3>

        {/* Rating */}
        {(rating > 0 || reviews > 0) && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            {price.toLocaleString("vi-VN")}₫
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {originalPrice.toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onViewDetails}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            Chi tiết
          </button>
          <button
            onClick={onAddToCart}
            disabled={!inStock}
            className="flex-1 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-900 active:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
});

export default SimpleProductCard;
