"use client";
import NotFoundProduct from "../common/NotFoundProduct";
import { SectionShowDataLoading } from "@/features/common/components";
import ProductCard from "./ProductCard";
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
          className="grid lg:grid-cols-5 grid-cols-2  gap-3 mx-auto mb-4"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </section>
  );
}
