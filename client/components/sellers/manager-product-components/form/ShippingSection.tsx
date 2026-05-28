import useCreateProduct from "@/hooks/sellers/products/providers/useCreateProduct";

export default function ShippingSection() {
  const { helpers } = useCreateProduct();
  const { onchangeShipping, shipping } = helpers;
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Vận chuyển
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="shipping-normal"
            name="normal"
            checked
            readOnly
            className="w-4 h-4 dark:accent-gray-700"
          />
          <label
            htmlFor="shipping-normal"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Vận chuyển truyền thống
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="shipping-flash"
            name="flash"
            checked={shipping.flash}
            onChange={(e) => onchangeShipping(e)}
            className="w-4 h-4 dark:accent-gray-700"
          />
          <label
            htmlFor="shipping-flash"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Vận chuyển nhanh (Extra Express)
          </label>
        </div>
      </div>
    </div>
  );
}
