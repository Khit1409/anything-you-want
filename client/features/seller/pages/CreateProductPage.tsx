"use client";

import CreateProductContextProvider from "@/features/seller/contexts/CreateProductContext";
import CreateProductForm from "@/sellerForms/CreateProductForm";


export default function CreateProductPage() {
  return (
    <CreateProductContextProvider>
      <CreateProductForm />
    </CreateProductContextProvider>
  );
}
