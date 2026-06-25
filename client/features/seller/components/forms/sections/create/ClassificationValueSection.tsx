import { useFieldArray } from "react-hook-form";

import { uploadOneImage } from "@/features/common/services/upload.service";
import useLoading from "@/features/common/hooks/useLoading";
import { useCreateProductContext } from "@/features/seller/contexts/CreateProductContext";
import { FormField } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ClassificationValuesSection({
  clsIndex,
}: {
  clsIndex: number;
}) {
  const { handleLoading } = useLoading();
  const { control, register, setValue, watch } = useCreateProductContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: `data.classifications.${clsIndex}.values`,
  });

  async function upload(file: File) {
    const res = await handleLoading(uploadOneImage, file);
    const { url } = res;
    return url;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((value, index) => {
        const imgValue = watch(
          `data.classifications.${clsIndex}.values.${index}.img`,
        );
        return (
          <div
            key={value.id}
            className="p-3 bg-white dark:bg-gray-600/30 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex flex-col gap-3 mb-3">
              <FormField label="Tên giá trị">
                <input
                  type="text"
                  id={`name-index-${index}`}
                  {...register(
                    `data.classifications.${clsIndex}.values.${index}.name`,
                  )}
                  placeholder="Đỏ, M, L..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-colors"
                />
              </FormField>

              <FormField label="Ảnh minh họa">
                <div className="flex items-center gap-2">
                  <div className="shrink-0 w-10 h-10 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 overflow-hidden flex items-center justify-center rounded-lg">
                    {imgValue ? (
                      <Image
                        src={imgValue}
                        alt="value-img"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id={`img-index-${index}`}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const imgUrl = await upload(file);
                      setValue(
                        `data.classifications.${clsIndex}.values.${index}.img`,
                        imgUrl,
                      );
                    }}
                    className="flex-1 text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded file:border file:border-gray-300 file:text-xs file:font-medium file:text-gray-600 dark:file:text-gray-400 file:bg-gray-50 dark:file:bg-gray-700 file:transition-colors file:duration-150 file:cursor-pointer outline-none"
                  />
                </div>
              </FormField>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="w-full py-2 px-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/40 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} className="text-sm" />
              Xóa
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append({ name: "", img: "" })}
        className="w-full py-2 px-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg transition-colors"
      >
        + Thêm giá trị
      </button>
    </div>
  );
}
