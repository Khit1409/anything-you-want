"use client";

import RegisterForm from "@/components/users/accounts/RegisterForm";
import useRegister from "@/hooks/users/useRegister";

export default function RegisterPage() {
  const { formData, setFormData } = useRegister();

  return (
    <div className="min-h-screen w-full register-bg-img from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <RegisterForm />
      </div>
    </div>
  );
}
