import { ProductInfo as Info } from "@/interfaces/product.interface";

type Props = {
  info: Info;
};

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-2">
      <div className="w-28 text-xs text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="text-sm text-gray-800 dark:text-gray-200">{value}</div>
    </div>
  );
}

export default function ProductInfo({ info }: Props) {
  return (
    <div className="p-3 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
      <InfoRow
        label="Tên sản phẩm"
        value={
          <div className="text-sm leading-relaxed max-h-40 overflow-auto text-gray-700 dark:text-gray-300">
            {info.name || "-"}
          </div>
        }
      />
      <InfoRow
        label="Tên thương hiệu"
        value={
          <div className="text-sm leading-relaxed max-h-40 overflow-auto text-gray-700 dark:text-gray-300">
            {info.brand || "-"}
          </div>
        }
      />
      <InfoRow
        label="Nơi sản xuất"
        value={
          <div className="text-sm leading-relaxed max-h-40 overflow-auto text-gray-700 dark:text-gray-300">
            {info.origin || "-"}
          </div>
        }
      />
      <InfoRow
        label="Mô tả sản phẩm"
        value={
          <div className="text-sm leading-relaxed max-h-40 overflow-auto text-gray-700 dark:text-gray-300">
            {info.description || "-"}
          </div>
        }
      />
      <InfoRow label="Giá gốc" value={info.price ? `${info.price}₫` : "-"} />
      <InfoRow
        label="Giá khuyến mãi"
        value={info.sale ? `${info.sale}₫` : "-"}
      />
    </div>
  );
}
