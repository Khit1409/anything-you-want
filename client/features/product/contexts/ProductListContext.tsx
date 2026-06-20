import React, { createContext, useContext } from "react";
import useProductList from "../hooks/useProductList";

export type ProductListContextType = ReturnType<typeof useProductList>;

export const ProductListContext = createContext<ProductListContextType | null>(
  null,
);

export function useProductListContext() {
  const context = useContext(ProductListContext);
  if (!context) throw new Error("Product list context is not define!");
  return context;
}

export default function ProductListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useProductList();
  return (
    <ProductListContext.Provider value={value}>
      {children}
    </ProductListContext.Provider>
  );
}
