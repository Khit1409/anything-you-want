import useCreateProduct from "@/hooks/sellers/products/providers/useCreateProduct";
import React from "react";

interface Props {
  categories: Array<{ id: string | number; name: string }>;
  onchangeProductInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function CategorySection() {
  const { queries, helpers } = useCreateProduct();
  const { categories } = queries;
  const { onchangeProductInfo } = helpers;

  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Danh mục sản phẩm
      </label>
      <select
        name="category"
        id="category"
        onChange={(e) => onchangeProductInfo(e)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
      >
        <option value="">Chọn danh mục</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
