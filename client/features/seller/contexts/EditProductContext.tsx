import { createContext, useContext } from "react";
import useEditProduct from "../hooks/products/edit/useEditProduct";

export type EditProductContextType = ReturnType<typeof useEditProduct>;
export const EditProductContext = createContext<EditProductContextType | null>(
  null,
);

export function useEditProductConext() {
  const context = useContext(EditProductContext);
  if (!context) {
    throw new Error("Edit product context is not define!");
  }
  return context;
}

export default function EditProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useEditProduct();
  return (
    <EditProductContext.Provider value={value}>
      {children}
    </EditProductContext.Provider>
  );
}
