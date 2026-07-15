import React from "react";
import useCreateUserAddress from "../../hooks/useCreateUserAddress";
import RegisterAddressSection from "./sections/RegisterAddressSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function RegisterAddressForm() {
  const {
    handleSubmit,
    submitForm,
    register,
    fields,
    remove,
    append,
    provinces,
    wards,
    watch,
  } = useCreateUserAddress();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-orange-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            Tạo Thông Tin Tài Khoản
          </h1>
          <p className="text-orange-100 mt-2">
            Đăng ký để bắt đầu mua sắm ngay hôm nay
          </p>
        </div>

        <form
          id="register-info-form"
          className="p-8 space-y-8"
          onSubmit={handleSubmit((formData) => submitForm(formData.data))}
        >
          <RegisterAddressSection
            register={register}
            fields={fields}
            remove={remove}
            append={append}
            provinces={provinces}
            wards={wards}
            watch={watch}
          />
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="px-2 py-1 bg-gray-500 text-white rounded flex items-center justify-around gap-2"
            >
              Tiếp theo
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
