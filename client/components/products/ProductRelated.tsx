"use client";
import { ProductPreviews } from "@/interfaces/response/product.response";
import ProductCard from "./ProductCard";
import NotFoundProduct from "./NotFoundProduct";

interface Props {
  products: Array<ProductPreviews>;
}
export default function ProductRelated({ products }: Props) {
  if (products.length == 0) {
    return <NotFoundProduct />;
  }
  return (
    <section id="product-section" className="bg-gray-50 py-6 px-4 min-h-screen">
      <div className="py-2 border-b border-gray-300 mb-3">
        <h3 className="uppercase">Các sản phẩm có liên quan</h3>
      </div>
      <div
        id="product-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1500px] mx-auto mb-4"
      >
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
