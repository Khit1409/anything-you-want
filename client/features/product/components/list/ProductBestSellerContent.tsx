"use client";

import ProductBestSellerContextProvider from "../../contexts/ProductBestSellerContext";
import BestSellerFilter from "./BestSellerFilter";
import BestSellerList from "./BestSellerList";
import BestSellerPanigation from "./BestSellerPanigation";

export default function ProductBestSellerContent() {
  return (
    <ProductBestSellerContextProvider>
      <BestSellerFilter />
      <BestSellerList />
      <BestSellerPanigation />
    </ProductBestSellerContextProvider>
  );
}
