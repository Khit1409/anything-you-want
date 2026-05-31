import { SHIPPING_INPUT_LIST } from "@/data/shiping-input";
import useCreateProduct from "@/hooks/sellers/products/providers/useCreateProduct";
import { ShippingMethod } from "@/interfaces";

export default function ShippingSection() {
  const { helpers, queries } = useCreateProduct();
  const {
    onchangeShipping,
    shipping,
    onchangeShippingTime,
    onchangeSupportProvinces,
  } = helpers;
  const { provinces } = queries;
  const inputList = SHIPPING_INPUT_LIST;
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Vận chuyển
      </h3>
      <div className="space-y-2">
        {inputList.map((input) => {
          const {
            id,
            inputChilds,
            name,
            type,
            label,
            supportProvinceSelecteds,
          } = input;
          return (
            <div
              className="flex items-start gap-2 flex-col border p-2 border-(--border) rounded"
              key={input.name}
            >
              <div className="flex items-center gap-2">
                <input
                  type={type}
                  id={id}
                  name={name}
                  className="w-4 h-4 dark:accent-gray-700"
                  checked={
                    name === ShippingMethod.STANDARD
                      ? true
                      : shipping.methods.find((f) => f.type === name)?.enabled
                  }
                  onChange={(e) => onchangeShipping(e)}
                />
                <label
                  htmlFor="shipping-normal"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
              </div>
              {shipping.methods.find(
                (fm) => fm.enabled && fm.type === name
              ) && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3">
                    {inputChilds.map((inputChild) => {
                      return (
                        <div
                          className="flex flex-col gap-2"
                          key={inputChild.id}
                        >
                          <label
                            className="text-sm text-gray-700 dark:text-gray-300"
                            htmlFor={inputChild.id}
                          >
                            {inputChild.label}
                            <span className="text-yellow-500">
                              {`*(${inputChild.min}-${inputChild.max})`}
                            </span>
                          </label>
                          <input
                            type={inputChild.type}
                            className="border-(--border) border rounded text-center"
                            name={inputChild.name}
                            data-shipping-type={name}
                            id={inputChild.id}
                            max={inputChild.max}
                            min={inputChild.min}
                            onChange={(e) => onchangeShippingTime(e)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {supportProvinceSelecteds && (
                    <div>
                      <div className="mb-3">
                        <h4 className="text-(--text)">
                          Chọn tỉnh thành hỗ trợ
                          <span className="text-red-500 ms-1">*</span>
                        </h4>
                      </div>
                      <div className="grid grid-cols-5 gap-3 text-sm">
                        {provinces.map((province) => (
                          <div
                            key={province.code}
                            className="flex items-center gap-2"
                          >
                            <label htmlFor={String(province.code)}>
                              {province.name}
                            </label>
                            <input
                              type="checkbox"
                              id={String(province.code)}
                              value={province.code}
                              data-shipping-type={name}
                              onChange={(e) => onchangeSupportProvinces(e)}
                              checked={
                                shipping.methods
                                  .find((f) => f.type === name)
                                  ?.supportedProvinces?.includes(
                                    String(province.code)
                                  )
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
