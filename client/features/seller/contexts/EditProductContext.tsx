import { createContext, useContext } from "react";
import useEditProduct from "../hooks/useEditProduct";
import useDeleteProduct from "../hooks/useDeleteProduct";

export type EditProductContextType = ReturnType<typeof useEditProduct> &
  ReturnType<typeof useDeleteProduct>;
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
  const edit = useEditProduct();
  const del = useDeleteProduct();
  const value = { ...edit, ...del };
  return (
    <EditProductContext.Provider value={value}>
      {children}
    </EditProductContext.Provider>
  );
}
