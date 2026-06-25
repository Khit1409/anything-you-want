import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RegisterSellerAccount } from "@/features/seller/interfaces/seller.interface";

interface Props {
  register: UseFormRegister<{ data: RegisterSellerAccount }>;
}

export default function BasicSellerSection({ register }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          1
        </span>
        Thông Tin Cá Nhân
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-2">Họ</label>
          <input
            {...register("data.info.firstName" as any)}
            className="px-3 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-2">Tên</label>
          <input
            {...register("data.info.lastName" as any)}
            className="px-3 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-2">
            Tên đầy đủ
          </label>
          <input
            {...register("data.info.fullName" as any)}
            className="px-3 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-2">
            Ngày sinh
          </label>
          <input
            type="date"
            {...register("data.info.dateOfBirth" as any)}
            className="px-3 py-2 border rounded"
          />
        </div>
      </div>
    </section>
  );
}
