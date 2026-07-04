"use client";

import { Hero } from "../components/layouts";
import ProductListContent from "@/features/product/components/list/ProductListContent";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductListContent isShowFilter={false} />
    </>
  );
}
