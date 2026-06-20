import React from "react";
import {
  UseFieldArrayReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { RegisterUserAccountRequest } from "@/interfaces";
import { Provinces, Wards } from "@/features/address.feature";

interface SectionProps {
  addressFields: UseFieldArrayReturn<
    {
      data: RegisterUserAccountRequest;
    },
    "data.address",
    "id"
  >;
  addressApi: {
    wards: Wards;
    provinces: Provinces;
  };
  setValue: UseFormSetValue<{ data: RegisterUserAccountRequest }>;
  watch: UseFormWatch<{ data: RegisterUserAccountRequest }>;
}

export default function RegisterAddressSection({
  addressFields,
  addressApi,
  setValue,
  watch,
}: SectionProps) {
  const { provinces, wards } = addressApi;
  const { fields, remove, append } = addressFields;
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          3
        </span>
        Địa Chỉ
      </h2>
      <div className="space-y-4">
        {fields.map((address, index) => (
          <div
            key={address.id}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Địa Chỉ {index + 1}
              </label>
              {index > 0 && (
                <button
                  onClick={() => remove(index)}
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
                <label
                  className="text-sm font-medium text-gray-600 mb-2"
                  htmlFor={`province-${index}`}
                >
                  Tỉnh/Thành Phố <span className="text-red-500">*</span>
                </label>
                <select
                  name="province"
                  id={`province-${index}`}
                  value={watch(`data.address.${index}.province`)}
                  onChange={(e) =>
                    setValue(`data.address.${index}.province`, e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white cursor-pointer"
                >
                  <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium text-gray-600 mb-2"
                  htmlFor={`ward-${index}`}
                >
                  Quận/Huyện <span className="text-red-500">*</span>
                </label>
                <select
                  name="ward"
                  value={watch(`data.address.${index}.ward`)}
                  id={`ward-${index}`}
                  onChange={(e) =>
                    setValue(`data.address.${index}.ward`, e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white cursor-pointer"
                >
                  <option value="">
                    {watch(`data.address.${index}.province`)
                      ? "--Chọn Quận/Huyện--"
                      : "--Vui lòng chọn Tỉnh/Thành phố trước"}
                  </option>
                  {watch(`data.address.${index}.province`) &&
                    wards
                      .filter(
                        (w) =>
                          w.province_code ===
                          provinces.find(
                            (f) =>
                              f.name ===
                              watch(`data.address.${index}.province`),
                          )!.code,
                      )
                      .map((ward) => (
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
                onChange={(e) =>
                  setValue(
                    `data.address.${index}.addressDetail`,
                    e.target.value,
                  )
                }
                name="addressDetail"
                value={watch(`data.address.${index}.addressDetail`)}
                placeholder="VD: 123 Đường Abc, Phường Xyz"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
          </div>
        ))}

        {fields.length < 3 && (
          <button
            type="button"
            onClick={() =>
              append({ province: "", ward: "", addressDetail: "" })
            }
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50 transition"
          >
            <i className="fas fa-plus text-lg"></i>
            Thêm Địa Chỉ
          </button>
        )}
      </div>
    </div>
  );
}
