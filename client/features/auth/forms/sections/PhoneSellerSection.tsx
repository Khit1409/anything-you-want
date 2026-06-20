import React from "react";
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import {
  RegisterSellerAccount,
  SellerPhoneType,
} from "@/features/seller/interfaces/seller.interface";

interface Props {
  phoneFields: UseFieldArrayReturn<
    { data: RegisterSellerAccount },
    "data.phones",
    "id"
  >;
  register: UseFormRegister<{ data: RegisterSellerAccount }>;
}

export default function PhoneSellerSection({ phoneFields, register }: Props) {
  const { fields, append, remove } = phoneFields;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          2
        </span>
        Số Điện Thoại
      </h2>

      <div className="space-y-3">
        {fields.map((f, idx) => (
          <div key={f.id} className="flex gap-3 items-center">
            <input
              {...register(`data.phones.${idx}.phoneNumber`)}
              placeholder="0xxxxxxxxx"
              maxLength={10}
              className="flex-1 px-3 py-2 border rounded"
            />
            {idx > 0 && (
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-red-500"
              >
                Xóa
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ phoneNumber: "", type: SellerPhoneType.INDIVIDUAL })
          }
          className="text-orange-500"
        >
          Thêm số điện thoại
        </button>
      </div>
    </section>
  );
}
