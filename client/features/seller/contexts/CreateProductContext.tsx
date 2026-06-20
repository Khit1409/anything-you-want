import { createContext, useContext } from "react";
import useCreateProduct from "../hooks/useCreateProduct";

type CreateProductContextType = ReturnType<typeof useCreateProduct>;

const CreateProductContext = createContext<CreateProductContextType | null>(
  null,
);

export default function CreateProductContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useCreateProduct();
  return (
    <CreateProductContext.Provider value={value}>
      {children}
    </CreateProductContext.Provider>
  );
}

export function useCreateProductContext() {
  const context = useContext(CreateProductContext);

  if (!context) {
    throw new Error("Context is not define!");
  }
  return context;
}
