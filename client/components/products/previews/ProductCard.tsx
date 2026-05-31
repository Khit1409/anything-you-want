import { ProductPreview } from "@/interfaces";

import Rating from "./Rating";
import Shipping from "../common/Shipping";
import Thumbnail from "./Thumbnail";
import Info from "./Info";

export default function ProductCard({ product }: { product: ProductPreview }) {
  return (
    <div className="flex flex-col gap-3 p-2 border border-(--border)">
      {/* thumbnail */}
      <Thumbnail
        name={product.info.name}
        thumbnail={product.images.thumbnail}
        sale={product.info.sale}
      />
      {/* Product Info */}
      <Info id={product.id} info={product.info} />
      {/* Rating */}
      <Rating ratingSumary={product.ratingSumary} />
      {/* Shipping Options */}
      <Shipping shipping={product.shipping} forElement="list" />
    </div>
  );
}
