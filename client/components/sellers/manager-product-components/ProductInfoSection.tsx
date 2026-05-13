import React from "react";
import { createProductInfoFormData } from "@/data/create-product-form.data";

interface Props {
  onchangeProductInfo: (e: React.ChangeEvent<any>) => void;
}

export default function ProductInfoSection({ onchangeProductInfo }: Props) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-sm transition-all">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white font-bold text-sm">
          2
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Thông tin sản phẩm
        </h2>
      </div>

      <div className="space-y-5">
        {createProductInfoFormData.map((form) => (
          <div key={form.id}>
            <label
              htmlFor={form.id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {form.title}
            </label>
            <div className="relative">
              <input
                list={`${form.id}-list`}
                type={form.type}
                id={form.id}
                name={form.name}
                onChange={(e) => onchangeProductInfo(e)}
                placeholder={form.message}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all"
              />
            </div>

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
