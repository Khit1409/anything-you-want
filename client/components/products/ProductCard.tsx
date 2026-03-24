import { ProductPreviews } from "@/interfaces/response/product.response";
import {
  faStar,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({ product }: { product: ProductPreviews }) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full pt-[100%] bg-white overflow-hidden">
        <Image
          src={product.images.thumbnail}
          alt={product.info.name}
          fill
          className="object-contain p-4"
          sizes="(max-inline-size: 640px) 100vw, (max-inline-size: 1024px) 50vw, (max-inline-size: 1280px) 33vw, 25vw"
        />
        {product.info.sale > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-sm">
            -{product.info.sale}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col grow">
        {/* Brand */}
        <Link
          href={`/search?brand=${product.info.brand}`}
          className="text-xs text-gray-600 hover:text-orange-600 hover:underline mb-1 block"
        >
          {product.info.brand}
        </Link>

        {/* Product Name */}
        <Link
          href={`/products/${product.id}`}
          className="text-xl font-semibold leading-tight text-gray-900 line-clamp-4 mb-2 hover:text-orange-600 cursor-pointer min-h-10"
        >
          {product.info.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: product.ratingSumary.avg }).map(
              (_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={`text-xs ${
                    index < product.ratingSumary.avg
                      ? "text-orange-400"
                      : "text-gray-300"
                  }`}
                />
              )
            )}
          </div>
          <span className="text-xs text-gray-600 ml-1">
            ({product.ratingSumary.total})
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-normal text-gray-900">
              {(
                product.info.price -
                (product.info.price * product.info.sale) / 100
              ).toLocaleString("vi-VN")}
            </span>
            <span className="text-sm text-gray-900">₫</span>
          </div>
          {product.info.sale > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 line-through">
                {product.info.price.toLocaleString("vi-VN")}₫
              </span>
              <span className="text-xs text-red-600 font-medium">
                Tiết kiệm{" "}
                {(
                  (product.info.price * product.info.sale) /
                  100
                ).toLocaleString("vi-VN")}
                ₫
              </span>
            </div>
          )}
        </div>

        {/* Shipping Options */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-700">
            {product.shipping.normal && (
              <div>
                <FontAwesomeIcon
                  icon={faTruck}
                  className="text-teal-600 text-sm me-1"
                />
                <span className="text-xs">Giao hàng truyền thống</span>
              </div>
            )}
            {product.shipping.flash && (
              <div>
                <FontAwesomeIcon
                  icon={faTruckFast}
                  className="text-teal-600 text-sm me-1"
                />
                <span className="text-xs">Giao hàng hỏa tốc</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-gray-100">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Link
                href={`/search?tag=${tag}`}
                key={index}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-sm hover:bg-gray-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
