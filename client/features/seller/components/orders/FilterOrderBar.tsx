import {
  OrderStatus,
  PaymentStatus,
} from "@/features/order/interfaces/read.interface";
import { useManagerOrderContext } from "../../contexts/ManagerOrderContext";
import {
  generateOrderStatus,
  generatePaymentStatus,
} from "@/features/common/helpers/enum-type.helper";
import {
  ListFilter,
  ChevronDown,
  PackageSearch,
  CreditCard,
} from "lucide-react";

export default function FilterOrderBar() {
  const { filter, onChangeOrderFilter } = useManagerOrderContext();
  const statusArr = Object.values(OrderStatus);
  const paymentStatusArr = Object.values(PaymentStatus);
  const { paymentStatus, status } = filter;

  return (
    <div className="mb-4 rounded-xl border border-(--border) bg-white/60 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 pr-2 text-(--muted)">
          <ListFilter size={16} strokeWidth={2.25} />
          <span className="text-sm font-semibold">Bộ lọc</span>
        </div>

        <div className="h-6 w-px bg-(--border)" />

        <FilterSelect
          icon={<PackageSearch size={15} />}
          label="Trạng thái đơn hàng"
          name="status"
          value={status}
          onChange={onChangeOrderFilter}
          options={statusArr}
          generateLabel={generateOrderStatus}
        />

        <FilterSelect
          icon={<CreditCard size={15} />}
          label="Trạng thái thanh toán"
          name="paymentStatus"
          value={paymentStatus}
          onChange={onChangeOrderFilter}
          options={paymentStatusArr}
          generateLabel={generatePaymentStatus}
        />
      </div>
    </div>
  );
}

function FilterSelect<T extends string>({
  icon,
  label,
  name,
  value,
  onChange,
  options,
  generateLabel,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: T[];
  generateLabel: (value: T) => string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-sm font-medium text-(--muted)"
      >
        {icon}
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="appearance-none rounded-full border border-(--border) bg-white py-2 pl-4 pr-9 text-sm text-(--muted) outline-none transition-colors hover:border-(--muted) focus:border-(--primary,#6366f1) focus:ring-2 focus:ring-(--primary,#6366f1)/20"
        >
          {options.map((opt) => (
            <option value={opt} key={opt}>
              {generateLabel(opt)}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-(--muted)"
        />
      </div>
    </div>
  );
}
