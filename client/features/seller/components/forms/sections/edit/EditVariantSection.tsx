import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard } from "../../components";

export default function EditVariantSection() {
  const { watch, register } = useEditProductConext();
  const variants = watch("data.variants") ?? [];

  return (
    <SectionCard
      title="Biến thể sản phẩm"
      description={`Quản lý ${variants.length} biến thể`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-4 py-4 w-1/4">
                SKU
              </th>
              <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-4 py-4">
                Thuộc tính
              </th>
              <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-4 py-4 w-32">
                Tồn kho
              </th>
              <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide px-4 py-4 w-36">
                Giá thêm (₫)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {variants.map((variant, index) => (
              <tr
                key={variant._id}
                className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors"
              >
                {/* SKU */}
                <td className="px-4 py-4">
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded border border-gray-300 dark:border-gray-700">
                    {variant.sku}
                  </span>
                </td>

                {/* Options */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                      <span className="text-blue-500 dark:text-blue-400">
                        {variant.optionName}
                      </span>
                    </span>
                  </div>
                </td>

                {/* Stock */}
                <td className="px-4 py-4">
                  <input
                    type="number"
                    {...register(`data.variants.${index}.stock`)}
                    className="w-28 text-sm px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:focus:ring-green-400 transition-all font-medium"
                  />
                </td>

                {/* Extra Price */}
                <td className="px-4 py-4">
                  <input
                    type="number"
                    {...register(`data.variants.${index}.extraPrice`)}
                    className="w-32 text-sm px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:focus:ring-purple-400 transition-all font-medium"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
