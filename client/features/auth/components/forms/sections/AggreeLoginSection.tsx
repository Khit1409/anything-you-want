import { LoginRequest } from "@/features/auth/interfaces/auth.interface";
import { Role } from "@/features/common/interfaces/common.interface";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

interface SectionProps {
  currentRole: Role;
  setIsAggree: React.Dispatch<React.SetStateAction<boolean>>;
  isAggree: boolean;
  setValue: UseFormSetValue<{
    data: LoginRequest;
  }>;
}

export default function AggreeLoginSection({
  currentRole,
  setIsAggree,
  setValue,
  isAggree,
}: SectionProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          required
          id="isAggree"
          onChange={(e) => setIsAggree(e.target.checked)}
          checked={isAggree}
          className="w-4 h-4 text-green-500 border-(--border) rounded focus:ring-green-500 cursor-pointer"
        />
        <label
          htmlFor="isAggree"
          className="ml-2 text-sm text-(--muted) cursor-pointer"
        >
          Tôi đồng ý với điều khoản và dịch vụ
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="isSeller"
          id="isSeller"
          onChange={(e) =>
            setValue("data.loginRole", e.target.checked ? "seller" : "user")
          }
          checked={currentRole === "seller" ? true : false}
          className="w-4 h-4 text-green-500 border-(--border) rounded focus:ring-green-500 cursor-pointer"
        />
        <label
          htmlFor="isSeller"
          className="ml-2 text-sm text-(--muted) cursor-pointer"
        >
          Đăng nhập với tư cách người bán
        </label>
      </div>
    </div>
  );
}
