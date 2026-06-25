import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RegisterSellerAccount } from "@/features/seller/interfaces/seller.interface";

interface Props {
  register: UseFormRegister<{ data: RegisterSellerAccount }>;
}

export default function SecuritySellerSection({ register }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          5
        </span>
        Bảo Mật
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-600 mb-1">Email</label>
          <input
            {...register("data.emailAddress" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1">Mật khẩu</label>
          <input
            type="password"
            {...register("data.currentPassword" as any)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
    </section>
  );
}
