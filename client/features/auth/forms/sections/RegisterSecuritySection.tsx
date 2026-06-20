import RegisterInput from "../../ui/RegisterInput";

export default function RegisterSecuritySection() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          4
        </span>
        Bảo mật
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <RegisterInput
            elementProps={{
              label: "Mật khẩu",
              type: "password",
              name: "data.currentPassword",
              value: "",
            }}
          />
          <RegisterInput
            elementProps={{
              label: "Nhập lại mật khẩu",
              type: "password",
              name: "data.currentPassword",
              value: "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
