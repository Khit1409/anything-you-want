"use client";

import { CreateProductForm } from "@/components/sellers/manager-product-components";
import CreateProductContextProvider from "@/contexts/sellers/CreateProductContext";

export default function CreateProductPage() {
  return (
    <CreateProductContextProvider>
      <CreateProductForm />
    </CreateProductContextProvider>
  );
}
