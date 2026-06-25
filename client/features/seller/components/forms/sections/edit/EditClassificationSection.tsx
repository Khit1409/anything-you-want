"use client";

import { useFieldArray } from "react-hook-form";
import EditClassificationValuesSection from "./EditClassificationValueSection";
import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard, FormField } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

export default function EditClassificationSection() {
  const { register, control } = useEditProductConext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "data.classifications",
  });

  return (
    <SectionCard
      title="Phân loại sản phẩm"
      description="Cập nhật các tiêu chí phân loại sản phẩm"
      icon={faTags}
    >
      <div className="space-y-6">
        {fields.map((cls, clsIndex) => (
          <div
            className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded p-6"
            key={cls.id}
          >
            {/* Classification Name Header */}
            <div className="flex justify-between items-start gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                  Tiêu chí phân loại #{clsIndex + 1}
                </label>
                <FormField label="Tên tiêu chí">
                  <input
                    type="text"
                    {...register(`data.classifications.${clsIndex}.name`)}
                    placeholder="Ví dụ: Màu sắc, Kích thước, Chất liệu"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all placeholder:text-gray-400"
                  />
                </FormField>
              </div>
              <button
                type="button"
                onClick={() => remove(clsIndex)}
                className="mt-2 px-4 py-2.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/40 rounded flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} className="text-sm" />
                <span className="text-sm font-medium">Xóa</span>
              </button>
            </div>

            {/* Classification Values */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 block">
                Giá trị của tiêu chí
              </label>
              <EditClassificationValuesSection clsIndex={clsIndex} />
            </div>
          </div>
        ))}

        {/* Add Classification Button */}
        {fields.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <FontAwesomeIcon
              icon={faTags}
              className="text-gray-400 text-4xl mb-3"
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Chưa có phân loại nào được thêm
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            append({
              id: "",
              name: "",
              values: [{ id: "", name: "", img: "" }],
            })
          }
          className="w-full py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-300 dark:border-blue-800 rounded flex items-center justify-center gap-2 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} />
          Thêm tiêu chí phân loại
        </button>
      </div>
    </SectionCard>
  );
}
