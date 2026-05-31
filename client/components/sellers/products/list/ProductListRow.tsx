"use client";

import { ProductPreview } from "@/interfaces/product.interface";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import useMangerProduct from "@/contexts/sellers/ManagerProductContext";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import ProductStatus from "./ProductStatus";
import ProductActions from "./ProductActions";

interface ProductListRowProps {
  product: ProductPreview;
}

export default function ProductListRow({ product }: ProductListRowProps) {
  const { previews } = useMangerProduct();
  const { setSelectedIdOpenModal, selectedIdOpenModal } = previews;

  const imageUrl = product.images?.thumbnail || "/placeholder.jpg";

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* Ảnh & Tên */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
            <Image
              src={imageUrl}
              alt={product.info.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {product.info.name}
            </p>
          </div>
        </div>
      </td>

      {/* Danh mục */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {product.info.category?.name}
        </p>
      </td>

      {/* Giá */}
      <td className="px-6 py-4">
        <ProductPrice
          originalPrice={product.info.price}
          salePercent={product.info.sale}
        />
      </td>

      {/* Chiết khấu */}
      <td className="px-6 py-4">
        {product.info.sale > 0 ? (
          <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded">
            -{product.info.sale}%
          </span>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
        )}
      </td>

      {/* Đánh giá */}
      <td className="px-6 py-4">
        <ProductRating
          avg={product.ratingSumary?.avg || 0}
          total={product.ratingSumary?.total || 0}
        />
      </td>

      {/* Trạng thái */}
      <td className="px-6 py-4">
        <ProductStatus status={product.status} />
      </td>

      {/* Hành động */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={() =>
            setSelectedIdOpenModal((prev) =>
              prev !== undefined ? undefined : product.id
            )
          }
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faEllipsisV} className="text-sm" />
        </button>
        {selectedIdOpenModal && selectedIdOpenModal === product.id && (
          <ProductActions productId={product.id} />
        )}
      </td>
    </tr>
  );
}
