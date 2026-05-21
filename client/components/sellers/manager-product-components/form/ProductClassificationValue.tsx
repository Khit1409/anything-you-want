import { ProductClassificationValue as Value } from "@/interfaces/product.interface";
import Image from "next/image";
import EditClassificationInput from "../ui/EditClassificationInput";

interface Props {
  parentIndex: number;
  indexVl: number;
  value: Value;
}

export default function ProductClassificationValue({
  parentIndex,
  indexVl,
  value,
}: Props) {
  return (
    <div className="p-3 rounded-md border border-gray-100 dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-start gap-4">
        {/* Image */}
        {value.img && (
          <div className="shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
            <Image
              src={value.img}
              alt={value.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Info Fields */}
        <div className="flex-1 grid grid-cols-3 gap-4 text-xs">
          {/* Tên giá trị */}
          <div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-2 font-medium">
              Tên giá trị
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {value.name}
              </span>
              <EditClassificationInput
                typeInput="text"
                defaultValue={value.name}
                idInput="classification-value-name"
                index={indexVl}
                parentIndex={parentIndex}
              />
            </div>
          </div>

          {/* Số lượng */}
          <div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-2 font-medium">
              Số lượng
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {value.stock}
              </span>
              <EditClassificationInput
                typeInput="number"
                defaultValue={value.stock}
                idInput="classification-value-stock"
                index={indexVl}
                parentIndex={parentIndex}
              />
            </div>
          </div>

          {/* Giá tăng */}
          <div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-2 font-medium">
              Giá tăng
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {value.extraPrice ? `${value.extraPrice}₫` : "0"}
              </span>
              <EditClassificationInput
                typeInput="number"
                defaultValue={value.extraPrice}
                idInput="classification-value-extra-price"
                index={indexVl}
                parentIndex={parentIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
