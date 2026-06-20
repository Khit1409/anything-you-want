import { RegisterUserAccountRequest } from "@/interfaces";
import React from "react";
import {
  UseFieldArrayReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface SectionProps {
  phoneFields: UseFieldArrayReturn<
    {
      data: RegisterUserAccountRequest;
    },
    "data.phones",
    "id"
  >;
  setValue: UseFormSetValue<{
    data: RegisterUserAccountRequest;
  }>;
  watch: UseFormWatch<{
    data: RegisterUserAccountRequest;
  }>;
}

export default function RegisterPhoneSection({
  phoneFields,
  setValue,
  watch,
}: SectionProps) {
  const { fields, remove, append } = phoneFields;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          2
        </span>
        Thông Tin Liên Hệ
      </h2>
      {/* so dien thoai */}
      <div className="space-y-4">
        {fields.map((phone, index) => (
          <div key={phone.id} className="flex gap-3 items-end">
            <div className="flex-1 flex flex-col">
              <label
                className="text-sm font-medium text-gray-700 mb-2"
                htmlFor={`phone_number_${index}`}
              >
                Số Điện Thoại {index + 1}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id={`phoneNumber_${index}`}
                name={`phoneNumber_${index}`}
                data-index={String(index + 1)}
                placeholder="0xxxxxxxxx"
                maxLength={10}
                value={watch(`data.phones.${index}.phoneNumber`)}
                onChange={(e) => {
                  setValue(`data.phones.${index}.phoneNumber`, e.target.value);
                }}
                minLength={10}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                title="Xóa số điện thoại"
              >
                xóa
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => append([{ phoneNumber: "" }])}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition"
        >
          <i className="fas fa-plus text-lg"></i>
          Thêm Số Điện Thoại
        </button>
      </div>
    </div>
  );
}
