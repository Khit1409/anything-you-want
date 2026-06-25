"use client";

import { useFieldArray } from "react-hook-form";
import ClassificationValueForm from "./ClassificationValueSection";
import { useCreateProductContext } from "@/features/seller/contexts/CreateProductContext";
import { SectionCard, FormField } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";

export default function ClassificationSection() {
  const { register, control } = useCreateProductContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "data.classifications",
  });

  return (
    <SectionCard
      title="Phân loại sản phẩm"
      description="Thêm các tiêu chí phân loại như màu sắc, kích thước, v.v."
    >
      <div className="space-y-6">
        {fields.map((cls, clsIndex) => (
          <div
            className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            key={cls.id}
          >
            <div className="flex justify-between items-start mb-4">
              <FormField label="Tên phân loại">
                <input
                  type="text"
                  {...register(`data.classifications.${clsIndex}.name`)}
                  placeholder="Ví dụ: Màu, Kích thước"
                  className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-colors"
                />
              </FormField>
              <button
                type="button"
                onClick={() => remove(clsIndex)}
                className="mt-7 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            <ClassificationValueForm clsIndex={clsIndex} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", values: [{ name: "", img: "" }] })}
        className="w-full mt-4 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <FontAwesomeIcon icon={faPlus} />
        Thêm phân loại
      </button>
  
    </SectionCard>
  );
}
