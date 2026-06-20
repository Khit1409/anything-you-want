import { registerBasicInput } from "@/data";
import React from "react";
import RegisterInput from "../../ui/RegisterInput";
import { RegisterUserAccountRequest } from "@/interfaces";
import { UseFormRegister } from "react-hook-form";

interface SectionProps {
  register: UseFormRegister<{ data: RegisterUserAccountRequest }>;
}

export default function RegisterBasicSection({ register }: SectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          1
        </span>
        Thông Tin Cơ Bản
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {registerBasicInput.map((form) => (
            <RegisterInput
              key={form.id}
              elementProps={{
                label: form.title,
                name: `data.${form.name as keyof RegisterUserAccountRequest}`,
                id: form.id,
                isRequired: form.required,
                mess: form.message,
              }}
              useFormFn={{
                register,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
