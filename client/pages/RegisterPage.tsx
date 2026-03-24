"use client";

import RegisterForm from "@/components/users/RegisterForm";
import useRegister from "@/hooks/users/useRegister";

export default function RegisterPage() {
  const {
    formData,
    inputAddress,
    inputPhone,
    setFormData,
    setInputAddress,
    setInputPhone,
  } = useRegister();

  return (
    <div className="w-screen h-screen overflow-hidden register-bg-img">
      <div className="w-full h-full flex items-center justify-center">
        <RegisterForm addressInput={inputAddress} phoneInput={inputPhone} />
      </div>
    </div>
  );
}
