import { useProductListContext } from "../../contexts/ProductListContext";

export default function ProductFilterSidebar() {
  const { categories, onChangeFilter, filter } = useProductListContext();
  return (
    <div className="flex flex-wrap gap-3 items-center p-4 bg-white border border-gray-200 m-3">
      {/* Category */}
      <div className="relative flex-1 min-w-40">
        <label className="block text-xs text-gray-400 font-medium mb-1 pl-1">
          Danh mục
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2.5 pr-8 rounded-lg shadow-sm outline-none cursor-pointer transition-all duration-150 hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            name="category"
            id="filter-category"
            onChange={onChangeFilter}
            value={filter.category}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-10 bg-gray-100 self-end mb-0.5" />

      {/* Price Range */}
      <div className="relative flex-1 min-w-40">
        <label className="block text-xs text-gray-400 font-medium mb-1 pl-1">
          Khoảng giá
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2.5 pr-8 rounded-lg shadow-sm outline-none cursor-pointer transition-all duration-150 hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            name="price"
            id="filter-price"
            onChange={onChangeFilter}
          >
            <option value="">Tất cả mức giá</option>
            <option data-max={500000} data-min={0}>
              0 – 500.000 ₫
            </option>
            <option data-max={1000000} data-min={500000}>
              500.000 – 1.000.000 ₫
            </option>
            <option data-max={10000000} data-min={1000000}>
              1.000.000 – 10.000.000 ₫
            </option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-10 bg-gray-100 self-end mb-0.5" />

      {/* Discount */}
      <div className="relative flex-1 min-w-40">
        <label className="block text-xs text-gray-400 font-medium mb-1 pl-1">
          Khuyến mại
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2.5 pr-8 rounded-lg shadow-sm outline-none cursor-pointer transition-all duration-150 hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            name="sale"
            id="filter-sale"
            onChange={onChangeFilter}
          >
            <option value="">Tất cả mức giảm</option>
            <option data-max={20} data-min={0}>
              0 – 20%
            </option>
            <option data-max={50} data-min={20}>
              20 – 50%
            </option>
            <option data-max={70} data-min={50}>
              50 – 70%
            </option>
            <option data-max={100} data-min={70}>
              70 – 100%
            </option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
