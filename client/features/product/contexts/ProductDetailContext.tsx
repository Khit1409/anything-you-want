import { createContext, useContext } from "react";
import useProductDetail from "../hooks/useProductDetail";
import { ProductDetail } from "../interfaces/product.interface";
import { SectionShowDataLoading } from "@/features/common/components";
import NotFoundProduct from "../components/common/NotFoundProduct";

export interface ProductDetailContextType extends ReturnType<
  typeof useProductDetail
> {
  product: ProductDetail;
}

export const ProductDetailContext =
  createContext<ProductDetailContextType | null>(null);

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

  if (value.isLoading) {
    return <SectionShowDataLoading />;
  }

  if (!value.product) {
    return <NotFoundProduct />;
  }

  return (
    <ProductDetailContext.Provider value={value as ProductDetailContextType}>
      {children}
    </ProductDetailContext.Provider>
  );
}
