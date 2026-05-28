import {
  useUpdateProductVariantActions,
  useUpdateProductVariantQueries,
} from "@/hooks/sellers";
import useUpdateProductVariantHelpers from "@/hooks/sellers/products/helpers/useUpdateProductVariantHelpers";
import { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";

interface FormProps {
  productId: string;
}

export default function EditProductVariantForm({ productId }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const queries = useUpdateProductVariantQueries({ productId });
  const { variants } = queries;
  const helpers = useUpdateProductVariantHelpers({ variants });
  const { checkingCorrectValues, onchangeVariants, variantUpdated } = helpers;

  const actions = useUpdateProductVariantActions({
    dispatch,
    checkingCorrectValues,
    newVariants: variantUpdated,
    productId,
    variants,
  });
  const { updateVariants } = actions;

  return (
    <div className="p-4 text-sm text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Chỉnh sửa biến thể
        </h2>
      </div>

      {/* Table */}
      <div className="border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                SKU
              </th>
              <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                Thuộc tính
              </th>
              <th className="text-right px-3 py-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                Tồn kho
              </th>
              <th className="text-right px-3 py-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                Giá thêm (₫)
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, i) => (
              <tr
                key={variant.id}
                className={`hover:bg-gray-50 transition-colors ${
                  i !== variants.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* SKU */}
                <td className="px-3 py-2.5">
                  <span className="font-mono text-xs text-gray-500">
                    {variant.sku}
                  </span>
                </td>

                {/* Options */}
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(variant.options).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 border border-gray-200"
                      >
                        {key}:{" "}
                        <span className="font-medium text-gray-800">
                          {value}
                        </span>
                      </span>
                    ))}
                  </div>
                </td>

                {/* Stock */}
                <td className="px-3 py-2.5 text-right">
                  <input
                    type="number"
                    min={0}
                    data-id={variant.id}
                    name="stock"
                    defaultValue={variant.stock}
                    onChange={(e) => onchangeVariants(e)}
                    className="w-20 text-right text-xs px-2 py-1 border border-gray-200 bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                  />
                </td>

                {/* Extra Price */}
                <td className="px-3 py-2.5 text-right">
                  <input
                    type="number"
                    name="extraPrice"
                    data-id={variant.id}
                    min={0}
                    defaultValue={variant.extraPrice}
                    onChange={(e) => onchangeVariants(e)}
                    className="w-24 text-right text-xs px-2 py-1 border border-gray-200 bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end mt-4">
        <button
          onClick={async () => await updateVariants()}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-floppy-disk text-xs" />
          Cập nhật
        </button>
      </div>
    </div>
  );
}
