import ProductListContent from "@/features/product/components/list/ProductListContent";
import { Hero } from "@/features/user/components/layouts";
import React from "react";

export default function ShoppingNowPage() {
  return (
    <>
      <Hero />

      <ProductListContent isShowFilter={true} />
    </>
  );
}
