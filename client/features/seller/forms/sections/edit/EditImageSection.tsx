import Image from "next/image";

import {
  uploadManyImage,
  uploadOneImage,
} from "@/features/common/services/upload.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faImage,
  faPlus,
  faImages,
} from "@fortawesome/free-solid-svg-icons";

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
      icon={faImages}
    >
      {/* Thumbnail */}
      <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Ảnh bìa (thumbnail)
        </label>
        <div className="flex items-start gap-6">
          <label
            htmlFor="thumbnail-input"
            className="cursor-pointer flex-shrink-0 w-24 h-24 border-2 border-dashed border-blue-300 dark:border-blue-800 flex items-center justify-center bg-blue-50 dark:bg-blue-900/10 rounded overflow-hidden relative hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors group"
          >
            {thumbnail ? (
              <>
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </>
            ) : (
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-blue-400 text-4xl mb-2"
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Chọn ảnh
                </p>
              </div>
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
          <div className="flex-1 pt-2">
            <p className="font-medium text-sm text-gray-900 dark:text-gray-50 mb-2">
              Tải ảnh bìa
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Đây sẽ là ảnh đại diện của sản phẩm. Khuyến nghị: 400x400px hoặc
              lớn hơn, PNG hoặc JPG (Tối đa 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Detail Images */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Ảnh chi tiết
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {details.map((image, index) => (
            <div
              key={index}
              className="relative group rounded overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors"
            >
              <Image
                src={image}
                alt={`detail-${index}`}
                width={200}
                height={200}
                className="w-full h-auto aspect-square object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setValue(
                    "data.images.details",
                    details.filter((_, i) => i !== index),
                  );
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            </div>
          ))}

          {/* Add button */}
          <label
            htmlFor="details-input"
            className="cursor-pointer flex items-center justify-center aspect-square border-2 border-dashed border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/10 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors group"
          >
            <div className="text-center">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-green-500 text-2xl mb-2"
              />
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                Thêm
              </p>
            </div>
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
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          Bạn có thể thêm nhiều ảnh để hiển thị chi tiết sản phẩm từ các góc độ
          khác nhau
        </p>
      </div>
    </SectionCard>
  );
}
