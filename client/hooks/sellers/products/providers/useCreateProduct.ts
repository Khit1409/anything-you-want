import { CreateProductContext } from "@/contexts/sellers/CreateProductContext";
import { useContext } from "react";

export default function useCreateProduct() {
  const context = useContext(CreateProductContext);
  if (!context) {
    throw new Error("create product context is not define!");
  }
  return context;
}
