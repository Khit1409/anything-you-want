import {
  ProductDetail,
} from "@/interfaces/response/product.response";
import ProductShipSupport from "./ProductShipSupport";
import ProductRating from "./ProductRating";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import ProductDescription from "./ProductDescription";

interface Props {
  product: ProductDetail;
  finalPrice: (price: number, sale: number) => number;
  minusSale: (price: number, sale: number) => number;
}

export default function ProductInformation({
  product,
  minusSale,
  finalPrice,
}: Props) {
  return (
    <div className="bg-white p-6">
      {/* Product Name */}
      <h2 className="font-bold text-gray-900 mb-6">{product.info.name}</h2>

      {/* Basic Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 w-32">Thương hiệu:</span>
          <span className="text-gray-900 font-medium">
            {product.info.brand}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6 py-4 bg-gray-50">
        <div className="flex items-baseline gap-4 px-4">
          <div className="text-3xl font-bold text-gray-900">
            {finalPrice(product.info.price, product.info.sale).toLocaleString(
              "vi-VN"
            )}
            <span className="text-xl">₫</span>
          </div>
          <div className="text-lg text-gray-400 line-through">
            {product.info.price.toLocaleString("vi-VN")} ₫
          </div>
          <div className="px-2 py-1 bg-red-500 text-white text-sm font-semibold">
            -{product.info.sale}%
          </div>
        </div>
        <div className="text-sm text-gray-500 px-4 mt-2">
          Tiết kiệm:
          {minusSale(product.info.price, product.info.sale).toLocaleString(
            "vi-VN"
          )}
          ₫
        </div>
      </div>

      {/* Shipping */}
      <div className="mb-6">
        <ProductShipSupport shipSupport={product.shipping} />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <ProductRating rating={product.ratingSumary} />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faTags} className="text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <Link
                href={`/search?tag=${tag}`}
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="pt-6 border-t border-gray-200">
        <ProductDescription description={product.info.description} />
      </div>
    </div>
  );
}
