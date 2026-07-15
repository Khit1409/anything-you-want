import { Provinces, Wards } from "@/features/common/services/address.service";
import { CreateUserAddress } from "@/features/user/interfaces/create.interface";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface SectionProps {
  fields: FieldArrayWithId<
    {
      data: CreateUserAddress[];
    },
    "data",
    "id"
  >[];
  register: UseFormRegister<{ data: CreateUserAddress[] }>;
  append: UseFieldArrayAppend<
    {
      data: CreateUserAddress[];
    },
    "data"
  >;
  remove: UseFieldArrayRemove;
  provinces: Provinces;
  wards: Wards;
  watch: UseFormWatch<{
    data: CreateUserAddress[];
  }>;
}

export default function RegisterAddressSection({
  register,
  fields,
  append,
  remove,
  wards,
  provinces,
  watch,
}: SectionProps) {
  const wardListByProvinceName = (name: string) => {
    const province = provinces.find((f) => f.name === name);
    console.log(name);
    if (!province) return [];
    const provinceCode = province.code;
    return wards.filter((ft) => ft.province_code == provinceCode);
  };
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        Thông Tin Địa Chỉ
      </h2>
      <div className="space-y-4 flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 text-(--muted)">
              <label
                htmlFor={`provinces${index}`}
                className="font-semibold text-sm"
              >
                Tỉnh / Thành Phố
              </label>
              <select
                id={`provinces${index}`}
                {...register(`data.${index}.province`)}
                className="border-(--border) p-2 rounded outline-0 text-center border"
              >
                <option value="">--- Tỉnh/Thành Phố---</option>
                {provinces.map((province) => (
                  <option value={province.name} key={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 text-(--muted)">
              <label
                htmlFor={`wards${index}`}
                className="font-semibold text-sm"
              >
                Quận / Huyện
              </label>
              <select
                {...register(`data.${index}.ward`)}
                id={`wards${index}`}
                className="border-(--border) p-2 rounded outline-0 text-center border"
              >
                <option value="">--- Quận / Huyện---</option>
                {wardListByProvinceName(watch(`data.${index}.province`)).map(
                  (ward) => (
                    <option value={ward.name} key={ward.code}>
                      {ward.name}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="flex flex-col gap-3 text-(--muted)">
              <label className="font-semibold text-sm" htmlFor="addressDetail">
                Địa chỉ chi tiết
              </label>
              <input
                id="addressDetail"
                className="border border-(--border) rounded p-2 text-(--muted)"
                type="text"
                {...register(`data.${index}.addressDetail`)}
              />
            </div>
          </div>
        ))}
        <div className="">
          <button
            className="flex items-center gap-3"
            type="button"
            onClick={() =>
              append({ addressDetail: "", province: "", ward: "" })
            }
          >
            Thêm địa chỉ
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
