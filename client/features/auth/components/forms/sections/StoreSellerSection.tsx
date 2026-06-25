import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RegisterSellerAccount } from "@/features/seller/interfaces/seller.interface";

interface Props {
  register: UseFormRegister<{ data: RegisterSellerAccount }>;
}

export default function StoreSellerSection({ register }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          4
        </span>
        Thông Tin Cửa Hàng
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-600 mb-1">Tên cửa hàng</label>
          <input
            {...register("data.store.info.name" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1">
            Số điện thoại cửa hàng
          </label>
          <input
            {...register("data.store.info.phoneNumber" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-gray-600 mb-1">Mô tả cửa hàng</label>
          <textarea
            {...register("data.store.info.description" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1">Email cửa hàng</label>
          <input
            {...register("data.store.info.emailAddress" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1">Thumbnail URL</label>
          <input
            {...register("data.store.info.thumbnail" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
    </section>
  );
}
