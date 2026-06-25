import { createContext, useContext } from "react";
import useCreateOrder from "../hooks/useCreateOrder";
import useProductDetail from "@/features/product/hooks/useProductDetail";

export type CreateOrderContextType = ReturnType<typeof useCreateOrder> &
  ReturnType<typeof useProductDetail>;
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
  const api = useProductDetail();
  const handle = useCreateOrder();
  const value = { ...api, ...handle };
  return (
    <CreateOrderContext.Provider value={value}>
      {children}
    </CreateOrderContext.Provider>
  );
}
