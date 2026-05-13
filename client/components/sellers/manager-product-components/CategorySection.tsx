import React from "react";

interface Props {
  categories: Array<{ id: string | number; name: string }>;
  onchangeProductInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function CategorySection({
  categories,
  onchangeProductInfo,
}: Props) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-sm transition-all">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white font-bold text-sm">
          1
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Danh mục sản phẩm
        </h2>
      </div>

      <div className="relative">
        <select
          name="category"
          id="category"
          onChange={(e) => onchangeProductInfo(e)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 appearance-none cursor-pointer transition-all"
        >
          <option value="">--Chọn danh mục cho sản phẩm--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <i className="fas fa-chevron-down text-sm"></i>
        </div>
      </div>
    </div>
  );
}
