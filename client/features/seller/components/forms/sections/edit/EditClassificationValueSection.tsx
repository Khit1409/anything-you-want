import { useFieldArray } from "react-hook-form";
import { uploadOneImage } from "@/features/common/services/upload.service";
import useLoading from "@/features/common/hooks/useLoading";
import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import { FormField } from "../../components";

export default function EditClassificationValuesSection({
  clsIndex,
}: {
  clsIndex: number;
}) {
  const { handleLoading } = useLoading();
  const { control, register, setValue, watch } = useEditProductConext();
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
    <div className="">
      {fields.length === 0 ? (
        <div className="text-center bg-gray-100 dark:bg-gray-900/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <FontAwesomeIcon
            icon={faImage}
            className="text-gray-400 text-3xl mb-2"
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Chưa có giá trị nào, hãy thêm mới
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3 mb-5">
          {fields.map((value, index) => {
            const imgValue = watch(
              `data.classifications.${clsIndex}.values.${index}.img`,
            );
            return (
              <div
                key={value.id}
                className="bg-white relative dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-4 flex flex-col gap-2 items-center justify-center"
              >
                {/* Image Preview */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Ảnh minh họa
                  </label>
                  <label
                    htmlFor={`img-index-${index}`}
                    className="block cursor-pointer mb-2"
                  >
                    <div className="relative w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 overflow-hidden rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                      {imgValue ? (
                        <>
                          <Image
                            src={imgValue}
                            alt="value-img"
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faCameraAlt}
                              className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </>
                      ) : (
                        <FontAwesomeIcon
                          icon={faImage}
                          className="text-gray-400 text-3xl"
                        />
                      )}
                    </div>
                  </label>
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
                    className="hidden"
                  />
                </div>
                <FormField label="Tên giá trị">
                  <input
                    type="text"
                    id={`name-index-${index}`}
                    {...register(
                      `data.classifications.${clsIndex}.values.${index}.name`,
                    )}
                    placeholder="Đỏ, M, L, Lụa..."
                    className="px-3 w-30 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all"
                  />
                </FormField>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-3 text-red-500"
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Value Button */}
      <button
        type="button"
        onClick={() => append({ name: "", img: "" })}
        className="text-blue-500 text-sm hover:underline"
      >
        Thêm giá trị
      </button>
    </div>
  );
}
