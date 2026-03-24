import {
  CartOptionResponse,
  CartVariantResponse,
} from "@/interfaces/response/cart.response";
import React from "react";

interface Props {
  cartId: string;
  variantChosen: CartVariantResponse;
  options: Array<CartOptionResponse>;
  onchangeVariantOptionChosen: ({
    id,
    key,
    e,
  }: {
    id: string;
    key: string;
    e: React.ChangeEvent<HTMLSelectElement>;
  }) => void;
}

export default function CartVariantOption({
  variantChosen,
  options,
  onchangeVariantOptionChosen,
  cartId,
}: Props) {
  return (
    <div className="shrink-0 lg:w-64">
      <div className="text-xs font-semibold text-gray-500 mb-3">
        <i className="fas fa-barcode mr-1"></i>
        SKU: {variantChosen.sku}
      </div>
      <div className="space-y-3">
        {Object.entries(variantChosen.options).map(([key, value], index) => (
          <div key={index}>
            <label
              htmlFor={value}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {options.find((f) => f.key === key)?.label}
            </label>
            <select
              name={key}
              onChange={(e) => {
                onchangeVariantOptionChosen({
                  id: cartId,
                  key,
                  e,
                });
              }}
              id={value}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none bg-white"
            >
              <option value={value}>
                {
                  options
                    .find((f) => f.key === key)
                    ?.values.find((vlF) => vlF.value === value)?.display
                }
                {" (Đã chọn)"}
              </option>
              {options
                .find((f) => f.key === key)
                ?.values.filter((ft) => ft.value !== value)
                .map((value) => (
                  <option value={value.value} key={value.value}>
                    {value.display}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
