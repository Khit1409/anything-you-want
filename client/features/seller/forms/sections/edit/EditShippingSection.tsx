import { SHIPPING_INPUT_LIST } from "@/data/shiping-input";
import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard, FormField } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function EditShippingSection() {
  const { setValue, watch, provinces, register } = useEditProductConext();
  const methods = watch("data.shipping.methods");

  return (
    <SectionCard
      title="Vận chuyển"
      description="Cập nhật cách thức vận chuyển và chi phí"
      icon={faTruck}
    >
      <div className="space-y-5">
        {methods?.map((method, index) => (
          <div
            className={`border-2 rounded-lg transition-all ${
              method.enabled
                ? "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-300 dark:border-blue-700"
                : "bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-800/20 border-gray-300 dark:border-gray-700"
            }`}
            key={index}
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    id={`edit-shipping-${index}`}
                    onChange={(e) => {
                      const { checked } = e.target;
                      return setValue(
                        `data.shipping.methods.${index}.enabled`,
                        checked,
                      );
                    }}
                    className="w-5 h-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    checked={method.enabled}
                  />
                </div>
                <label
                  htmlFor={`edit-shipping-${index}`}
                  className="flex-1 text-sm font-bold text-gray-900 dark:text-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faTruck} className="text-blue-600" />
                  {method.type}
                </label>
                {method.enabled && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full border border-green-300 dark:border-green-700">
                    <FontAwesomeIcon icon={faCheck} className="text-sm" />
                    Đã bật
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            {method.enabled && (
              <div className="p-5 space-y-6">
                {/* Time inputs */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Thời gian vận chuyển
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
                            {...register(
                              `data.shipping.methods.${index}.times.${inputChild.name}`,
                            )}
                            id={inputChild.id}
                            max={inputChild.max}
                            min={inputChild.min}
                          />
                        </FormField>
                      );
                    })}
                  </div>
                </div>

                {/* Province selection */}
                {SHIPPING_INPUT_LIST.find((f) => f.name === method.type)
                  ?.supportProvinceSelecteds && (
                  <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      Tỉnh thành hỗ trợ
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {provinces.map((province) => (
                        <label
                          key={province.code}
                          className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            id={`edit-province-${index}-${province.code}`}
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
                            className="w-4 h-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                            {province.name}
                          </span>
                        </label>
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
