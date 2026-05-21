import {
  useSellerProductsQueries,
  useSellerProductHandles,
} from "@/hooks/sellers";
import { createContext, useContext } from "react";
type ManagerProductContextType = {
  previews: ReturnType<typeof useSellerProductsQueries>;
  handles: ReturnType<typeof useSellerProductHandles>;
};
const ManagerProductContext = createContext<ManagerProductContextType | null>(
  null
);

export function ManagerProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const previews = useSellerProductsQueries();
  const handles = useSellerProductHandles();

  return (
    <ManagerProductContext.Provider value={{ previews, handles }}>
      {children}
    </ManagerProductContext.Provider>
  );
}

export default function useMangerProduct() {
  const context = useContext(ManagerProductContext);
  if (!context) {
    throw new Error(
      "useProductManager must be used inside ProductManagerProvider"
    );
  }

  return context;
}
