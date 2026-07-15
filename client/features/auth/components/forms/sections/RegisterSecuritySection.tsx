import { CreateUserSecurity } from "@/features/user/interfaces/create.interface";
import { UseFormRegister } from "react-hook-form";

export default function RegisterSecuritySection({
  register,
}: {
  register: UseFormRegister<{ data: CreateUserSecurity }>;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        Bảo mật
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 text-(--muted)">
          <label className="font-semibold text-sm" htmlFor="emailAddress">
            Địa chỉ email
          </label>
          <input
            id="emailAddress"
            className="border border-(--border) rounded p-2 text-(--muted)"
            type="email"
            {...register("data.emailAddress")}
          />
        </div>
        <div className="flex flex-col gap-3 text-(--muted)">
          <label className="font-semibold text-sm" htmlFor="currentPassword">
            Mật khẩu
          </label>
          <input
            id="currentPassword"
            className="border border-(--border) rounded p-2 text-(--muted)"
            type="password"
            {...register("data.currentPassword")}
          />
        </div>
      </div>
    </div>
  );
}
