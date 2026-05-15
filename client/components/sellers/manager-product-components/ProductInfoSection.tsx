import React from "react";
import { createProductInfoFormData } from "@/data/create-product-form.data";

interface Props {
  onchangeProductInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductInfoSection({ onchangeProductInfo }: Props) {
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Thông tin sản phẩm
      </h3>
      <div className="space-y-3">
        {createProductInfoFormData.map((form) => (
          <div key={form.id}>
            <label
              htmlFor={form.id}
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {form.title}
            </label>
            <input
              list={`${form.id}-list`}
              type={form.type}
              id={form.id}
              name={form.name}
              onChange={(e) => onchangeProductInfo(e)}
              placeholder={form.message}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
            {form.datalist && (
              <datalist id={`${form.id}-list`}>
                {form.datalist.map((data) => (
                  <option value={data.name} key={data.id} />
                ))}
              </datalist>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
