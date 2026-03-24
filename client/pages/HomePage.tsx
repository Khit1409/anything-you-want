"use client";

import ProductList from "@/components/products/ProductList";
import Hero from "@/components/users/Hero";


export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductList role="user" />
    </>
  );
}
