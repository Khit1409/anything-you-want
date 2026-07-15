import Image from "next/image";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductImage() {
  const { product, imagePreview, setImagePreview } = useProductDetailContext();
  if (!product) return null;
  const { thumbnail, details } = product.images;

  return (
    <div className="flex bg-(--surface) rounded-lg h-80 justify-center">
      {/* Thumbnail List */}
      <div className="w-[25%] h-80 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-3 justify-center items-center">
          {details.map((img, index) => (
            <button
              key={index}
              onClick={() => setImagePreview(img)}
              className={`w-30 h-30 overflow-hidden transition-shadow duration-150 ${
                imagePreview === img
                  ? "ring-2 ring-green-500"
                  : "ring-1 ring-(--border) hover:ring-green-300"
              }`}
            >
              <Image
                src={img}
                alt={`Product image ${index + 1}`}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Preview Image */}
      <div className="flex-1 overflow-hidden flex justify-center h-80">
        <Image
          src={imagePreview ?? thumbnail}
          alt="Product preview"
          width={1200}
          height={320}
          className="object-center w-[90%] h-full rounded-lg"
        />
      </div>
    </div>
  );
}
