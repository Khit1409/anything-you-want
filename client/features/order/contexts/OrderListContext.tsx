import { createContext, useContext } from "react";
import useOrderList from "../hooks/useOrderList";

export type OrderListContextType = ReturnType<typeof useOrderList>;
export const OrderListContext = createContext<OrderListContextType | null>(
  null,
);
export function useOrderListContext() {
  const context = useContext(OrderListContext);
  if (!context) throw new Error("Order context is not found!");
  return context;
}

export default function OrderListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useOrderList();
  return (
    <OrderListContext.Provider value={value}>
      {children}
    </OrderListContext.Provider>
  );
}
