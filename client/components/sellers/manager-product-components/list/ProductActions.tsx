"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import useMangerProduct from "@/context/sellers/ManagerProductContext";

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const { handles } = useMangerProduct();
  const { redirectToDetailPage, onOpenWarningModal } = handles;

  return (
    <div className="absolute right-3 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-99">
      <button
        onClick={() => redirectToDetailPage(productId)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
      >
        <FontAwesomeIcon icon={faEye} className="w-4" />
        Xem chi tiết
      </button>

      <button
        onClick={() => onOpenWarningModal(productId)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm border-t border-gray-200 dark:border-gray-700"
      >
        <FontAwesomeIcon icon={faTrash} className="w-4" />
        Xóa
      </button>
    </div>
  );
}
