import Image from "next/image";

import {
  uploadManyImage,
  uploadOneImage,
} from "@/features/common/services/upload.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faImage, faPlus } from "@fortawesome/free-solid-svg-icons";

import useLoading from "@/features/common/hooks/useLoading";
import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { SectionCard } from "../../components";

export default function EditImageSection() {
  const { handleLoading } = useLoading();
  const { setValue, watch } = useEditProductConext();
  const thumbnail = watch("data.images.thumbnail");
  const details = watch("data.images.details") ?? [];

  return (
    <SectionCard
      title="Ảnh sản phẩm"
      description="Cập nhật ảnh bìa và ảnh chi tiết"
    >
      {/* Thumbnail */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Ảnh bìa
        </label>
        <div className="flex items-center gap-4">
          <label
            htmlFor="thumbnail-input"
            className="cursor-pointer shrink-0 w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={faImage}
                className="text-gray-400 dark:text-gray-600 text-3xl"
              />
            )}
          </label>
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const res = await handleLoading(uploadOneImage, file);
              setValue("data.images.thumbnail", res.url);
            }}
            id="thumbnail-input"
            className="hidden"
            accept="image/*"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">Nhấn để tải ảnh bìa</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG (Tối đa 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Detail Images */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
          Ảnh chi tiết
        </label>
        <div className="flex flex-wrap gap-2">
          {details.map((image, index) => (
            <div
              key={index}
              className="relative w-20 h-20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden shrink-0"
            >
              <Image
                src={image}
                alt={`${image}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setValue(
                    "data.images.details",
                    details.filter((_, i) => i !== index),
                  );
                }}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} className="text-[9px]" />
              </button>
            </div>
          ))}

          {/* Add button */}

          <div className="w-20 h-20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shrink-0">
            <label
              htmlFor="details-input"
              className="w-20 h-20 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
              type="file"
              id="details-input"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []);
                if (!files.length) return;
                const uploaded = await handleLoading(uploadManyImage, files);
                const urlList = uploaded.map((up) => up.url);
                setValue("data.images.details", [...details, ...urlList]);
              }}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
