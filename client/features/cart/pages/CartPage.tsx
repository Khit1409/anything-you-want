"use client";

import ProductDetailHeroSection from "@/features/product/components/detail/ProductDetailHeroSection";
import CartList from "../components/CartList";
import ProductListContent from "@/features/product/components/list/ProductListContent";

export default function CartPage() {
  return (
    <>
      <ProductDetailHeroSection />
      <CartList />
      <ProductListContent />
    </>
  );
}
