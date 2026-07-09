"use client";
import NotFoundProduct from "../common/NotFoundProduct";
import { SectionShowDataLoading } from "@/features/common/components";
import ProductCard from "../common/ProductCard";
import { useProductListContext } from "../../contexts/ProductListContext";

export default function ProductList() {
  const { products, isLoading } = useProductListContext();

  return (
    <section
      id="product-section"
      className="bg-(--surface) py-6 px-4 min-h-screen dark:bg-(--surface)"
    >
      {isLoading ? (
        <SectionShowDataLoading />
      ) : !products || products.length == 0 ? (
        <NotFoundProduct />
      ) : (
        <div
          id="product-list"
          className="grid grid-cols-5 gap-3 mx-auto mb-4"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </section>
  );
}
