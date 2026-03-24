"use client";

import CartList from "@/components/carts/CartList";
import ProductDetailHeroSection from "@/components/products/ProductDetailHeroSection";
import ProductList from "@/components/products/ProductList";

export default function CartPage() {
  return (
    <>
      <ProductDetailHeroSection />
      <CartList />
      <ProductList role="user" />
    </>
  );
}
