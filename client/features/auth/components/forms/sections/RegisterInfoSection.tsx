import { CreateUserInfo } from "@/features/user/interfaces/create.interface";
import { UseFormRegister } from "react-hook-form";

export default function RegisterInfoSection({
  register,
}: {
  register: UseFormRegister<{ data: CreateUserInfo }>;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        Thông Tin Cá Nhân
      </h2>
      <div className="space-y-4 grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3 text-(--muted)">
          <label className="font-semibold text-sm" htmlFor="firstName">
            Họ
          </label>
          <input
            id="firstName"
            className="border border-(--border) rounded p-2 text-(--muted)"
            type="text"
            {...register("data.firstName")}
          />
        </div>
        <div className="flex flex-col gap-3 text-(--muted)">
          <label className="font-semibold text-sm" htmlFor="lastName">
            Tên
          </label>
          <input
            id="lastName"
            className="border border-(--border) rounded p-2 text-(--muted)"
            type="text"
            {...register("data.lastName")}
          />
        </div>
        <div className="flex flex-col gap-3 text-(--muted)">
          <label className="font-semibold text-sm" htmlFor="fullName">
            Tên đầy đủ
          </label>
          <input
            id="fullName"
            className="border border-(--border) rounded p-2 text-(--muted)"
            type="text"
            {...register("data.fullName")}
          />
        </div>
        <div className="flex flex-col gap-3 text-(--muted)">
          <label className="font-semibold text-sm" htmlFor="dateOfBirth">
            Ngày sinh
          </label>
          <input
            id="dateOfBirth"
            className="border border-(--border) rounded p-2 text-(--muted)"
            type="date"
            {...register("data.dateOfBirth")}
          />
        </div>
      </div>
    </div>
  );
}
