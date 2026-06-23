"use client";

import EditProductContextProvider from "../contexts/EditProductContext";
import EditProductForm from "@/sellerForms/EditProductForm";

export default function EditProductPage() {
  return (
    <EditProductContextProvider>
      <EditProductForm />
    </EditProductContextProvider>
  );
}
