"use client";

import ProductListContextProvider from "@/productContexts/ProductListContext";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductList from "./ProductList";
import ProductPanigation from "./ProductPanigation";

export default function ProductListContent() {
  return (
    <ProductListContextProvider>
      <ProductFilterSidebar />
      <ProductList />
      <ProductPanigation />
    </ProductListContextProvider>
  );
}
