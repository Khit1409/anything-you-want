"use client";
import { Role } from "@/interfaces/common/role.interface";
import { useState } from "react";
import SectionShowDataLoading from "../common/SectionShowDataLoading";
import ProductCard from "./ProductCard";
import NotFoundProduct from "./NotFoundProduct";
import { getProductService } from "@/api/product.api";
import { useQuery } from "@tanstack/react-query";
import ProductPanigation from "./ProductPanigation";

export default function ProductList({ role }: { role: Role }) {
  const [page, setPage] = useState<number>(1);

  const { data = [], isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => {
      if (role === "user") {
        return getProductService({ page });
      }
    },
  });

  return (
    <section id="product-section" className="bg-gray-50 py-6 px-4 min-h-screen">
      {isLoading ? (
        <SectionShowDataLoading />
      ) : !data || data.length === 0 ? (
        <NotFoundProduct />
      ) : (
        <div
          id="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1500px] mx-auto mb-4"
        >
          {data.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
      <ProductPanigation setPage={setPage} page={page} />
    </section>
  );
}
