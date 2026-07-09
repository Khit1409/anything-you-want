"use client";

import EditProductContextProvider from "@/features/seller/contexts/EditProductContext";
import EditProductForm from "../../EditProductForm";

export default function EditProductContent() {
  return (
    <EditProductContextProvider>
      <EditProductForm />
    </EditProductContextProvider>
  );
}
