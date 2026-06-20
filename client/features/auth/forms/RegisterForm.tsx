"use client";

import { RegisterUserAccountRequest } from "@/features/user/interfaces/user.interface";

import AggreeRegisterSection from "./sections/AggreeRegisterSection";
import RegisterNavigateSection from "./sections/RegisterNavigateSection";
import RegisterSubmitButton from "../ui/RegisterSubmitButton";
import { useFieldArray, useForm } from "react-hook-form";
import RegisterPhoneSection from "./sections/RegisterPhoneSection";
import RegisterSecuritySection from "./sections/RegisterSecuritySection";
import RegisterAddressSection from "./sections/RegisterAddressSection";
import RegisterBasicSection from "./sections/RegisterBasicSection";
import useUserRegister from "../hooks/useUserRegister";

export default function RegisterForm() {
  const { control, register, handleSubmit, watch, setValue } = useForm<{
    data: RegisterUserAccountRequest;
  }>({
    defaultValues: {
      data: {
        address: [
          {
            province: "",
            addressDetail: "",
            ward: "",
          },
        ],
        currentPassword: "",
        dateOfBirth: "",
        emailAddress: "",
        firstName: "",
        fullName: "",
        lastName: "",
        phones: [
          {
            phoneNumber: "",
          },
        ],
      },
    },
  });

  const { submitRegister, addressApi } = useUserRegister();

  const addressFields = useFieldArray({
    control,
    name: "data.address",
  });

  const phoneFields = useFieldArray({
    control,
    name: "data.phones",
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-orange-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Tạo Tài Khoản</h1>
          <p className="text-orange-100 mt-2">
            Đăng ký để bắt đầu mua sắm ngay hôm nay
          </p>
        </div>

        {/* Form Container */}
        <form
          id="register-user-form"
          className="p-8 space-y-8"
          onSubmit={handleSubmit((formData) => submitRegister(formData.data))}
        >
          {/* Section 1: Thông Tin Cơ Bản */}
          <RegisterBasicSection register={register} />
          {/* Section 2: Thông Tin Liên Hệ */}
          <RegisterPhoneSection
            phoneFields={phoneFields}
            setValue={setValue}
            watch={watch}
          />
          {/* Section 3: Địa Chỉ */}
          <RegisterAddressSection
            addressApi={addressApi}
            addressFields={addressFields}
            setValue={setValue}
            watch={watch}
          />
          <RegisterSecuritySection />
          {/* Submit Section */}
          <RegisterSubmitButton />
          {/* navigate section */}
          <RegisterNavigateSection />
          {/* aggree checkbox */}
          <AggreeRegisterSection />
        </form>
      </div>
    </div>
  );
}
