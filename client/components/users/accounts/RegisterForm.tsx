"use client";

import { registerBasicInput } from "@/data/register-form.data";
import useRegister from "@/hooks/users/useRegister";
import { RegisterUserInfoRequest } from "@/interfaces/user.interface";
import Link from "next/link";

export default function RegisterForm() {
  const {
    countAddress,
    countPhone,
    setCountPhone,
    setCountAddress,
    onchangeInfo,
    infoData,
    onchangeAddress,
    onchangePhone,
    removeAddressInput,
    removePhoneInput,
    provinceCode,
    setProvinceCode,
    provinceList,
    wardList,
    rePassword,
    setRePassword,
    submitRegister,
    handleMess,
  } = useRegister();

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
          onSubmit={(e) => submitRegister(e)}
        >
          {/* Section 1: Thông Tin Cơ Bản */}
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
                  <div className="flex flex-col" key={form.id}>
                    <label
                      className="text-sm font-medium text-gray-700 mb-2"
                      htmlFor={form.id}
                    >
                      {form.title}
                      {form.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      onChange={(e) => onchangeInfo(e)}
                      type={form.type}
                      id={form.id}
                      name={form.name}
                      placeholder={form.message}
                      value={
                        infoData[form.name as keyof RegisterUserInfoRequest]
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Thông Tin Liên Hệ */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                2
              </span>
              Thông Tin Liên Hệ
            </h2>
            {/* so dien thoai */}
            <div className="space-y-4">
              {Array.from({ length: countPhone }).map((_, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1 flex flex-col">
                    <label
                      className="text-sm font-medium text-gray-700 mb-2"
                      htmlFor={`phone_number_${index}`}
                    >
                      Số Điện Thoại {index > 0 && index + 1}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id={`phoneNumber_${index}`}
                      name={`phoneNumber_${index}`}
                      data-index={String(index + 1)}
                      placeholder="0xxxxxxxxx"
                      maxLength={10}
                      onChange={(e) => onchangePhone(e)}
                      minLength={10}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removePhoneInput(index + 1)}
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
                onClick={() => setCountPhone((prev) => prev + 1)}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition"
              >
                <i className="fas fa-plus text-lg"></i>
                Thêm Số Điện Thoại
              </button>
            </div>
          </div>

          {/* Section 3: Địa Chỉ */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                3
              </span>
              Địa Chỉ
            </h2>
            <div className="space-y-4">
              {Array.from({ length: countAddress }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Địa Chỉ {index > 0 && index + 1}
                    </label>
                    {index > 0 && (
                      <button
                        onClick={() => removeAddressInput(index + 1)}
                        type="button"
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                        title="Xóa địa chỉ"
                      >
                        <i className="fas fa-trash text-sm"></i>
                        Xóa
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-2">
                        Tỉnh/Thành Phố <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="province"
                        onChange={(e) => {
                          console.log(
                            Number(
                              e.target.selectedOptions[0].dataset.province_code
                            )
                          );
                          setProvinceCode(
                            Number(
                              e.target.selectedOptions[0].dataset.province_code
                            )
                          );
                          onchangeAddress(e);
                        }}
                        data-index={index + 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white cursor-pointer"
                      >
                        <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                        {provinceList.map((province) => (
                          <option
                            key={province.code}
                            value={province.name}
                            data-province_code={province.code}
                          >
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-2">
                        Quận/Huyện <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="ward"
                        onChange={(e) => {
                          onchangeAddress(e);
                        }}
                        data-index={index + 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white cursor-pointer"
                      >
                        <option value="">-- Chọn Quận/Huyện --</option>
                        {provinceCode &&
                          wardList.map((ward) => (
                            <option key={ward.code} value={ward.name}>
                              {ward.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-2">
                      Địa Chỉ Chi Tiết <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => onchangeAddress(e)}
                      name="addressDetail"
                      data-index={index + 1}
                      placeholder="VD: 123 Đường Abc, Phường Xyz"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>
                </div>
              ))}

              {countAddress < 3 && (
                <button
                  type="button"
                  onClick={() => setCountAddress((prev) => prev + 1)}
                  className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition"
                >
                  <i className="fas fa-plus text-lg"></i>
                  Thêm Địa Chỉ
                </button>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Bảo mật
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      className="text-sm font-medium text-gray-700 mb-2"
                      htmlFor="currentPassword"
                    >
                      Mật khẩu của bạn
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      onChange={(e) => onchangeInfo(e)}
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={infoData.currentPassword}
                      placeholder="*******"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="text-sm font-medium text-gray-700 mb-2"
                      htmlFor="currentPassword"
                    >
                      Nhập lại mật khẩu của bạn
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      onChange={(e) => setRePassword(e.target.value)}
                      type="password"
                      id="rePassword"
                      value={rePassword}
                      name="rePassword"
                      placeholder="*******"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="border-t pt-6 space-y-4">
            <button
              type="submit"
              className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Tạo Tài Khoản
            </button>

            <div className="text-center">
              <p className="text-sm text-red-500 italic">
                {handleMess && `*${handleMess}`}
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Đã có tài khoản?
                <Link
                  href="/login"
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Đăng Nhập Ngay
                </Link>
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-xs">
                Bằng cách tạo tài khoản, bạn đồng ý với
                <br />
                <Link
                  href="#"
                  className="text-orange-500 hover:text-orange-600"
                >
                  Điều Khoản Dịch Vụ
                </Link>
                <span className="mx-1">và</span>
                <Link
                  href="#"
                  className="text-orange-500 hover:text-orange-600"
                >
                  Chính Sách Bảo Mật
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
