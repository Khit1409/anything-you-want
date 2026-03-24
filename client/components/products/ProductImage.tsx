import { ProductImages } from "@/interfaces/response/product.response";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  images: ProductImages;
}

export default function ProductImage({ images }: ProductImageProps) {
  const [imagePreview, setImagePreview] = useState<string>(images.thumbnail);

  return (
    <div className="flex gap-4 bg-white p-6">
      {/* Thumbnail List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-2">
        {images.details.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagePreview(img)}
            className={`border-2 rounded-md overflow-hidden shrink-0 ${
              imagePreview === img
                ? "border-gray-900"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={img}
              alt={`Product image ${index + 1}`}
              width={80}
              height={80}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Preview Image */}
      <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={imagePreview}
          alt="Product preview"
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
