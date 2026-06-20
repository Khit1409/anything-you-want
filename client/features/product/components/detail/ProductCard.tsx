import { ProductPreview } from "../../interfaces/product.interface";

import Rating from "../list/Rating";
import ShippingSection from "../common/ShippingSection";
import Thumbnail from "../list/Thumbnail";
import Info from "../list/Info";

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
      <Info id={product._id} info={product.info} />
      {/* Rating */}
      <Rating ratingSumary={product.ratingSumary} />
      {/* Shipping Options */}
      <ShippingSection shipping={product.shipping} forElement="list" />
    </div>
  );
}
