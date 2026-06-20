import { ProductStatus } from "@/features/product/interfaces/product.interface";

export default function StatusBadge({ status }: { status: string }) {
  if (status === ProductStatus.ZERO) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-200">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Off
      </span>
    );
  }
  if (status === ProductStatus.ACTIVE) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        On
      </span>
    );
  }
  if (status === ProductStatus.INACTIVE) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        Off
      </span>
    );
  }
  return <span className="text-gray-400 text-xs">{status}</span>;
}
