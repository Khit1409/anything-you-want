"use client";

import CreateProductContextProvider from "@/features/seller/contexts/CreateProductContext";
import CreateProductForm from "@/features/seller/forms/CreateProductForm";

export default function CreateProductPage() {
  return (
    <CreateProductContextProvider>
      <CreateProductForm />
    </CreateProductContextProvider>
  );
}
