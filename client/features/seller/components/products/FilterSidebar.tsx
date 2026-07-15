import { useManagerProductListContext } from "../../contexts/ManagerProductListContext";
import { Tag, DollarSign, Percent, ChevronDown } from "lucide-react";

export default function FilterSidebar() {
  const { onchangeFilter, categories, filter } = useManagerProductListContext();

  return (
    <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <FilterField
        icon={<Tag size={13} />}
        label="Danh mục"
        name="category"
        id="filter-category"
        value={filter.category}
        onChange={onchangeFilter}
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </FilterField>

      <Divider />

      <FilterField
        icon={<DollarSign size={13} />}
        label="Khoảng giá"
        name="price"
        id="filter-price"
        onChange={onchangeFilter}
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
      </FilterField>

      <Divider />

      <FilterField
        icon={<Percent size={13} />}
        label="Khuyến mại"
        name="sale"
        id="filter-sale"
        onChange={onchangeFilter}
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
      </FilterField>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-10 w-px self-end bg-gray-100 sm:block" />;
}

function FilterField({
  icon,
  label,
  name,
  id,
  value,
  onChange,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  id: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-40 flex-1">
      <label
        htmlFor={id}
        className="mb-1 flex items-center gap-1.5 pl-1 text-xs font-medium text-gray-400"
      >
        {icon}
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full cursor-pointer appearance-none rounded-full border border-gray-200 bg-white px-4 py-2.5 pr-9 text-sm text-gray-700 shadow-sm outline-none transition-all duration-150 hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          name={name}
          id={id}
          onChange={onChange}
          value={value}
        >
          {children}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
