import { createContext, useContext } from "react";
import useManagerProductList from "../hooks/useManagerProductList";

export type ManagerProductListContextType = ReturnType<
  typeof useManagerProductList
>;
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
  const value = useManagerProductList();
  return (
    <ManagerProductListContext.Provider value={value}>
      {children}
    </ManagerProductListContext.Provider>
  );
}
