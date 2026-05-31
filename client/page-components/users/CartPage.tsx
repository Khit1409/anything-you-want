"use client";

import { CartList } from "@/components/carts/previews";
import ProductDetailHeroSection from "@/components/products/detail/ProductDetailHeroSection";
import ProductList from "@/components/products/previews/ProductList";

export default function CartPage() {
  return (
    <>
      <ProductDetailHeroSection />
      <CartList />
      <ProductList />
    </>
  );
}
