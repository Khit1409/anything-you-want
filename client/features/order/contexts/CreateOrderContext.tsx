import { createContext, useContext } from "react";
import useCreateOrder from "@/orderHooks/useCreateOrder";

export type CreateOrderContextType = ReturnType<typeof useCreateOrder>;
export const CreateOrderContext = createContext<CreateOrderContextType | null>(
  null,
);

export function useCreateOrderContext() {
  const context = useContext(CreateOrderContext);
  if (!context) throw new Error("Create order context is not define!");
  return context;
}

export default function CreateOrderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useCreateOrder();
  return (
    <CreateOrderContext.Provider value={value}>
      {children}
    </CreateOrderContext.Provider>
  );
}
