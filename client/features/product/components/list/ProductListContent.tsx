"use client";

import ProductListContextProvider from "@/productContexts/ProductListContext";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductList from "./ProductList";
import ProductPanigation from "./ProductPanigation";

export default function ProductListContent({
  isShowFilter,
}: {
  isShowFilter?: boolean;
}) {
  return (
    <ProductListContextProvider>
      <ProductFilterSidebar isShow={isShowFilter} />
      <ProductList />
      <ProductPanigation />
    </ProductListContextProvider>
  );
}
