import { ProductPreview } from "@/productInterfaces/read.interface";

import Rating from "../list/Rating";
import Thumbnail from "../list/Thumbnail";
import Info from "../list/Info";

export default function ProductCard({ product }: { product: ProductPreview }) {
  return (
    <div className="flex flex-col gap-1 border border-(--border)">
      <Thumbnail
        name={product.info.name}
        thumbnail={product.images.thumbnail}
        sale={product.info.sale}
      />
      {/* Product Info */}
      <Info id={product._id} info={product.info} />
      {/* Rating */}
      <Rating ratingSumary={product.ratingSumary} />
    </div>
  );
}
