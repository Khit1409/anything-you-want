import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import AggreeLoginSection from "./sections/AggreeLoginSection";
import LoginSubmitButton from "../ui/LoginSubmitButton";
import DividerLoginSection from "./sections/DividerLoginSection";
import LoginNavigateSection from "./sections/LoginNavigateSection";
import LoginInputText from "../ui/LoginInput";
import HeaderLoginSection from "./sections/HeaderLoginSection";
import useLogin from "@/features/auth/hooks/useLogin";
import { LoginRequest } from "@/authInterfaces/auth.interface";

export default function LoginForm() {
  const [isAggree, setIsAggre] = useState<boolean>(false);

  const { register, setValue, handleSubmit, control } = useForm<{
    data: LoginRequest;
  }>({
    defaultValues: {
      data: {
        currentPassword: "",
        emailAddress: "",
        loginRole: "user",
      },
    },
  });

  const currentRole = useWatch({
    control,
    name: "data.loginRole",
  });

  const { submitForm } = useLogin();

  return (
    <div
      className={`p-8 flex-1 flex items-center justify-center rounde-r-xl shadow-lg bg-(--surface) backdrop-blur-sm`}
    >
      <form
        className="w-full max-w-md"
        onSubmit={handleSubmit((formData) => submitForm(formData.data))}
      >
        {/* Header */}
        <HeaderLoginSection />
        <LoginInputText
          useFormFn={{
            register,
            setValue,
          }}
          classNameConfig={{
            divClass: "w-full mb-5",
            inputClass:
              "border border-(--border) p-3 rounded-full w-full outline-none bg-(--surface) focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200",
            labelClass: "",
          }}
          name="data.emailAddress"
          type="email"
          iconProp="faEnvelope"
          label="Địa chỉ email"
          mess="youremail@gmail.com"
        />
        <LoginInputText
          useFormFn={{
            register,
            setValue,
          }}
          classNameConfig={{
            divClass: "w-full mb-5",
            inputClass:
              "border border-(--border) p-3 rounded-full w-full outline-none bg-(--surface) focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200",
            labelClass: "",
          }}
          name="data.currentPassword"
          type="password"
          iconProp="faLock"
          label="Mật khẩu"
          mess="**************"
        />

        {/* Checkboxes */}

        <AggreeLoginSection
          currentRole={currentRole}
          isAggree={isAggree}
          setIsAggree={setIsAggre}
          setValue={setValue}
        />
        {/* Submit button */}
        <LoginSubmitButton
          divClass="mb-6"
          messButton="Đăng nhập"
          styleClass="w-full py-3 px-4 rounded-lg bg-linear-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
          title="Đăng nhập"
        />
        {/* Divider */}
        <DividerLoginSection />
        {/* Links */}
        <LoginNavigateSection />
      </form>
    </div>
  );
}
