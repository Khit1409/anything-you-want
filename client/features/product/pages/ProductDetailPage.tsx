"use client";

import ProductDetailContextProvider from "@/productContexts/ProductDetailContext";
import ProductDetail from "@/productComponents/detail/ProductDetail";

export default function ProductDetailPage() {
  return (
    <ProductDetailContextProvider>
      <ProductDetail />
    </ProductDetailContextProvider>
  );
}
