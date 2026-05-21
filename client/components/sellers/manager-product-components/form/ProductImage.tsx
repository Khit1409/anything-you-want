import { ProductImages } from "@/interfaces/product.interface";
import Image from "next/image";

interface Props {
  images: ProductImages;
}
export default function ProductImage({ images }: Props) {
  return (
    <div className="p-3 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="w-full mb-3">
        <div className="mb-3">
          <h4>Ảnh bìa</h4>
        </div>
        <label htmlFor="thumbnail" className=" w-max">
          <Image
            src={images.thumbnail}
            alt={images.thumbnail}
            className="w-[200px] h-[200px] rounded-sm"
            width={200}
            height={200}
            objectFit="cover"
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="thumbnail"
          name="thumbnail"
          className=" mt-3 block w-full text-xs file:mr-2 file:py-1 file:px-2 file:border file:border-gray-300 dark:file:border-gray-600 file:rounded file:text-xs file:bg-white dark:file:bg-gray-800 dark:file:text-gray-100"
        />
      </div>
      <div className="mb-3 border-t border-(--border) p-2">
        <div className="mb-3">
          <h4>Ảnh chi tiết</h4>
        </div>
        <div className="flex gap-3 flex-wrap ">
          {images.details.map((img, index) => (
            <div key={index}>
              <label htmlFor={`img-detail-input-${index}`}>
                <Image
                  src={img}
                  alt={img}
                  className="rounded-sm"
                  width={200}
                  height={200}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id={`img-detail-input-${index}`}
                name="details"
                className=" mt-3 block w-full text-xs file:mr-2 file:py-1 file:px-2 file:border file:border-gray-300 dark:file:border-gray-600 file:rounded file:text-xs file:bg-white dark:file:bg-gray-800 dark:file:text-gray-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
