import { useContext, createContext } from "react";
import useBestSeller from "../hooks/useBestSeller";

export type ProductBestSellerContextType = ReturnType<typeof useBestSeller>;
export const ProductBestSellerContext =
  createContext<ProductBestSellerContextType | null>(null);

export function useProductBestSellerContext() {
  const context = useContext(ProductBestSellerContext);
  if (!context) throw new Error("Product best seller context is not define!");
  return context;
}

export default function ProductBestSellerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useBestSeller();
  return (
    <ProductBestSellerContext.Provider value={value}>
      {children}
    </ProductBestSellerContext.Provider>
  );
}
