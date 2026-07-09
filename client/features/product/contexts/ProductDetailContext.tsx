import { createContext, useContext } from "react";
import useProductDetail from "../hooks/useProductDetail";

export type ProductDetailContextType = ReturnType<typeof useProductDetail>;
export const ProductDetailContext =
  createContext<ProductDetailContextType>(null);

export function useProductDetailContext() {
  const context = useContext(ProductDetailContext);
  if (!context) throw new Error("Context product detail is not define!");
  return context;
}

export default function ProductDetailContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useProductDetail();

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
}
