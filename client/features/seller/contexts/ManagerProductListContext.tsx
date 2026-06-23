import { createContext, useContext } from "react";
import useManagerProductList from "../hooks/useManagerProductList";
import useDeleteProduct from "../hooks/useDeleteProduct";

export type ManagerProductListContextType = ReturnType<
  typeof useManagerProductList
> &
  ReturnType<typeof useDeleteProduct>;
export const ManagerProductListContext =
  createContext<ManagerProductListContextType | null>(null);

export function useManagerProductListContext() {
  const context = useContext(ManagerProductListContext);

  if (!context)
    throw new Error("Context of manager products context is not define!");
  return context;
}

export default function ManagerProductListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const manager = useManagerProductList();
  const del = useDeleteProduct();

  console.log("PROVIDER", manager.products);

  const value = {
    ...manager,
    ...del,
  };
  return (
    <ManagerProductListContext.Provider value={value}>
      {children}
    </ManagerProductListContext.Provider>
  );
}
