import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { SectionCard } from "../../components";

export default function EditVariantSection() {
  const { control } = useEditProductConext();
  const { fields } = useFieldArray({
    control,
    name: "data.variants",
  });

  return (
    <SectionCard
      title="Biến thể sản phẩm"
      description={`Tổng ${fields.length} biến thể`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-4 py-3 w-1/4">
                SKU
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-4 py-3">
                Thuộc tính
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-4 py-3 w-32">
                Tồn kho
              </th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-4 py-3 w-36">
                Giá thêm (₫)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {fields.map((variant) => (
              <tr
                key={variant.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {/* SKU */}
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                    {variant.sku}
                  </span>
                </td>

                {/* Options */}
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 rounded">
                      <span className="text-gray-500 dark:text-gray-500">
                        {variant.options}
                      </span>
                    </span>
                  </div>
                </td>

                {/* Stock */}
                <td className="px-4 py-3">
                  <input
                    type="number"
                    defaultValue={variant.stock}
                    className="w-24 text-sm px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-colors"
                  />
                </td>

                {/* Extra Price */}
                <td className="px-4 py-3">
                  <input
                    type="number"
                    defaultValue={variant.extraPrice}
                    className="w-28 text-sm px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-colors"
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
