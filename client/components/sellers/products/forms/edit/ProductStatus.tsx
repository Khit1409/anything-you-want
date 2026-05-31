import { ProductDetail } from "@/interfaces/product.interface";

type Props = {
  product: ProductDetail;
};

function fmtDate(value: Date | string) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value);
  }
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    active:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100",
    inactive:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    deleted: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  };
  const cls =
    map[status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

export default function ProductStatus({ product }: Props) {
  return (
    <div className="p-3 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Created:{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {fmtDate(product.createdAt)}
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Updated:{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">
            {fmtDate(product.updatedAt)}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs text-gray-500 dark:text-gray-400">Status</div>
        <div className="mt-1">
          <StatusBadge status={(product.status || "draft").toString()} />
        </div>
      </div>
    </div>
  );
}
