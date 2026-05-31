"use client";
import { useState } from "react";

import { useProductListQueries } from "@/hooks";
import SectionShowDataLoading from "@/components/common/SectionShowDataLoading";
import NotFoundProduct from "../common/NotFoundProduct";
import ProductCard from "./ProductCard";
import ProductPanigation from "../common/ProductPanigation";

export default function ProductList() {
  const [page, setPage] = useState<number>(1);

  const { isLoading, products } = useProductListQueries({ page });

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1500px] mx-auto mb-4"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
      <ProductPanigation setPage={setPage} page={page} />
    </section>
  );
}
