import React from "react";
import {
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { RegisterSellerAccount } from "@/features/seller/interfaces/seller.interface";

interface Props {
  addressFields: UseFieldArrayReturn<
    { data: RegisterSellerAccount },
    "data.addresses",
    "id"
  >;
  setValue: UseFormSetValue<{ data: RegisterSellerAccount }>;
  watch: UseFormWatch<{ data: RegisterSellerAccount }>;
  register: UseFormRegister<{ data: RegisterSellerAccount }>;
}

export default function AddressSellerSection({
  addressFields,
  setValue,
  watch,
  register,
}: Props) {
  const { fields, append, remove } = addressFields;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          3
        </span>
        Địa Chỉ
      </h2>

      <div className="space-y-4">
        {fields.map((a, idx) => (
          <div key={a.id} className="p-4 border rounded space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register(`data.addresses.${idx}.province` as any)}
                placeholder="Tỉnh/Thành"
                className="px-3 py-2 border rounded"
              />
              <input
                {...register(`data.addresses.${idx}.ward` as any)}
                placeholder="Quận/Huyện"
                className="px-3 py-2 border rounded"
              />
            </div>
            <input
              {...register(`data.addresses.${idx}.addressDetail` as any)}
              placeholder="Địa chỉ chi tiết"
              className="w-full px-3 py-2 border rounded"
            />
            {idx > 0 && (
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-red-500"
              >
                Xóa địa chỉ
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ addressDetail: "", province: "", ward: "" })}
          className="text-orange-500"
        >
          Thêm địa chỉ
        </button>
      </div>
    </section>
  );
}
