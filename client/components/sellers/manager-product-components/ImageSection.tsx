import { ModalActionPayload } from "@/redux/state/app.state";

import Image from "next/image";

interface Props {
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagesSelected: { thumbnail?: File; details: File[] };
  countImgDetailInput: number;
  removeImageDetailInput: (index: number) => void;
  addNewImageDetailInput: () => void;
  uploadImage: () => Promise<{
    payload: ModalActionPayload;
    type: "app/openModal";
  }>;
}

export default function ImageSection({
  onchange,
  imagesSelected,
  countImgDetailInput,
  removeImageDetailInput,
  addNewImageDetailInput,
  uploadImage,
}: Props) {
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Ảnh sản phẩm
      </h3>

      {/* Thumbnail */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ảnh bìa
        </label>
        <div className="flex items-start gap-3">
          {(() => {
            const imgFile = imagesSelected.thumbnail;
            if (!imgFile) return null;
            const imgSrc = URL.createObjectURL(imgFile);
            return (
              <Image
                src={imgSrc}
                alt="thumbnail"
                width={100}
                height={100}
                className="border border-gray-300 dark:border-gray-600 object-cover"
              />
            );
          })()}
          <div className="flex-1">
            <input
              type="file"
              name="thumbnail"
              id="thumbnail-input"
              className="block w-full text-xs file:mr-2 file:py-1 file:px-2 file:border file:border-gray-300 dark:file:border-gray-600 file:rounded file:text-xs file:bg-white dark:file:bg-gray-800 dark:file:text-gray-100"
              onChange={(e) => onchange(e)}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* Detail Images */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
          Ảnh chi tiết
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {Array.from({ length: countImgDetailInput }).map((_, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {(() => {
                const imgFile = imagesSelected.details[index];
                if (!imgFile) return null;
                const imgSrc = URL.createObjectURL(imgFile);
                return (
                  <Image
                    src={imgSrc}
                    alt={`detail ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-24 object-cover mb-2"
                  />
                );
              })()}
              <input
                type="file"
                name="details"
                id={`img-detail-input-${index}`}
                data-img-index={index}
                accept="image/*"
                className="block w-full text-xs mb-2 file:py-1 file:px-1 file:text-xs file:border file:border-gray-300 dark:file:border-gray-600 file:rounded file:bg-white dark:file:bg-gray-700 dark:file:text-gray-100"
                onChange={(e) => onchange(e)}
              />
              <button
                type="button"
                onClick={() => removeImageDetailInput(index)}
                className="w-full py-1 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addNewImageDetailInput()}
          className="flex-1 py-2 px-3 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          + Thêm ảnh
        </button>
        <button
          type="button"
          onClick={() => uploadImage()}
          className="flex-1 py-2 px-3 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Tải ảnh
        </button>
      </div>
    </div>
  );
}
