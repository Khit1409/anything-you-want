import React from "react";

interface Options {
  key: string;
  label: string;
  values: Array<{ value: string; display: string; image?: string }>;
}

interface Props {
  options: {
    slug: string;
    values: {
      value: string;
      label: string;
    }[];
  }[];
  categorySlug: string;
  optionSelected: Array<Options>;
  optionValues: {
    value: string;
    attributes: string[];
  }[];
  setProductOption: React.Dispatch<React.SetStateAction<Options[]>>;
}

export default function CreateProductVariant({
  options,
  categorySlug,
  optionSelected,
  setProductOption,
  optionValues,
}: Props) {
  /**
   *
   */
  const onchangeOption = ({
    e,
    key,
    label,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    key: string;
    label: string;
  }) => {
    if (e.target.checked) {
      setProductOption((prev) => [...(prev ?? []), { key, label, values: [] }]);
    } else {
      setProductOption((prev) => [...prev.filter((f) => f.key !== key)]);
    }
  };
  /**
   *
   * @param param0
   */
  const onchangeOptionValue = ({
    e,
    key,
    label,
    optionValue,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    key: string;
    label: string;
    optionValue: string;
  }) => {
    if (e.target.checked) {
      setProductOption((prev) => {
        const existing = prev.find((f) => f.key == key);
        if (!existing) {
          return [
            ...prev,
            {
              key,
              label,
              values: [
                {
                  value: optionValue,
                  image: "",
                  display: optionValue,
                },
              ],
            },
          ];
        }
        return prev.map((option) =>
          option.key === key
            ? {
                ...option,
                values: [
                  ...(option.values ?? []),
                  {
                    value: optionValue,
                    display: optionValue,
                    image: "",
                  },
                ],
              }
            : option
        );
      });
    } else {
      setProductOption((prev) => {
        return prev.map((option) =>
          option.key === key
            ? {
                ...option,
                values: option.values.filter((f) => f.value !== optionValue),
              }
            : option
        );
      });
    }
  };
  /**
   *
   */
  const optionFlowCategory = (categorySlug: string) => {
    return options
      .filter((option) => option.slug === categorySlug)
      .flatMap((option) => option.values);
  };
  /**
   *
   * @param key
   * @returns
   */
  const optionValueFlowOptionKey = (key: string) => {
    return optionValues
      .filter((optionValue) => optionValue.value === key)
      .flatMap((optionValue) => optionValue.attributes);
  };

  return (
    <div className="space-y-6">
      {optionFlowCategory(categorySlug).length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="mt-2">Không có phân loại nào cho danh mục này</p>
        </div>
      ) : (
        optionFlowCategory(categorySlug).map((value, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 bg-white hover:border-gray-300 transition-colors"
          >
            {/* Option Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <input
                type="checkbox"
                id={value.value}
                value={value.label}
                checked={
                  optionSelected.find((f) => f.key == value.value)
                    ? true
                    : false
                }
                onChange={(e) => {
                  onchangeOption({ e, key: value.value, label: value.label });
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor={value.value}
                className="text-base font-semibold text-gray-900 cursor-pointer select-none"
              >
                {value.label}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({value.value})
                </span>
              </label>
            </div>

            {/* Option Values */}
            {optionValueFlowOptionKey(value.value).length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Giá trị
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {optionValueFlowOptionKey(value.value).map(
                    (optionValue, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        <input
                          type="checkbox"
                          value={optionValue}
                          checked={
                            optionSelected
                              .find((key) => key.key == value.value)
                              ?.values.find((vl) => vl.value === optionValue)
                              ? true
                              : false
                          }
                          id={`${value.value}-${optionValue}`}
                          onChange={(e) => {
                            onchangeOptionValue({
                              e,
                              key: value.value,
                              label: value.label,
                              optionValue,
                            });
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`${value.value}-${optionValue}`}
                          className="text-sm text-gray-700 cursor-pointer select-none flex-1"
                        >
                          {optionValue}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
