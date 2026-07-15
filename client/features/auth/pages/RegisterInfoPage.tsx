"use client";

import RegisterInfoForm from "../components/forms/RegisterInfoForm";

export default function RegisterInfoPage() {
  return (
    <div className="min-h-screen w-full register-bg-img from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <RegisterInfoForm />
      </div>
    </div>
  );
}
