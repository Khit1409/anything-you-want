import { createContext, useContext } from "react";
import useManagerOrder from "../hooks/orders/useManagerOrder";

export type ManagerOrderContextType = ReturnType<typeof useManagerOrder>;

export const ManagerOrderContext =
  createContext<ManagerOrderContextType | null>(null);

export function useManagerOrderContext() {
  const context = useContext(ManagerOrderContext);
  if (!context) throw new Error("Manager context is not found");
  return context;
}
export default function ManagerOrderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useManagerOrder();
  return (
    <ManagerOrderContext.Provider value={value}>
      {children}
    </ManagerOrderContext.Provider>
  );
}
