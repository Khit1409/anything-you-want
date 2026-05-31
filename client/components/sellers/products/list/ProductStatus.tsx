"use client";

import { ProductStatus as ProductStatusEnum } from "@/interfaces/product.interface";

interface ProductStatusProps {
  status: ProductStatusEnum;
}

export default function ProductStatus({ status }: ProductStatusProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case ProductStatusEnum.ACTIVE:
        return {
          label: "Đang bán",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          textColor: "text-green-700 dark:text-green-300",
        };
      case ProductStatusEnum.INACTIVE:
        return {
          label: "Tạm dừng",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          textColor: "text-yellow-700 dark:text-yellow-300",
        };
      case ProductStatusEnum.ZERO:
        return {
          label: "Hết hàng",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          textColor: "text-red-700 dark:text-red-300",
        };
      default:
        return {
          label: "Không rõ",
          bgColor: "bg-gray-100 dark:bg-gray-700",
          textColor: "text-gray-700 dark:text-gray-300",
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <span
      className={`inline-block px-3 py-1 w-max rounded-full text-xs font-semibold ${display.bgColor} ${display.textColor}`}
    >
      {display.label}
    </span>
  );
}
