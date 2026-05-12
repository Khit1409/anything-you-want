import { ProductImages } from "@/interfaces/product.interface";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  images: ProductImages;
}

export default function ProductImage({ images }: ProductImageProps) {
  const [imagePreview, setImagePreview] = useState<string>(images.thumbnail);

  return (
    <div className="flex gap-4 bg-(--surface) p-6">
      {/* Thumbnail List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-2">
        {images.details.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagePreview(img)}
            className={`border-2 rounded-md overflow-hidden shrink-0 ${
              imagePreview === img
                ? "border-(--title)"
                : "border-(--border) hover:border-(--border)"
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
      <div className="flex-1 flex items-center justify-center border border-(--border) rounded-lg overflow-hidden bg-(--surface-muted)">
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
