"use client";

import ProductDetailContextProvider from "../contexts/ProductDetailContext";
import ProductDetail from "../components/detail/ProductDetail";

export default function ProductDetailPage() {
  return (
    <ProductDetailContextProvider>
      <ProductDetail />
    </ProductDetailContextProvider>
  );
}
