"use client";

import { ProductPreview } from "@/interfaces/product.interface";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import ProductStatus from "./ProductStatus";

interface ProductCardProps {
  product: ProductPreview;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.thumbnail || "/placeholder.jpg";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <ProductImage src={imageUrl} alt={product.info.name} />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Info */}
        <ProductInfo
          name={product.info.name}
          categoryName={product.info.category?.name || ""}
          brand={product.info.brand}
          origin={product.info.origin}
        />

        {/* Price */}
        <ProductPrice
          originalPrice={product.info.price}
          salePercent={product.info.sale}
        />

        {/* Rating */}
        <ProductRating
          avg={product.ratingSumary?.avg || 0}
          total={product.ratingSumary?.total || 0}
        />

        {/* Status */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <ProductStatus status={product.status} />
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {product.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                +{product.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
