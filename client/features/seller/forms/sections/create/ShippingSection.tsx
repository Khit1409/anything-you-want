import { SHIPPING_INPUT_LIST } from "@/data/shiping-input";
import { useCreateProductContext } from "../../../contexts/CreateProductContext";
import { SectionCard, FormField } from "../../components";

export default function ShippingSection() {
  const { setValue, watch, provinces } = useCreateProductContext();
  const methods = watch("data.shipping.methods");

  return (
    <SectionCard
      title="Vận chuyển"
      description="Chọn các phương thức vận chuyển và cấu hình chi tiết"
    >
      <div className="space-y-4">
        {methods.map((method, index) => (
          <div
            className={`p-4 border rounded-lg transition-colors ${
              method.enabled
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
            }`}
            key={index}
          >
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id={`shipping-${index}`}
                onChange={(e) => {
                  const { checked } = e.target;
                  return setValue(
                    `data.shipping.methods.${index}.enabled`,
                    checked,
                  );
                }}
                className="w-5 h-5 cursor-pointer"
                checked={method.enabled}
              />
              <label
                htmlFor={`shipping-${index}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {method.type}
              </label>
            </div>

            {method.enabled && (
              <div className="space-y-4 pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                <div className="grid grid-cols-3 gap-4">
                  {SHIPPING_INPUT_LIST.find(
                    (f) => f.name === method.type,
                  )!.inputChilds.map((inputChild) => {
                    return (
                      <FormField
                        key={inputChild.id}
                        label={`${inputChild.label} (${inputChild.min}-${inputChild.max})`}
                      >
                        <input
                          type={inputChild.type}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-colors"
                          onChange={(e) => {
                            const { value } = e.target;
                            setValue(
                              `data.shipping.methods.${index}.times.${inputChild.name}`,
                              Number(value),
                            );
                          }}
                          id={inputChild.id}
                          max={inputChild.max}
                          min={inputChild.min}
                        />
                      </FormField>
                    );
                  })}
                </div>

                {SHIPPING_INPUT_LIST.find((f) => f.name === method.type)
                  ?.supportProvinceSelecteds && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Chọn tỉnh thành hỗ trợ
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                      {provinces.map((province) => (
                        <div
                          key={province.code}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id={`province-${index}-${province.code}`}
                            value={province.code}
                            checked={method.supportedProvinces.includes(
                              String(province.code),
                            )}
                            onChange={(e) => {
                              const { checked } = e.target;
                              if (checked) {
                                return setValue(
                                  `data.shipping.methods.${index}.supportedProvinces`,
                                  [
                                    ...(method.supportedProvinces ?? []),
                                    e.target.value,
                                  ],
                                );
                              } else {
                                return setValue(
                                  `data.shipping.methods.${index}.supportedProvinces`,
                                  method.supportedProvinces.filter(
                                    (ft) => ft !== e.target.value,
                                  ),
                                );
                              }
                            }}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label
                            htmlFor={`province-${index}-${province.code}`}
                            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                          >
                            {province.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
