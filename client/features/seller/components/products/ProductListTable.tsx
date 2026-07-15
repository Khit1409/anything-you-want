import Image from "next/image";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import EmptyProducts from "./EmptyProducts";
import { SectionShowDataLoading } from "@/features/common/components";
import { useManagerProductListContext } from "../../contexts/ManagerProductListContext";

export default function ProductListTable() {
  const { isLoading, products, isEmpty, isShow, deleteHandle } =
    useManagerProductListContext();

  return (
    <div className="w-full overflow-x-auto my-3 border border-(--border) rounded">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Thumbnail</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Origin Price</th>
            <th className="px-4 py-3 font-medium">Sale</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created At</th>
            <th className="px-4 py-3 font-medium">Options</th>
          </tr>
        </thead>
        {isShow && (
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="bg-white">
                {/* ID */}
                <td className="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                  <Link
                    href={`/seller/products/${product._id}`}
                    className="hover:text-blue-500 hover:underline"
                  >
                    {product._id.slice(0, 10)}
                    {product._id.slice(10).replace(/./g, "*")}
                  </Link>
                </td>

                {/* Thumbnail */}
                <td className="px-4 py-3">
                  <div className="w-25 h-25 relative overflow-hidden rounded border border-gray-100 bg-gray-50">
                    <Image
                      src={product.images.thumbnail}
                      alt={product.info.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* Name */}
                <td className="px-4 py-3">
                  <span
                    className="block truncate text-gray-800 font-medium"
                    style={{ maxWidth: "200px" }}
                    title={product.info.name}
                  >
                    {product.info.name}
                  </span>
                </td>

                {/* Origin Price */}
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {product.info.price.toLocaleString("vi-VN")}
                </td>

                {/* Sale */}
                <td className="px-4 py-3 whitespace-nowrap">
                  {product.info.sale > 0 ? (
                    <span className="text-red-500 font-medium">
                      {product.info.sale}%
                    </span>
                  ) : (
                    <span className="text-gray-400">none</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
                {/* Created At */}
                <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                  dd/mm/yyyy
                </td>
                <td className="px-4  py-3">
                  <button
                    onClick={() => deleteHandle(product._id)}
                    className="text-red-500 hover:underline"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {!isEmpty && (
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
              <td className="px-4 py-3 w-full font-medium">
                Tổng sản phẩm: {products.length}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {isLoading ? <SectionShowDataLoading /> : isEmpty && <EmptyProducts />}
    </div>
  );
}
