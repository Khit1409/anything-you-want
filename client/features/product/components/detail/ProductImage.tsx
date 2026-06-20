import Image from "next/image";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductImage() {
  const { product, imagePreview, setImagePreview } = useProductDetailContext();
  const { thumbnail, details } = product.images;

  return (
    <div className="flex gap-6 p-4 bg-(--surface) rounded-lg">
      {/* Thumbnail List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-96 pr-2 w-20">
        {details.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagePreview(img)}
            className={`w-16 h-16 rounded-md overflow-hidden transition-shadow duration-150 ${
              imagePreview === img
                ? "ring-2 ring-green-500"
                : "ring-1 ring-(--border) hover:ring-green-300"
            }`}
          >
            <Image
              src={img}
              alt={`Product image ${index + 1}`}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Main Preview Image */}
      <div className="flex-1 flex items-center justify-center border border-(--border) rounded-lg overflow-hidden bg-(--surface-muted)">
        <Image
          src={imagePreview ?? thumbnail}
          alt="Product preview"
          width={900}
          height={900}
          className="object-contain w-full h-full p-4"
        />
      </div>
    </div>
  );
}
